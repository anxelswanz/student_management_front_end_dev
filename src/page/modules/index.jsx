import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import LeftBar from './../../component/leftbar/leftbar';
import { useNavigate } from 'react-router-dom';
import './Modules.css';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Collapse, Box,  Typography
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { moduleName, moduleCredits, moduleOverview, programmeName, moduleIdList } from '../../api/api';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function Modules() {
  const [user] = useState(JSON.parse(localStorage.user || "{}")) || {};
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const refsdata = useRef([]);
  const tableBoxRef = useRef(null);
  const [programName, setProgramName] = useState([]);
  const [studentId, setStudentId] = useState(user.studentId || "");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user ? user.studentId : null;
    if (user && user.studentId) { 
      setStudentId(user.studentId); }
    //console.log("Student ID:", studentId);
    if (!studentId) {
      console.error('No student ID found');
      
    }

    // 请求获取programme名称
    axios.get(programmeName, {params: { studentId: studentId } })

    .then(response => {
      if (response.status === 200 && response.data && response.data.code === 200) {
        setProgramName(response.data.obj);
      }
    })
    .catch(error => {
      console.error('Error fetching program name:', error);
      setProgramName('Failed to fetch program name');
    });
  }, [user]);


  useEffect(() => {
   
      axios.get(moduleIdList, {params: { studentId: studentId } })
        .then(response => {
          if (response.data.code === 200) {
            const moduleIds = response.data.obj;
            // Fetch module names
            axios.get(moduleName, {params: { studentId: studentId } })
            .then(response => {
              if (response.data.code === 200) {
                const moduleNames = response.data.obj;
                const modulesData = moduleIds.map((moduleId, index) => ({
                  moduleId,
                  moduleName: moduleNames[index],
                }));
                fetchModuleCredits(modulesData);
              }
            });
          }
        }).catch(error => console.error('Error fetching module data:', error));
    
  }, [studentId]);
  

  const fetchModuleCredits = (modulesData) => {
    axios.get(moduleCredits, {params: { studentId: studentId } })
      .then(response => {
        if (response.data.code === 200) {
          const creditsData = response.data.obj;
          const updatedModules = modulesData.map(module => ({
            ...module,
            credits: creditsData.find(credit => credit.moduleName === module.moduleName)?.credits || 'N/A',
          }));
          fetchModuleOverviews(updatedModules);
        }
      })
      .catch(error => console.error('Error fetching module credits:', error));
  };

  const fetchModuleOverviews = (modulesData) => {
    axios.get(moduleOverview, {params: { studentId: studentId } })

      .then(response => {
        if (response.data.code === 200) {
          const overviewData = response.data.obj;
          const updatedModules = modulesData.map((module, index) => ({
            ...module,
            overview: overviewData[index] || 'No overview available',
          }));
          setList(updatedModules);
        }
      })
      .catch(error => console.error('Error fetching module overview:', error));
  };
  
  

  const handleButtonClick = (index) => {
    const updatedList = list.map((item, idx) =>
      idx === index ? { ...item, open: !item.open } : item
    );
    setList(updatedList);
    navigate(`/Modules#line${index}`);

    setTimeout(() => {
      const updatedRowElement = refsdata.current[index];
      if (updatedRowElement && updatedRowElement.current) {
        tableBoxRef.current.scrollTo({
          top: updatedRowElement.current.offsetTop,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  return (
    <div className='container' id='Modules'>
      <div className='leftbox'>
        <LeftBar tabNav="Modules" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
          <h2 className='gFont'>{programName}</h2>
            <div className='fn-clear'>
              {list.map((ele, i) => (
                <Button
                  key={i}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => { handleButtonClick(i); }}
                >
                  {ele.moduleId}  {ele.moduleName}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className='mainList'>
          <h2 className='gFont'>Module List</h2>
          <TableContainer component={Paper} className='tablebox' ref={tableBoxRef}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell className="boldAndLarge">Modules</TableCell>
                  <TableCell align="center"></TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
              {list.map((item, i) => (
  <Fragment key={i}>
    <TableRow 
      className={item.open ? "expanded" : ""}
      id={`line${i}`}>
      <TableCell component="th" scope="row" ref={refsdata.current[i]}>
        <IconButton size="small">
          <StarBorderIcon />
        </IconButton>
        {item.moduleName}
      </TableCell>
      <TableCell align="center">
        <IconButton aria-label="expand row" size="small" onClick={() => {
          let updatedList = [...list];
          updatedList[i].open = !updatedList[i].open;
          setList(updatedList);
        }}>
          {item.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
    {item.open && (
      <>
        <TableRow className="info-separator">
          <TableCell colSpan={3}>
            <Typography variant="subtitle1" display="block">
              Overview
            </Typography>
            <Typography variant="body1" display="block">
              {item.overview}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow className="info-separator">
          <TableCell colSpan={3}>
            <Typography variant="subtitle1" display="block">
              Credits
            </Typography>
            <Typography variant="body1" display="block">
              {item.credits}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow className="info-separator">
          <TableCell colSpan={3}>
            <Typography variant="subtitle1" display="block">
              Term
            </Typography>
            <Typography variant="body1" display="block">
              {user.studentId?.slice(1, 3) || "Not available"} {/* 从 studentId 的第二和第三位获取数字作为 term，如果不存在则显示 "Not available" */}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow className="info-separator">
          <TableCell colSpan={3}>
            <Typography variant="subtitle1" display="block">
              Enrolled as
            </Typography>
            {user && user.studentId?.charAt(0) === "S" ? ( // 确保 user 和 studentId 存在，并且 studentId 的第一位是 "S"
                <Typography variant="body1" display="block">
                  {user.student ? user.student : "Student"} {/* 如果 user.student 存在，则显示，否则显示 "Student" */}
                </Typography>
              ) : (
                <Typography variant="body1" display="block">
                  Not enrolled as student
                </Typography>
              )}
          </TableCell>
        </TableRow>
      </>
    )}
  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Modules;
