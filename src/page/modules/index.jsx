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
import { moduleIdInfo, moduleIdCredits, moduleOverview, programmeName } from '../../api/api';
import StarBorderIcon from '@material-ui/icons/StarBorder';


function Modules() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const refsdata = useRef([]);
  const tableBoxRef = useRef(null);
  const [programName, setProgramName] = useState([]);

  useEffect(() => {
    // 请求获取programme名称
    axios.get(programmeName, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200 && response.data && response.data.code === 200) {
        setProgramName(response.data.obj[0]);
      }
    })
    .catch(error => {
      console.error('Error fetching program name:', error);
      setProgramName('Failed to fetch program name');
    });
  }, []);

  useEffect(() => {
    // Fetch module IDs and names
    axios.get(moduleIdInfo)
      .then(response => {
        if (response.data.code === 200) {
          const modulesData = response.data.obj.map(module => ({
            moduleId: module.moduleId,
            moduleName: module.moduleName,
          }));
          fetchModuleCredits(modulesData);
        }
      })
      .catch(error => console.error('Error fetching module IDs:', error));
  }, []);

  


  const fetchModuleCredits = (modulesData) => {
    axios.get(moduleIdCredits)
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
    axios.get(moduleOverview)
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
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((item, i) => (
                  <Fragment key={i}>
                    <TableRow id={`line${i}`}>
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
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Collapse in={item.open} timeout="auto" unmountOnExit>
                          <Box margin={1}>
                            <Typography variant="subtitle1" display="block">
                              Overview
                            </Typography>
                            <Typography variant="body1" display="block">
                              {item.overview}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow> 
                    <TableRow>
                    <TableCell align="left">
                        <Collapse in={item.open} timeout="auto" unmountOnExit>
                          <Box margin={1}>
                            <Typography variant="subtitle1" display="block">
                              Credits
                            </Typography>
                            <Typography variant="body1" display="block">
                              {item.credits}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                      </TableRow> 
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