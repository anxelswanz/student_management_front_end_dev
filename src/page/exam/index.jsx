import React, { useState, useEffect } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button } from '@material-ui/core';
import './exam.css';
import axios from 'axios';
import { moduleExamInfo } from '../../api/api';

function Exam() {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);


  useEffect(() => {
    const fetchExamDetails = () => {
      axios.get(moduleExamInfo)
        .then(response => {
          if (response.data.code === 200) {
            const fetchedModules = response.data.obj.map(module => ({
              moduleId: module.moduleId,
              moduleName: module.moduleName,
              startTime: module.examStartTime,
              endTime: module.examEndTime,
              duration: module.examDuration,
              date: module.examDate,
              site: module.examSite

            }));
            setModules(fetchedModules);
            if (fetchedModules.length > 0) {
              setCurrentModule(fetchedModules[0]); // 默认选中第一个模块
            }
          }
        })
        .catch(error => {
          console.error('获取考试详情失败:', error);
        });
    };
    

    // 调用获取考试模块数据的函数
    fetchExamDetails();

     
    }, []);

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
                <p className='timesline'>
                  Date：{currentModule?.date}
                  <br />
                  Start Time：{currentModule?.startTime}
                  <br />
                  End Time：{currentModule?.endTime}
                  <br />
                  Duration：{currentModule?.duration}
                  <br />    
                  Site: {currentModule?.site}
                </p>
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
      </div>
  );
}

export default Exam;
