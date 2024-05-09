/**
 * Component Name: Coursework
 * Description: Students can view coursework release times, deadlines, coursework descriptions, and submission of coursework (files) for different modules
 * Author: Yu Han
 * Created Date: 2024-04-11
 */

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

   // Initialize studentId
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));// Get user information from localStorage
    const studentId = user ? user.studentId : null;
    setStudentId(studentId);// Set student ID state
  }, []);

  // Fetch coursework description information, parameter: studentId
  useEffect(() => {
    if (studentId) {  
      axios.get(courseworkDes, { params: { studentId: studentId } })
        .then(response => {
          if (response.data.code === 200 && response.data.obj && response.data.obj.length > 0) {
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

  // Fetch program name, parameter: studentId
  useEffect(() => {
    if (studentId) {
      axios.get(programmeName, { params: { studentId: studentId } })
        .then(response => {
          if (response.data.obj.length > 0 && response.data.obj && response.data.code === 200) {
            setProgramName(response.data.obj);
          }
        })
        .catch(error => {
          console.error('Error fetching program name:', error);
          setProgramName('Failed to fetch program name');
        });
    }
  }, [studentId]);

  // Fetch modules information, parameter: studentId
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

  // Fetch modules coursework information
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
          const timeInfo = times[index] || {}; // Ensure each entry has a corresponding time information object
          return {
            ...mod,
            startTime: timeInfo.releaseTime || '', // Use empty string as default value
            endTime: timeInfo.deadline || '', // Use empty string as default value
            };
            });
            setModules(updatedModules);
            }
            })
            .catch(error => console.error('Error fetching coursework time:', error));
            };
         
         
  
      // File upload handling function
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        // if (selectedFile && selectedFile.type === 'application/zip') {
          setFile(selectedFile);

      };

      // Text content input box handling function
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

       // Check if email format is valid
      const isValidEmail = email => {
        return /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);
      };

      // Submit form handling function
      const handleSubmit = () => {
        if (!isValidEmail(email)) {
          alert('Please enter a valid email address.');
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
            alert('Coursework submitted successfully！');
          } else {
            throw new Error('Submission error');
          }
        })
        .catch(error => {
          console.error('Submission failed:', error);
          alert('作Failed to submit coursework. Please try again!');
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
            <h2 className='gFont'>{programName}</h2>{/* Render program name */}
            <div className='fn-clear'>
              {modules.map((module, index) => (
                <Button
                key={module.moduleId}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  setCurrentModuleIndex(index);
                  axios.get(courseworkDes, { params: { studentId: studentId } })
                    .then(response => {
                      if (response.data.code === 200 && response.data.obj && response.data.obj.length > 0) {
                        setCourseworkDescription(response.data.obj[index].courseworkDescription);
                      } else {
                        setCourseworkDescription('No coursework description available');
                      }
                    })
                    .catch(error => {
                      console.error('Error fetching coursework description:', error);
                      setCourseworkDescription('No coursework details.');
                    });
                }}
              >
                {module.moduleId} {module.moduleName}
              </Button>
              ))}{/* Render module buttons for showing different modules*/}
            </div>
          </div>
        </div>
        <Divider />
        <div className='centerbox'>
          {modules.length > 0 && (
            <div className='btn-group'>
              <div className='leftbox'>
                <h2 className='gFont'>{modules[currentModuleIndex].moduleName}</h2>{/* Render current module name */}
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
          <h2 className='gFont'>Coursework Details</h2>{/* Render coursework description */}
          <div className='txt'>
            {courseworkDescription}
          </div>
        </div>
          <div className='email_item'>
            <div className='email_text'>Email Address </div>{/* Render email address input box title */}
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
            <span>Submit File: </span>{/* Render submit file prompt */}
            <input type="file" accept=".zip,.pdf,.docx" onChange={handleFileChange} />{/* Render file upload button */}
          </p>
          <br />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>{/* Render submit button */}
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseWork;
