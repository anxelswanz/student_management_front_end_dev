import React, { useState, useEffect } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './exam.css';
import axios from 'axios';
import { moduleExamInfo, programmeName, submitExam } from '../../api/api';

function Exam() {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [programName, setProgramName] = useState('');
  const [openVisible, setOpenVisible] = useState(false);
  const [studentId, setStudentId] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user ? user.studentId : null;
    setStudentId(user.studentId);
    if (!studentId) {
      console.error('No student ID found');
      return;
    }
    // 请求获取programme名称
    axios.get(programmeName, { params: { studentId : studentId } })
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
    if (!studentId) return;
    const fetchExamDetails = () => {
      axios.get(moduleExamInfo, { params: { studentId : studentId } })
        .then(response => {
          if (response.data.code === 200) {
            const fetchedModules = response.data.obj.map(module => ({
              moduleId: module.moduleId|| 'N/A',
              moduleName: module.moduleName|| 'N/A',
              examDate: module.examDate|| 'N/A',
              examSite: module.examSite|| 'N/A',
              examStartTime: module.examStartTime|| 'N/A',
              examEndTime: module.examEndTime|| 'N/A',
              examDuration: module.examDuration|| 'N/A',
              examDes: module.examDes|| 'N/A'

            }));
            setModules(fetchedModules);
            if (fetchedModules.length > 0) {
              setCurrentModule(fetchedModules[0]);
            }
          }
        })
        .catch(error => {
          console.error('获取考试详情失败:', error);
        });
    };
    

    // 调用获取考试模块数据的函数
    fetchExamDetails();

     
    }, [studentId]);

  
    const handleOk = () => {
      // 确保在调用接口前 currentModule 已经被正确设置
      if (!currentModule) {
        console.error('No module selected');
        return;
      }
    
      const url = `${submitExam}?studentId=${encodeURIComponent(studentId)}&moduleId=${encodeURIComponent(currentModule.moduleId)}`;
    
      axios.put(
        url,
        null, // 如果PUT请求不需要请求体，这里可以是null
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        console.log('考试状态更新成功:', response);
        setOpenVisible(false);  // 关闭二级确认框
      })
      .catch(error => {
        console.error('考试状态更新失败:', error);
        setOpenVisible(false);  // 保守处理，即使出错也关闭对话框
      });
    };
    
    

       // 控制二级确认框的显示
   const handleConfirmButtonClick = () => {
          setOpenVisible(true);
        };

        // 控制二级确认框的隐藏
   const handleCancel = () => {
          setOpenVisible(false);
        };

  return (
      <div className='container' id='exam'>
        <div className='leftbox'>
          <LeftBar tabNav="Exam" />
        </div>
        <div className='maincenter'>
          <div className='topline'>
            <div className='topMain'>
              <h2 className='gFont'>{programName}</h2>
              <div className='fn-clear'>
                {modules.map((module, i) => (
                  <Button
                    key={i}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => setCurrentModule(module)}
                  >
                    {module.moduleId} {module.moduleName}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className='centerbox'>
            <div className='btn-group'>
              <div className='leftbox'>
                <h2 className='gFont'>{currentModule?.moduleName}</h2>
                <p className='description'>{currentModule?.examDes}</p>
                <p className='timesline'>
                  Date：{currentModule?.examDate}
                  <br />
                  Start Time：{currentModule?.examStartTime}
                  <br />
                  End Time：{currentModule?.examEndTime}
                  <br />
                  Duration：{currentModule?.examDuration}Hour
                  <br />    
                  Site: {currentModule?.examSite}
                </p>

                  <Button
                    className="button"
                    type="warning"
                    variant="contained"
                    color="secondary"
                    onClick={handleConfirmButtonClick}
                  >
                    Completed exams
                  </Button>

              </div>
             
            </div>
          </div>
          <div className='tipbox'>
            <h2 className='gFont'>Tips</h2>
            <p>As you prepare for your examinations, it is imperative to adhere strictly to the guidelines set forth to ensure a disciplined and orderly conduct during the exam period.</p>
            <p>First and foremost, verify the examination timetable meticulously to confirm the precise timings for each session. Punctuality is not merely advisable; it is mandatory. Arriving late could disqualify you from the exam or severely curtail the time you have to complete it.</p>
            <p>Additionally, it is essential to ascertain the exact location of your examination well in advance. Acquaint yourself with the venue beforehand to prevent any confusion on the day of the exam. Plan your journey meticulously, allowing extra time for any unforeseen delays that might arise.</p>
            <p>Moreover, be aware that bringing prohibited items into the exam hall is strictly forbidden. This includes all forms of electronic devices such as mobile phones, smartwatches, and any other gadgets that could be used to compromise the fairness of the examination. Also, refrain from bringing any unnecessary materials that could distract you or your peers. Consult the official examination guidelines to ensure compliance with the rules regarding permissible items.</p>
            <p>By diligently following these protocols, you ensure that the examination process is fair and efficient for yourself and all other participants. Your adherence to these rules reflects your integrity and commitment to the principles of fair academic practice.</p>
          </div>
        </div>
              {/* 二级确认框 */}
      <Dialog open={openVisible} onClose={handleCancel}>
        <DialogTitle>温馨提示：</DialogTitle>
        <DialogContent>
          <p>您是否确认提交考试</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} color="primary">确认</Button>
          <Button onClick={handleCancel} color="primary">取消</Button>
        </DialogActions>
      </Dialog>

      </div>
  );
}

export default Exam;
