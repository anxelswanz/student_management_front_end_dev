import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftBar from './../../component/leftbar/leftbar';
import './coursework.css';
import { Button, TextField, Divider } from '@material-ui/core';

function CourseWork() {
  const [modules, setModules] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');


  useEffect(() => {
    // 定义异步函数来获取数据
    const fetchCourseWork = async () => {
      try {
        // 使用axios从您的后端API获取数据
        const response = await axios.get('http://localhost:3001/api/coursework');
        setModules(response.data);
      } catch (error) {
        // 错误处理
        console.error("Error fetching data: ", error);
        alert('获取数据失败');
      }
    };

    fetchCourseWork();
  }, []); // 依赖数组为空表示此effect在组件挂载时运行一次

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
                  key={module.id}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setCurrentModuleIndex(index)}
                >
                  ID:{module.id}
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
