import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import LeftBar from './../../component/leftbar/leftbar';
import { useNavigate } from 'react-router-dom';
import './Modules.css';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Collapse, Box, Divider, Typography
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {moduleIdInfo} from '../../api/api';

function Modules() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const refsdata = useRef([]);
  const tableBoxRef = useRef(null);

  useEffect(() => {
    axios.get(moduleIdInfo)
      .then(response => {
        if (response.data.code === 200) {
          const modulesData = response.data.obj.map(module => ({
            moduleId: module.moudleId,
            moduleName: module.moudleName,
            credits: module.credits,
            overview: module.overview,
          }));
          setList(modulesData); 
        }
      })
      .catch(error => console.error('Error fetching module data:', error));
  }, []);
  

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
            <h2 className='gFont'>Module</h2>
            <div className='fn-clear'>
              {list.map((ele, i) => (
                <Button
                  key={i}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => { handleButtonClick(i); }}
                >
                  ID:{ele.moduleId}
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
                  <TableCell>Module</TableCell>
                  <TableCell align="center">Credits</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((item, i) => (
                  <Fragment key={i}>
                    <TableRow id={`line${i}`}>
                      <TableCell component="th" scope="row" ref={refsdata.current[i]}>
                        {item.moduleName}
                      </TableCell>
                      <TableCell align="center">{item.credits}</TableCell>
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
                            <Divider style={{ margin: '32px 0' }} />
                           
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
