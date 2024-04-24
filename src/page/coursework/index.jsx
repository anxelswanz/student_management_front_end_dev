import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftBar from './../../component/leftbar/leftbar';
import './coursework.css';
import { Button, TextField, Divider } from '@material-ui/core';
import { moduleName, courseworkTime, moduleIdList, courseworkMark, uploadCoursework, programmeName } from '../../api/api';

function CourseWork() {
  const [modules, setModules] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [programName, setProgramName] = useState('');

  useEffect(() => {
    // 请求获取programme名称
    axios.get(programmeName)
    .then(response => {
      if (response.status === 200 && response.data && response.data.code === 200) {
        setProgramName(response.data.obj);
      }
    })
    .catch(error => {
      console.error('Error fetching program name:', error);
      setProgramName('Failed to fetch program name');
    });
  }, []);

  useEffect(() => {
    // 获取moduleid
    axios.get(moduleIdList)
      .then(idResponse => {
        if (idResponse.data.code === 200) {
          const fetchedModuleIds = idResponse.data.obj.map(id => ({ moduleId: id }));
          // 获取modulename
          return axios.get(moduleName)
            .then(nameResponse => {
              if (nameResponse.data.code === 200) {
                const combinedModules = fetchedModuleIds.map((mod, index) => ({
                  ...mod,
                  moduleName: nameResponse.data.obj[index] // 结合模块名称
                }));
                return combinedModules;
              }
            })
            .then(combinedModules => {
              // 获取作业时间信息
              return axios.get(courseworkTime)
                .then(timeResponse => {
                  if (timeResponse.data.code === 200) {
                    const times = timeResponse.data.obj;
                    combinedModules.forEach((mod, index) => {
                      mod.startTime = times[index].releaseTime;
                      mod.endTime = times[index].deadLine;
                    });
                    return combinedModules;
                  }
                })
            })
            .then(combinedModules => {
              // 获取作业分数信息
              return axios.get(courseworkMark)
                .then(markResponse => {
                  if (markResponse.data.code === 200) {
                    const marks = markResponse.data.obj;
                    const updatedModules = combinedModules.map((mod, index) => ({
                      ...mod,
                      mark: marks[index]
                    }));
                    setModules(updatedModules); // 更新状态变量
                  }
                });
            });
        }
      })
      .catch(error => {
        console.error('Error fetching module data:', error);
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
        const formData = new FormData();
        formData.append('file', file);
        formData.append('text', text); 

        axios.post(uploadCoursework, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if(response.data.code === 200) {
            alert('作业提交成功！');
          } else {
            throw new Error('提交错误');
          }
        })
        .catch(error => {
          console.error('提交失败:', error);
          alert('作业提交失败，请重试！');
        });
      };


  return (
    <div className='container' id='coursework'>
      <div className='leftbox'>
        <LeftBar tabNav="CourseWork" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
            <h2 className='gFont'>{programName}</h2>
            <div className='fn-clear'>
              {modules.map((module, index) => (
                <Button
                  key={module.moduleId}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setCurrentModuleIndex(index)}
                >
                  {module.moduleId} {module.moduleName}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Divider />
        <div className='centerbox'>
          {modules.length > 0 && (
            <div className='btn-group'>
              <div className='leftbox'>
                <h2 className='gFont'>{modules[currentModuleIndex].moduleName}</h2>
                <p>
                  Release Time：{modules[currentModuleIndex].startTime}，</p>
                  <p> End Time：{modules[currentModuleIndex].endTime}
                </p>

              </div>
            </div>
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
