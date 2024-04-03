import React, { useState } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button } from '@material-ui/core';
import './exam.css';

function Exam() {
  // 初始化模块信息列表
  const modules = [
    { name: 'Module Name1', startTime: '2024-01-01', endTime: '2024-01-01', duration: '2:00:00' },
    { name: 'Module Name2', startTime: '2024-02-02', endTime: '2024-02-02', duration: '2:30:00' },
    { name: 'Module Name3', startTime: '2024-03-03', endTime: '2024-03-03', duration: '3:00:00' },
    { name: 'Module Name4', startTime: '2024-04-04', endTime: '2024-04-04', duration: '1:30:00' },
    { name: 'Module Name5', startTime: '2024-05-05', endTime: '2024-05-05', duration: '2:15:00' },
    { name: 'Module Name6', startTime: '2024-06-06', endTime: '2024-06-06', duration: '2:45:00' },
    { name: 'Module Name7', startTime: '2024-07-07', endTime: '2024-07-07', duration: '3:15:00' },
    { name: 'Module Name8', startTime: '2024-08-08', endTime: '2024-08-08', duration: '1:45:00' },
    { name: 'Module Name9', startTime: '2024-09-09', endTime: '2024-09-09', duration: '2:20:00' },
    { name: 'Module Name10', startTime: '2024-10-10', endTime: '2024-10-10', duration: '3:00:00' },
  ];
  const [currentModule, setCurrentModule] = useState(modules[0]); // 使用useState跟踪当前选中的模块

  return (
      <div className='container' id='exam'>
        <div className='leftbox'>
          <LeftBar tabNav="Exam" />
        </div>
        <div className='maincenter'>
          <div className='topline'>
            <div className='topMain'>
              <h2 className='gFont'>Module</h2>
              <div className='fn-clear'>
                {modules.map((_, i) => (
                  // 为每个模块生成一个按钮，点击按钮时更新当前模块
                    <Button
                        key={i}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentModule(modules[i])} // 点击时更新当前模块
                    >
                      ID:{i + 1}
                    </Button>
                ))}
              </div>
            </div>
          </div>
          <div className='centerbox'>
            <div className='btn-group'>
              <div className='leftbox'>
                <h2 className='gFont'>{currentModule.name}</h2>
                <p className='timesline'>
                  开始时间：{currentModule.startTime}
                  <br />
                  结束时间：{currentModule.endTime}
                  <br />
                  地点：xxxx
                  <br />
                  持续时间：{currentModule.duration}
                </p>
              </div>

              {/* 右侧显示分数 */}
              <div className='righttxt'>
                分数：
                <br />
                <span className='gFont'>88</span>
              </div>
            </div>
          </div>
          <div className='tipbox'>
            <h2 className='gFont'>Tips</h2>
            <p className='desc'>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
        </div>
      </div>
  );
}

export default Exam;

