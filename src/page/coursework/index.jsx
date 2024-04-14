import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftBar from './../../component/leftbar/leftbar';
import './coursework.css';
import { Button, TextField, Divider } from '@material-ui/core';
import { moduleName,uploadCoursework } from '../../api/api';

function CourseWork() {
  const [modules, setModules] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');


  useEffect(() => {
    // 获取模块信息
    axios.get(moduleName)
      .then(response => {
        if (response.data.code === 200) {
          // 转换数据格式并设置模块状态
          const fetchedModules = response.data.obj.map(mod => ({
            moduleId: mod.moduleId,
            moduleName: mod.moduleName
          }));
          setModules(fetchedModules);
        }
      })
      .catch(error => {
        console.error('Error fetching module data:', error);
      });

    // 获取课程作业时间
    axios.get('/api/student/courseworkTime')
      .then(response => {
        if (response.data.code === 200) {
          const courseworkTimes = response.data.obj.map(course => ({
            startTime: course.releaseTime,
            endTime: course.endTime
          }));
          setModules(prevModules => prevModules.map((mod, index) => ({
            ...mod,
            ...courseworkTimes[index]
          })));
        } 
      })
      .catch(error => {
        console.error('Error fetching coursework times:', error);
      });
  }, []);

  
  // 文件上传处理函数
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/zip') {
      setFile(selectedFile);
    } else {
      alert('请上传zip压缩包文件');
    }
  };

  // 文本内容输入框处理函数
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // 提交表单处理函数
  const handleSubmit = () => {
    console.log('文件:', file);
    console.log('文本内容:', text);
    // 这里添加提交逻辑，使用 axios 发送数据到后端
  };

  // 创建一个 FormData 对象用于组合要提交的数据
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text); 
  // 使用 axios 发送 FormData
  axios.post(uploadCoursework, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('提交成功:', response.data);
    alert('作业提交成功！');
  })
  .catch(error => {
    console.error('提交失败:', error);
    alert('作业提交失败，请重试！');
  });


  return (
    <div className='container' id='coursework'>
      <div className='leftbox'>
        <LeftBar tabNav="CourseWork" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
            <h2 className='gFont'>Module</h2>
            <div className='fn-clear'>
              {modules.map((module, index) => (
                <Button
                  key={module.moduleId}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setCurrentModuleIndex(index)}
                >
                  ID:{module.moduleId} Name:{module.moduleName}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Divider />
        <div className='centerbox'>
          {modules.length > 0 && (
            <>
              <div className='btn-group'>
                <div className='leftbox'>
                  <h2 className='gFont'>{modules[currentModuleIndex].name}</h2>
                  <p className='timesline'>
                    开始时间：{modules[currentModuleIndex].startTime} 结束时间：{modules[currentModuleIndex].endTime}
                  </p>
                </div>
                <div className='righttxt'>
                  分数：<br />
                  <span className='gFont'>{modules[currentModuleIndex].score}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='mainList'>
          <h2 className='gFont'>Homework Detail</h2>
          <div className='txt'>
            {/* 这里可以根据当前选择的module显示详细信息 */}
            作业详情！！！！！！！！！xxxxxxxxxxxxxxxxxxx
          </div>
        </div>
        <div className='subform' style={{ width: "800px" }}>
          <p className='line'>
            <span>submit File: </span>
            <input type="file" accept=".zip" onChange={handleFileChange} />
          </p>
          <br />
          <TextField
            label="请输入内容"
            variant="outlined"
            fullWidth
            type='text'
            multiline
            minRows={4}
            style={{ margin: 8 }}
            value={text}
            onChange={handleTextChange}
          />
          <br />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseWork;
