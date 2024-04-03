import React, { useState } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button } from '@material-ui/core';
import './absence.css';

function Absence() {
  // 初始化邮件列表
  const emails = [
    'email1@example.com',
    'email2@example.com',
    'email3@example.com',
    'email4@example.com',
    'email5@example.com',
    'email6@example.com',
    'email7@example.com',
    'email8@example.com',
    'email9@example.com',
    'email10@example.com',
  ];
  // 使用useState跟踪当前选中的邮件索引
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);

  return (
      <div className='container' id='absence'>
        <div className='leftbox'>
          <LeftBar tabNav="Absence" />
        </div>
        <div className='maincenter'>
          <div className='topline'>
            <div className='topMain'>
              <h2 className='gFont'>Module</h2>
              <div className='fn-clear'>
                {emails.map((_, i) => (
                  // 遍历邮件列表，生成按钮
                    <Button
                        key={i}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentEmailIndex(i)}
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
                <h2 className='gFont'>Email</h2>
                <p className='timesline'>
                  {/* 显示当前选中的邮件，并添加点击事件跳转到邮件应用程序 */}
                  <Button
                      size="small"
                      onClick={() => {
                        window.location.href = `mailto:${emails[currentEmailIndex]}`;
                      }}
                      variant="contained"
                      color="secondary"
                  >
                    {emails[currentEmailIndex]}
                  </Button>
                </p>
              </div>
            </div>
          </div>
          <div className='tipbox'>
            <h2 className='gFont'>Warning</h2>
            <p className='desc'>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
        </div>
      </div>
  );
}

export default Absence;

