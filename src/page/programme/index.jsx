import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './../../component/leftbar/leftbar';
import { TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
import axios from 'axios';
import { moduleIdTime, programmeInfo } from '../../api/api';
import './Programme.css';

function Programme() {
  const [studentModules, setStudentModules] = useState([]);
  const [programmeData, setProgrammeData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(moduleIdTime) 
    .then(response => {
      if (response.data.code === 200) {
        const moduleData = {
          moduleId: response.data.obj.moudleId,
          moduleName: response.data.obj.moudleName,
          StartTime: response.data.obj.date,
          EndTime: response.data.obj.endTime,
        };
        setStudentModules(prevModules => [...prevModules, moduleData]);
      }
    })
    .catch(error => {
      console.error('Error fetching module data:', error);
    });
  
    // 获取programme和description数据
    axios.get(programmeInfo) 
      .then(response => {
        if (response.data.code === 200) {
          setProgrammeData({
            name: response.data.obj.programmeName,
            description: response.data.obj.description
          });
        }
      })
      .catch(error => {
        console.error('Error fetching programme data:', error);
      });
  }, []);
  

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
            <p>{programmeData.description}</p>
          </div>
        </div>
        <div className='mainList'>
          <h2 className='gFont'>Module List</h2>
          <TableContainer component={Paper} className='tablebox'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Module ID</TableCell>
                  <TableCell>Module</TableCell>
                  <TableCell align="right">StartTime</TableCell>
                  <TableCell align="right">EndTime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentModules.map((module, index) => (
                  <TableRow key={index}>
                  <TableCell component="th" scope="row" className="gFont">{module.moduleId}</TableCell>
                  <TableCell component="th" scope="row" className="gFont">{module.moduleName}</TableCell>
                  <TableCell align="right" className="gFont">{module.StartTime}</TableCell>
                  <TableCell align="right" className="gFont">{module.EndTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='fn-clear tr btnline'>
          <Button size="small" onClick={() => navigate('/Modules')} variant="contained" color="primary">See My Modules</Button>
          &nbsp;<Button size="small" onClick={() => navigate('/MyPrograme')} variant="contained" color="primary">Programme History</Button>
        </div>
      </div>
    </div>
  );
}


export default Programme;
