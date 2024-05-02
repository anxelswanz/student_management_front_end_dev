import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './../../component/leftbar/leftbar';
import { TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import axios from 'axios';
import {  moduleTime, programmeName, programmeDes, updateProgrammeStatus} from '../../api/api';
import './Programme.css';


function Programme() {
  const [studentModules, setStudentModules] = useState([]);
  const [programmeData, setProgrammeData] = useState({});
  const [openVisible, setOpenVisible] = useState(false);
  const [drawVisible, setDrawVisible] = useState(false);
  const [programmeStatus, setProgrammeStatus] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const studentId = user ? user.studentId : null;

  
  useEffect(() => {
    if (!studentId) {
      console.error('No student ID found');
      return;
    }
  

  



// Fetching details for each module
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







    // Fetching programme name
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


  // Fetching programme description
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

    const userChange = (val) =>{
      setProgrammeStatus(val);
        setOpenVisible(true);
      };
 
  const handleCancel = () =>{
    setOpenVisible(false);
    setDrawVisible(false)
  };
  const handleOk = () => {
    handleCancel();
    if (!studentId || !programmeStatus) {
      console.error('Invalid studentId or programmeStatus');
      return;
    }
    console.log('studentId:', studentId);
    console.log('programmeStatus:', programmeStatus);
    
    // 将参数附加到 URL 中
    const url = `${updateProgrammeStatus}?studentId=${studentId}&programmeStatus=${programmeStatus}`;
  
    axios.put(
      url,
      null, // 空的请求体
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
            {/* 渲染程序名称和描述 */}
            <h2 className='gFont'>{programmeData.name}</h2>
            <p class="description">{programmeData.description}</p>
            <div className='open_menu_btn'>
              <Button className='menu_btn_first' variant="contained" onClick={openMenu}>Setting</Button>
              {
                drawVisible &&(
                  <>
                    <Button onClick={()=>userChange(3)} className='menu_btn_item' variant="contained">withdraw</Button>
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
                <TableRow>
                  <TableCell>Module ID</TableCell>
                  <TableCell>Module</TableCell>
                  <TableCell align="right">StartTime</TableCell>
                  <TableCell align="right">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
          <Button size="small" onClick={() => navigate('/Modules')} variant="contained" color="primary">See My Modules</Button>
          &nbsp;<Button size="small" onClick={() => navigate('/AcademicHistory')} variant="contained" color="primary">Programme History</Button>
        </div>
      </div>

      {/* 二级确认框 */}
        <Dialog open={openVisible} onClose={handleCancel}>
          <DialogTitle>温馨提示：</DialogTitle>
          <DialogContent>
            <p>您是否确认改变状态？</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} color="primary">确认</Button>
            <Button onClick={handleCancel} color="primary">取消</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default Programme;