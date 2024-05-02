import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftBar from './../../component/leftbar/leftbar';
import './coursework.css';
import { Button,  Divider,Input } from '@material-ui/core';
import { moduleName, courseworkTime, moduleIdList, courseworkDes, uploadCoursework, programmeName } from '../../api/api';


function CourseWork() {
  const [modules, setModules] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [programName, setProgramName] = useState('');
  const [courseworkDescription, setCourseworkDescription] = useState('');
  const [studentId, setStudentId] = useState(null);

  // 初始化 studentId
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user ? user.studentId : null;
    setStudentId(studentId);
  }, []);
  useEffect(() => {
    if (studentId) {  // 确保 studentId 不是 null
      axios.get(courseworkDes, { params: { studentId: studentId } })
        .then(response => {
          if (response.data.code === 200) {
            setCourseworkDescription(response.data.obj[0].courseworkDescription);
          } else {
            setCourseworkDescription('No coursework description available');
          }
        })
        .catch(error => {
          console.error('Error fetching coursework description:', error);
          setCourseworkDescription('No coursework details.');
        });
    }
  }, [studentId]);
  useEffect(() => {
    if (studentId) {
      axios.get(programmeName, { params: { studentId: studentId } })
        .then(response => {
          if (response.status === 200 && response.data && response.data.code === 200) {
            setProgramName(response.data.obj);
          }
        })
        .catch(error => {
          console.error('Error fetching program name:', error);
          setProgramName('Failed to fetch program name');
        });
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      axios.get(moduleIdList, {
        params: {
          studentId: studentId
        }
      })
        .then(idResponse => {
          if (idResponse.data.code === 200) {
            const fetchedModuleIds = idResponse.data.obj.map(id => ({ moduleId: id }));
            axios.get(moduleName, { params: { studentId: studentId } })
              .then(nameResponse => {
                if (nameResponse.data.code === 200) {
                  const moduleNames = nameResponse.data.obj;
                  const combinedModules = fetchedModuleIds.map((mod, index) => ({
                    ...mod,
                    moduleName: moduleNames[index],
                  }));
                  fetchCourseworkTime(combinedModules);
                }
              })
              .catch(error => console.error('Error fetching module names:', error));
          }
        })
        .catch(error => console.error('Error fetching module IDs:', error));
    }
  }, [studentId]);

      const fetchCourseworkTime = (modulesData) => {
          axios.get(courseworkTime, {
            params: {
            studentId: studentId
            }
            })
          .then(response => {
          if (response.data.code === 200) {
          const times = response.data.obj;
          const updatedModules = modulesData.map((mod, index) => {
          const timeInfo = times[index] || {}; // 确保每个条目都有对应的时间信息对象
          return {
            ...mod,
            startTime: timeInfo.releaseTime || '', // 使用空字符串作为默认值
            endTime: timeInfo.deadline || '', // 使用空字符串作为默认值
            };
            });
            setModules(updatedModules);
            }
            })
            .catch(error => console.error('Error fetching coursework time:', error));
            };
         
         
  
      // 文件上传处理函数
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        // if (selectedFile && selectedFile.type === 'application/zip') {
          setFile(selectedFile);

      };

      // 文本内容输入框处理函数
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
       // 检查电子邮件格式是否正确
      const isValidEmail = email => {
        return /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);
      };

      // 提交表单处理函数
      const handleSubmit = () => {
        if (!isValidEmail(email)) {
          alert('请输入有效的电子邮件地址。');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);
        formData.append('studentId', studentId);
        const currentModule = modules[currentModuleIndex];
        formData.append('moduleId', currentModule.moduleId);

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
                <div className='timeDetails'>
                  <p>
                    Release Time：{modules[currentModuleIndex].startTime}，
                  </p>
                  <p>
                    Deadline：{modules[currentModuleIndex].endTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='mainList'>
          <h2 className='gFont'>Coursework Details</h2>
          <div className='txt'>
            {courseworkDescription}
          </div>
        </div>
          <div className='email_item'>
            <div className='email_text'>Email Address </div>
            <Input
              variant="outlined"
              fullWidth
              type='text'
              className='email_inp'
              value={email}
              onChange={handleEmailChange}
            />
           </div>
          <br />
        <div className='subform' style={{ width: "800px" }}>
          <p className='line'>
            <span>Submit File: </span>
            <input type="file" accept=".zip,.pdf,.docx" onChange={handleFileChange} />
          </p>
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
