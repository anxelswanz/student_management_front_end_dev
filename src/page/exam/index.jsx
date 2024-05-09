/**
 * Component Name: Exam
 * Description: Students can view exam details (exam time, location, etc.) for different modules
 * Author: Yu Han
 * Created Date: 2024-04-15
 */

import React, { useState, useEffect } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './exam.css';
import axios from 'axios';
import { moduleExamInfo, programmeName, submitExam } from '../../api/api';

function Exam() {
  const [modules, setModules] = useState([]);// State to store exam module information
  const [currentModule, setCurrentModule] = useState(null);/// Currently selected exam module
  const [programName, setProgramName] = useState('');// Programme name
  const [openVisible, setOpenVisible] = useState(false);// Control the visibility of the secondary confirmation dialog
  const [studentId, setStudentId] = useState(null);// Student ID
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));// Retrieve user information from localStorage
    const studentId = user ? user.studentId : null;// If user exists, get student ID, otherwise set to null
    setStudentId(user.studentId);// Set student ID state
    if (!studentId) {
      console.error('No student ID found');
      return;
    }

     // Get programme name, with studentId as parameter
    axios.get(programmeName, { params: { studentId : studentId } })
    .then(response => {
      if (response.status === 200 && response.data && response.data.code === 200) {
        setProgramName(response.data.obj);// set programme name
      }
    })
    .catch(error => {
      console.error('Error fetching program name:', error);
      setProgramName('Failed to fetch program name');
    });
  }, []);

  // Get exam information, with studentId as parameter
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
            setModules(fetchedModules);// Set exam module information state
            if (fetchedModules.length > 0) {
              setCurrentModule(fetchedModules[0]);// Set current exam module to the first module
            }
          }
        })
        .catch(error => {
          console.error('Failed to fetch exam details:', error);
        });
    };
    

    // Call function to fetch exam module data
    fetchExamDetails();
    }, [studentId]);

    // Handle confirm operation for the dialog
    const handleOk = () => {
      // Ensure currentModule is correctly set before calling the API
      if (!currentModule) {
        console.error('No module selected');
        return;
      }
    
      const url = `${submitExam}?studentId=${encodeURIComponent(studentId)}&moduleId=${encodeURIComponent(currentModule.moduleId)}`;
    
      axios.put(
        url,
        null, // If PUT request does not require a request body, this can be null
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        console.log('Exam status updated successfully:', response);
        setOpenVisible(false);  // Close the secondary confirmation dialog
      })
      .catch(error => {
        console.error('Exam Status Update Failed:', error);
        setOpenVisible(false);  // Close the dialog conservatively, even if an error occurs
      });
    };
    
    

       // Control the visibility of the secondary confirmation dialog
        const handleConfirmButtonClick = () => {
                setOpenVisible(true);
              };

        // Control the visibility of the secondary confirmation dialog
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
              <h2 className='gFont'>{programName}</h2>{/* Render programme name */}
              <div className='fn-clear'>
                {/* Render module buttons for switching between different modules */}
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
         {/* Exam module information */}
            <div className='btn-group'>
              <div className='leftbox'>
                <h2 className='gFont'>{currentModule?.moduleName}</h2>{/* Render current module name */}
                <p className='description'>{currentModule?.examDes}</p>{/* Render current module exam description */}
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
                  {/* Submit exam button */}
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
           {/* Exam tips */}
          <div className='tipbox'>
            <h2 className='gFont'>Tips</h2>
            <p>As you prepare for your examinations, it is imperative to adhere strictly to the guidelines set forth to ensure a disciplined and orderly conduct during the exam period.</p>
            <p>First and foremost, verify the examination timetable meticulously to confirm the precise timings for each session. Punctuality is not merely advisable; it is mandatory. Arriving late could disqualify you from the exam or severely curtail the time you have to complete it.</p>
            <p>Additionally, it is essential to ascertain the exact location of your examination well in advance. Acquaint yourself with the venue beforehand to prevent any confusion on the day of the exam. Plan your journey meticulously, allowing extra time for any unforeseen delays that might arise.</p>
            <p>Moreover, be aware that bringing prohibited items into the exam hall is strictly forbidden. This includes all forms of electronic devices such as mobile phones, smartwatches, and any other gadgets that could be used to compromise the fairness of the examination. Also, refrain from bringing any unnecessary materials that could distract you or your peers. Consult the official examination guidelines to ensure compliance with the rules regarding permissible items.</p>
            <p>By diligently following these protocols, you ensure that the examination process is fair and efficient for yourself and all other participants. Your adherence to these rules reflects your integrity and commitment to the principles of fair academic practice.</p>
          </div>
        </div>
        {/* Secondary confirmation dialog */}
          <Dialog open={openVisible} onClose={handleCancel}>
            <DialogTitle>Confirmation:</DialogTitle>
            <DialogContent>
              <p>Are you sure submit the exam？</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOk} color="primary">Confirm</Button>
              <Button onClick={handleCancel} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
      </div>
  );
}

export default Exam;
