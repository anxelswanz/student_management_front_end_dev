/**
 * Component Name: Academic History
 * Description: Students can view their coursework and exam mark.
 * Author: Yu Han
 * Created Date: 2024-04-17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LeftBar from './../../../component/staffLeftbar/leftbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Button, AppBar, Tabs, Tab, Box, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import './academichistory.css';
import { studyRecord, choseProgramme } from "../../../api/api";
import axios from "axios";
import { Table } from "antd";

// Define the TabPanel component to display content for different tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index} // Determine whether to hide based on value and index
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}> {/* Display content if the current tab is selected */}
          {children}
        </Box>
      )}
    </div>
  );
}

// Set the property type requirements for the TabPanel component
TabPanel.propTypes = {
  children: PropTypes.node,// Children nodes
  index: PropTypes.any.isRequired,// Index value
  value: PropTypes.any.isRequired,
};

// Helper function to generate properties for tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Main component definition
function StudentAcademicHistoryDetail() {
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setYear(newValue + 1);
    getStudentData();
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    // If selectedProgramme has a value and the user is trying to switch to a non-selected Tab, prevent such switching
    if (selectedProgramme && selectedProgramme !== programmeTabs[newValue].id) {
      return;
    }
    // Allow normal tab switching
  };

  // Pre-defined mapping of program IDs to tab indices
  const programmeTabs = {
    "S01": 0, // Software
    "M01": 1, // Mechanical
    "E01": 2, // Electronics Hardware
    "E02": 3  // Electromechanical
  };
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  useEffect(() => {
    getStudentData();// Fetch student data when the component mounts
  }, []);

  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState(1);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // Get data for the table
  const getStudentData = async () => {
    try {
      const params = {
        key: "",
        studentId: user.studentId,
        year: year
      };
      const { data } = await axios.get(studyRecord, { params });
      console.log(data);
      if (data.code === 200) {
        if (Array.isArray(data.obj.records)) {
          setTableData(data.obj.records);// Set table data
        } else {
          console.error("Data records is not an array:", data.obj.records);
        }
      } else {
        console.error("Failed to fetch data: ", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Define table column configuration
  const columns = [
    {
      title: 'ID',// Column title
      dataIndex: 'moduleId',// Data field name
      key: 'moduleId',// Unique key name
      render: (text) => text,
    },
    {
      title: 'Module Name',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: 'Coursework Mark(40%)',
      dataIndex: 'courseworkMark',
      key: 'courseworkMark',
      render: (text) => text === -1 ? 'N/A' : text,// Render function for special value handling
    },
    {
      title: 'Exam Mark(60%)',
      dataIndex: 'examMark',
      key: 'examMark',
      render: (text) => text === -1 ? 'N/A' : text,
    },
    {
      title: 'Final Mark',
      dataIndex: 'totalMark',
      key: 'totalMark',
      render: (text) => text === -1 ? 'N/A' : text,
    },
  ];

  const renderTable = () => {
    return <Table columns={columns} dataSource={tableData} rowKey="moduleId" />;
  };
  


  const [menuVisible, setMenuVisible] = useState(false);

  // Function to toggle menu visibility on button click
  const btnChange = () => {
    setMenuVisible(!menuVisible);
  };

  // Switch data
  const [programmeId, setProgrammeId] = useState("");

  const portStudent = (val) => {
    setSelectedProgramme(val);
    setProgrammeId(val);
    setOpenVisible(true);
  };

  const [openVisible, setOpenVisible] = useState(false);

 // Handle cancel operation for the dialog
  const handleCancel = () => {
    setOpenVisible(false);
    setMenuVisible(false);
  };

  // Handle confirm operation for the dialog
  const handleOk = () => {
    if (!user || !programmeId) {
      console.error('Necessary information is missing');
      return; // Make sure all necessary information is complete
    }
   // Send a put request to the backend to update the status, with studentId and programmeId as parameters
    const url = `${choseProgramme}?studentId=${encodeURIComponent(user.studentId)}&programmeId=${encodeURIComponent(programmeId)}`;
    axios.put(url)
      .then(response => {
        console.log('Status update successful:', response);
        const newTabValue = programmeTabs[programmeId];
        if (newTabValue !== undefined) {
          setValue2(newTabValue);
        }
        setMenuVisible(false);// Hide menu
        setOpenVisible(false);// Close the dialog
      })
      .catch(error => {
        console.error('Failed to update status:', error);
      });
  
    setOpenVisible(false); // Close the dialog
  };
  

 

  return (
    <div className='container' id='MyPrograme'>
      <div className='leftbox'>
        <LeftBar tabNav="MyPrograme" />
      </div>
      <div className='maincenter'>
        <AppBar position="static">{/* AppBar provides a fixed container at the top for placing tabs */}
          <Paper square>
          <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="secondary">
            <Tab label="Year 1" {...a11yProps(0)} />
            <Tab label="Year 2" {...a11yProps(1)} />
            <Tab label="Year 3" {...a11yProps(2)} disabled={user.studentType === 3} />
            <Tab label="Year 4" {...a11yProps(3)} disabled={user.studentType === 3} />
          </Tabs>{/*Display year1 and year2 only if studentType is 3, which means they are postgraduate*/}
          </Paper>
        </AppBar>

        {/* Content display area for each grade, using the TabPanel component to encapsulate content */}
        <TabPanel value={value} index={0}>
          <div className='tabbox' hidden>
          </div>
          <>{renderTable()}</>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className='tabbox'>
            <div className='tiptxt'>
              <div className='menu_btn'>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={btnChange} // Set button to show or hide additional program selection menu
                >
                  settings
                </Button>
                {
                  menuVisible && (
                    <div className='menu_box'>       {/*Content in the selection menu*/}
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => portStudent("E01")}       /*Send programmeId to the backend after clicking*/
                      >
                        Electronics &nbsp;&nbsp; Hardware
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => portStudent("E02")}
                      >
                        Electromechanica
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => portStudent("M01")}
                      >
                        Mechanical
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => portStudent("S01")}
                      >
                        Software
                      </Button>
                    </div>
                  )
                }
              </div>
            </div>

            {/*Display pages for each different programme*/}
            <AppBar position="static">
              <Paper square>
              <Tabs value={value2} onChange={handleChange2} indicatorColor="secondary" textColor="secondary">
              <Tab label="Software" {...a11yProps(0)} disabled={selectedProgramme && selectedProgramme !== "S01" && value === 1} />
              <Tab label="Mechanical" {...a11yProps(1)} disabled={selectedProgramme && selectedProgramme !== "M01" && value === 1} />
              <Tab label="Electronics Hardware" {...a11yProps(2)} disabled={selectedProgramme && selectedProgramme !== "E01" && value === 1} />
              <Tab label="Electromechanical" {...a11yProps(3)} disabled={selectedProgramme && selectedProgramme !== "E02" && value === 1} />
            </Tabs>{/*Disable other programme pages when the user chooses one of them*/}
              </Paper>
            </AppBar>
            <TabPanel value={value2} index={0}>
              <>{renderTable()}</>
            </TabPanel>
            <TabPanel value={value2} index={1}>
              <>{renderTable()}</>
            </TabPanel>
            <TabPanel value={value2} index={2}>
              <>{renderTable()}</>
            </TabPanel>
            <TabPanel value={value2} index={3}>
              <>{renderTable()}</>
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <>{renderTable()}</>
        </TabPanel>
        <TabPanel value={value} index={3} >
          <>{renderTable()}</>
        </TabPanel>
      </div>

      {/*Secondary confirmation dialog*/}
      <Dialog open={openVisible} onClose={handleCancel}>
        <DialogTitle>Confirmation:</DialogTitle>
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

export default StudentAcademicHistoryDetail;