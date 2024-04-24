import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './../../component/leftbar/leftbar';
import { TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
import axios from 'axios';
import { moduleIdList, moduleTime, programmeName, programmeDes} from '../../api/api';
import './Programme.css';

function Programme() {
  const [studentModules, setStudentModules] = useState([]);
  const [programmeData, setProgrammeData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching list of module IDs
    const fetchModuleIds = () => {
      axios.get(moduleIdList)
        .then(response => {
          if (response.data.code === 200 && Array.isArray(response.data.obj)) {
            const moduleIds = response.data.obj;
            fetchModuleDetails(moduleIds);
          }
        })
        .catch(error => {
          console.error('Error fetching module IDs:', error);
        });
    };

    // Fetching details for each module
    const fetchModuleDetails = (moduleIds) => {
      moduleIds.forEach(moduleId => {
        axios.get(moduleTime, { params: { moduleId } })
          .then(response => {
            if (response.data.code === 200 && response.data.obj && response.data.obj.length > 0) {
              const moduleDetails = {
                moduleId,
                moduleName: response.data.obj[0].moduleName,
                StartTime: response.data.obj[0].date,
                EndTime: response.data.obj[0].endTime
              };
              setStudentModules(prevModules => [...prevModules, moduleDetails]);
              console.log(moduleId);
            }
          })
          .catch(error => console.error(`Error fetching details for module ${moduleId}:`, error));
      });
    };

    // Fetching programme name
    axios.get(programmeName)
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.obj) && response.data.obj.length > 0) {
          setProgrammeData(prevData => ({
            ...prevData,
            name: response.data.obj[0]
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching programme name:', error);
      });

    // Fetching programme description
    axios.get(programmeDes)
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.obj) && response.data.obj.length > 0) {
          setProgrammeData(prevData => ({
            ...prevData,
            description: response.data.obj[0]
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching programme description:', error);
      });

    fetchModuleIds();
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
            <p class="description">{programmeData.description}</p>

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
