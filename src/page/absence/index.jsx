import React, { useState, useEffect } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button } from '@material-ui/core';
import './absence.css';
import axios from 'axios';
import { findEmail } from '../../api/api';

function Absence() {
  // 使用useState跟踪邮件列表和当前选中的邮件索引
  const [emails, setEmails] = useState([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);

  useEffect(() => {
    // 获取邮件数据的函数
    const fetchEmails = () => {
      axios.get(findEmail)  
        .then(response => {
          if (response.data.code === 200 && response.data.obj) {
            setEmails(response.data.obj);
          }
        })
        .catch(error => {
          console.error('获取邮件数据失败:', error);
        });
    };

    fetchEmails();
  }, []);

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
              {emails.map((email, i) => (
                  // 遍历邮件列表，生成按钮
                    <Button
                        key={i}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentEmailIndex(i)}
                    >
                      ID:{email.moduleId}
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
                        window.location.href = `mailto:${emails[currentEmailIndex]?.email}`;
                      }}
                      variant="contained"
                      color="secondary"
                  >
                    {emails[currentEmailIndex]?.email}
                  </Button>
                </p>
              </div>
            </div>
          </div>
          <div className='tipbox'>
            <h2 className='gFont'>Warning</h2>
            <div className='desc'>
                <p>It is imperative that you carefully manage your study and rest time to ensure that while you pursue academic achievements, you also take proper care of your health. If it becomes necessary to take a leave due to health or other emergency reasons, we remind you to follow the school's leave procedures and include the appropriate documentation in your leave request email. This helps us process your request more effectively and ensures it complies with school policies.</p>
                <p>Furthermore, we emphasize the importance of keeping up with your course progress. Try to anticipate and avoid situations that may lead to absences, ensuring that you do not miss out on important teaching content and learning opportunities. If absences are unavoidable, please communicate promptly with your course instructors to seek remedial measures so as not to affect your academic performance.</p>
                <p>Thank you for your understanding and cooperation. We look forward to each student achieving a balance between health and academics and completing their studies successfully.</p>
            </div>

          </div>
        </div>
      </div>
  );
}

export default Absence;

