import React, { useState } from 'react';
import LeftBar from './../../component/leftbar/leftbar';
import { useNavigate } from 'react-router-dom';
import './coursework.css';
import { Button, TextField, Divider } from '@material-ui/core';

function CourseWork() {

// 初始化模块信息列表
  const modules = [
    { name: 'Module Name1', startTime: '2024-01-01', endTime: '2024-01-02', score: '90.1' },
    { name: 'Module Name2', startTime: '2024-02-01', endTime: '2024-02-02', score: '91.2' },
    { name: 'Module Name3', startTime: '2024-03-01', endTime: '2024-03-02', score: '92.3' },
    { name: 'Module Name4', startTime: '2024-04-01', endTime: '2024-04-02', score: '93.4' },
    { name: 'Module Name5', startTime: '2024-05-01', endTime: '2024-05-02', score: '94.5' },
    { name: 'Module Name6', startTime: '2024-06-01', endTime: '2024-06-02', score: '95.6' },
    { name: 'Module Name7', startTime: '2024-07-01', endTime: '2024-07-02', score: '96.7' },
    { name: 'Module Name8', startTime: '2024-08-01', endTime: '2024-08-02', score: '97.8' },
    { name: 'Module Name9', startTime: '2024-09-01', endTime: '2024-09-02', score: '98.9' },
    { name: 'Module Name10', startTime: '2024-10-01', endTime: '2024-10-02', score: '99.0' },
  ];
  //状态管理：当前选中的模块索引、上传的文件、输入的文本内容
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  // 文件上传
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/zip') {
      setFile(selectedFile);
    } else {
      alert('请上传zip压缩包文件');
    }
  };

  // 文本内容输入框
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // 提交表单
  const handleSubmit = () => {
    console.log('文件:', file);
    console.log('文本内容:', text);
  };

  return (
      <div className='container' id='coursework'>
        <div className='leftbox'>
          <LeftBar tabNav="CourseWork" />{/* 左侧导航栏 */}
        </div>
        <div className='maincenter'>
          <div className='topline'>
            <div className='topMain'>
              <h2 className='gFont'>Module</h2>
              <div className='fn-clear'>
                {/* 显示模块按钮 */}
                {modules.map((_, index) => (
                    <Button
                        key={index}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentModuleIndex(index)}
                    >
                      ID:{index + 1}
                    </Button>
                ))}
              </div>
            </div>
          </div>
          <Divider />
         {/* 中心内容显示 */}
          <div className='centerbox'>
            <div className='btn-group'>
              <div className='leftbox'>
                <h2 className='gFont'>{modules[currentModuleIndex].name}</h2>
                <p className='timesline'>
                  开始时间：{modules[currentModuleIndex].startTime}  结束时间：{modules[currentModuleIndex].endTime}
                </p>
              </div>
              <div className='righttxt'>
                分数：
                <br />
                <span className='gFont'>{modules[currentModuleIndex].score}</span>
              </div>
            </div>
          </div>
         {/* 课程作业详情 */}
          <div className='mainList'>
            <h2 className='gFont'>Homework Detail</h2>
            <div className='txt'>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              text description
            </div>
          </div>
          {/* 提交的表单 */}
          <div className='subform' style={{ width: "800px" }}>
            <p className='line'>
              <span>submit File:  </span>
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
      </div >
  );
}

export default CourseWork;

