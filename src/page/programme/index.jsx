/**
 * Component Name: Programme
 * Description: Students can view the IDs, names, start times, and durations of the modules and moduels owned by their programme.
 * Author: Yu Han
 * Created Date: 2024-04-05
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './../../component/leftbar/leftbar';
import { TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import axios from 'axios';
import {  moduleTime, programmeName, programmeDes, updateProgrammeStatus} from '../../api/api';
import './Programme.css';


function Programme() {
  const [studentModules, setStudentModules] = useState([]);// State to hold student module data
  const [programmeData, setProgrammeData] = useState({});// State to hold programme data
  const [openVisible, setOpenVisible] = useState(false);// State for visibility of the confirmation dialog
  const [drawVisible, setDrawVisible] = useState(false);// State for visibility of the settings menu
  const [programmeStatus, setProgrammeStatus] = useState(null);// State to hold the status of the programme
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));// Retrieve user information from localStorage
  const studentId = user ? user.studentId : null;// If user exists, retrieve student ID; otherwise, null

  
  useEffect(() => {
    if (!studentId) {
      console.error('No student ID found');
      return;
    }
  

// Get moduels details, passing the student ID as a parameter
axios.get(moduleTime, { params: { studentId: studentId } })
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.obj)) {
          const updatedModules = response.data.obj.map(moduleData => ({
            moduleName: moduleData.moduleName,
            StartTime: moduleData.date,
            Duration: moduleData.duration,
            moduleId: moduleData.moduleId
          }));
          setStudentModules(updatedModules);
          console.log(updatedModules);
        }
      })
      .catch(error => {
        console.error('Error fetching module details:', error);
      });


    // Get  programme name, passing the student ID as a parameter
    axios.get(programmeName, { params: { studentId: studentId } })
      .then(response => {
        if (response.data.code === 200 && response.data.obj) {
          setProgrammeData(prevData => ({
            ...prevData,
            name: response.data.obj
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching programme name:', error);
      });


  // Get  programme description, passing the student ID as a parameter
    axios.get(programmeDes, { params: { studentId: studentId } })
    .then(response => {
      if (response.data.code === 200 && response.data.obj) {
        setProgrammeData(prevData => ({
          ...prevData,
          description: response.data.obj
        }));
      }
    })
    .catch(error => {
      console.error('Error fetching programme description:', error);
    });
    }, [studentId]);

// Handle user status change
    const userChange = (val) =>{
      setProgrammeStatus(val);
        setOpenVisible(true);
      };
 
  // Handle cancle operation for the dialog
  const handleCancel = () =>{
    setOpenVisible(false);
    setDrawVisible(false)
  };

  // Handle confirm operation for the dialog
  const handleOk = () => {
    handleCancel();
    if (!studentId || !programmeStatus) {
      console.error('Invalid studentId or programmeStatus');
      return;
    }
    console.log('studentId:', studentId);
    console.log('programmeStatus:', programmeStatus);
    
    // Append parameters to the URL
    const url = `${updateProgrammeStatus}?studentId=${studentId}&programmeStatus=${programmeStatus}`;
  
    // Send PUT request with parameters studentId and programmeStatus
    axios.put(
      url,
      null, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        console.log('Status updated successfully:', response);
        const user = JSON.parse(localStorage.getItem('user') || "{}");
        const newUser = {
          ...user,
          programmeStatus: programmeStatus
        };
        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch(error => {
        console.error('Error updating programme status:', error);
      });
  };
  
 // Open settings menu
  const openMenu = () =>{
    setDrawVisible(val=>!val);
  };


  return (
    <div className='container' id='Programme'>
      <div className='leftbox'>
        <LeftBar tabNav="Programme" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
            {/*Render programme name and description*/}
            <h2 className='gFont'>{programmeData.name}</h2>
            <p class="description">{programmeData.description}</p>
            <div className='open_menu_btn'>
             {/*Settings button, toggles settings menu visibility*/}
              <Button className='menu_btn_first' variant="contained" onClick={openMenu}>Setting</Button>
             {/*Conditionally render buttons if drawVisible is true*/}
              {drawVisible &&(
                  <>
                     {/*Triggers status change to "withdraw"*/}
                    <Button onClick={()=>userChange(3)} className='menu_btn_item' variant="contained">withdraw</Button>
                    {/*Triggers status change to "suspend"*/}
                    <Button onClick={()=>userChange(2)} className='menu_btn_item' variant="contained">suspend</Button>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <div className='mainList'>
          <TableContainer component={Paper} className='tablebox'>
            <Table aria-label="simple table">
              <TableHead>
                {/*Table headers defining module information*/}
                <TableRow>
                  <TableCell>Module ID</TableCell>
                  <TableCell>Module</TableCell>
                  <TableCell align="right">StartTime</TableCell>
                  <TableCell align="right">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*Loop through each module and render detailed information*/}
                {studentModules.map((module, index) => (
                  <TableRow key={index}>
                  <TableCell component="th" scope="row" className="gFont">{module.moduleId}</TableCell>
                  <TableCell component="th" scope="row" className="gFont">{module.moduleName}</TableCell>
                  <TableCell align="right" className="gFont">{module.StartTime}</TableCell>
                  <TableCell align="right" className="gFont">{module.Duration}M</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='fn-clear tr btnline'>
           {/*See My Modules button, navigates to modules page*/}
          <Button size="small" onClick={() => navigate('/Modules')} variant="contained" color="primary">See My Modules</Button>
          {/*Academic History button, navigates to academic history page*/}
          &nbsp;<Button size="small" onClick={() => navigate('/AcademicHistory')} variant="contained" color="primary">Programme History</Button>
        </div>
      </div>

     {/*Secondary confirmation dialog*/}
        <Dialog open={openVisible} onClose={handleCancel}>
          <DialogTitle>Kind Reminder:</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to change the status?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} color="primary">Confirm</Button>
            <Button onClick={handleCancel} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default Programme;