/**
 * Component Name: Modules
 * Description: Students can view the overview, credits, term, enrolled as for different modules.
 * Author: Yu Han
 * Created Date: 2024-04-09
 */

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
  const [user] = useState(JSON.parse(localStorage.user || "{}")) || {};// Initialize user state with user information retrieved from localStorage or an empty object if no user is found
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const refsdata = useRef([]);// Ref to store references to each module row
  const tableBoxRef = useRef(null);// Ref to store reference to the table containe
  const [programName, setProgramName] = useState([]);// State peogramme name
  const [studentId, setStudentId] = useState(user.studentId || "");//State tudent ID

  useEffect(() => {
    refsdata.current = list.map(() => React.createRef());
  }, [list]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));// Get user information from localStorage
    const studentId = user ? user.studentId : null;// Extract student ID from user information or set to null if user is not found
    if (user && user.studentId) { 
      setStudentId(user.studentId); }
    //console.log("Student ID:", studentId);
    if (!studentId) {
      console.error('No student ID found');
      
    }

    // Get program name using student ID as parameter
    axios.get(programmeName, {params: { studentId: studentId } })

    .then(response => {
      if (response.status === 200 && response.data && response.data.code === 200) {
        setProgramName(response.data.obj);// Set program name state if request is successful
      }
    })
    .catch(error => {
      console.error('Error fetching program name:', error);
      setProgramName('Failed to fetch program name');
    });
  }, [user]);


    // Get module ID using student ID as parameter
   useEffect(() => {
      axios.get(moduleIdList, {params: { studentId: studentId } })
        .then(response => {
          if (response.data.code === 200) {
             // If the request is successful, get the list of module IDs
            const moduleIds = response.data.obj;
            // Initiate a request for the module name based on a list of module IDs
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
  
// Get module credit information using student ID as parameter
  const fetchModuleCredits = (modulesData) => {
    axios.get(moduleCredits, {params: { studentId: studentId } })
      .then(response => {
        if (response.data.code === 200) {
          const creditsData = response.data.obj;
          // Update the credits information in the module data object array
          const updatedModules = modulesData.map(module => ({
            ...module,
            credits: creditsData.find(credit => credit.moduleName === module.moduleName)?.credits || 'N/A',
          }));
           // Initiate a request for module overview information based on the updated module data array
          fetchModuleOverviews(updatedModules);
        }
      })
      .catch(error => console.error('Error fetching module credits:', error));
  };

  // Get modules overview using student ID as parameter
  const fetchModuleOverviews = (modulesData) => {
    axios.get(moduleOverview, {params: { studentId: studentId } })

      .then(response => {
        if (response.data.code === 200) {
          const overviewData = response.data.obj;
          const updatedModules = modulesData.map((module, index) => ({
            ...module,
            overview: overviewData[index] || 'No overview available',
          }));
          // Update moduleList status
          setList(updatedModules);
        }
      })
      .catch(error => console.error('Error fetching module overview:', error));
  };
  
    // Function to handle module button click event
  const handleButtonClick = (index) => {
    const updatedList = list.map((item, idx) =>
      idx === index ? { ...item, open: !item.open } : item
    );
    setList(updatedList);// Update moduleList status
    navigate(`/Modules#line${index}`);// Navigate to the anchor point of the corresponding module
    
    // Scroll to the updated module line element
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
          <h2 className='gFont'>{programName}</h2>{/* Render program name */}
            <div className='fn-clear'>
              {/* Render module buttons for switching between different modules */}
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
                <TableCell className="boldAndLarge">Modules</TableCell>{/* Module table header */}
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {/* Render module list */}
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
                   {/* Module expand/collapse button cell */}
                    <TableCell align="center">
                      <IconButton aria-label="expand row" size="small" onClick={() => {
                        let updatedList = [...list];
                        updatedList[i].open = !updatedList[i].open;
                        setList(updatedList);
                      }}>
                        {/* Display different icons based on module expand state */}
                        {item.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {/* Display overview, credits, term, and enrollment status if module is expanded */}
                  {item.open && (
                    <>
                    {/* Module overview */}
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

                       {/* Module credits */}
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

                      {/* Module term */}
                      <TableRow className="info-separator">
                        <TableCell colSpan={3}>
                          <Typography variant="subtitle1" display="block">
                            Term
                          </Typography>
                          <Typography variant="body1" display="block">
                            {user.studentId?.slice(1, 3) || "Not available"} {/* Get the number from the second and third digits of studentId as term, or "Not available" if it doesn't exist. */}
                          </Typography>
                        </TableCell>
                      </TableRow>

                      {/* Student enrollment status */}
                      <TableRow className="info-separator">
                        <TableCell colSpan={3}>
                          <Typography variant="subtitle1" display="block">
                            Enrolled as
                          </Typography>
                          {user && user.studentId?.charAt(0) === "S" ? ( // Ensure user and studentId exist, and the first character of studentId is "S"
                              <Typography variant="body1" display="block">
                                {user.student ? user.student : "Student"} {/* Display user name or "Student" if user.student exists */}
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
