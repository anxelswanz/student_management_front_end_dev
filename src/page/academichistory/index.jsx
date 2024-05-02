import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LeftBar from '../../component/leftbar/leftbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Button, AppBar, Tabs, Tab, Box, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import './academichistory.css';
import { studyRecord, choseProgramme } from "../../api/api";
import axios from "axios";
import { Table } from "antd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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

function AcademicHistory() {
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
    // 如果selectedProgramme有值，并且用户试图切换到非选择的Tab，则阻止这种切换
    if (selectedProgramme && selectedProgramme !== programmeTabs[newValue].id) {
      return;
    }
    // 允许正常切换Tab
  };
  // 预先定义好的程序ID与Tab索引的映射
  const programmeTabs = {
    "S01": 0, // Software
    "M01": 1, // Mechanical
    "E01": 2, // Electronics Hardware
    "E02": 3  // Electromechanical
  };
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  useEffect(() => {
    getStudentData();
  }, []);

  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState(1);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // 获取列表的数据
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
          setTableData(data.obj.records);
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'moduleId',
      key: 'moduleId',
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
      render: (text) => text === -1 ? 'N/A' : text,
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

  const btnChange = () => {
    setMenuVisible(!menuVisible);
  };

  // 切换数据
  const [programmeId, setProgrammeId] = useState("");

  const portStudent = (val) => {
    setSelectedProgramme(val);
    setProgrammeId(val);
    setOpenVisible(true);
  };

  const [openVisible, setOpenVisible] = useState(false);

  const handleCancel = () => {
    setOpenVisible(false);
    setMenuVisible(false);
  };

  const handleOk = () => {
    if (!user || !programmeId) {
      console.error('缺少必要的信息');
      return; // 确保所有必要信息都齐全
    }
  
    const url = `${choseProgramme}?studentId=${encodeURIComponent(user.studentId)}&programmeId=${encodeURIComponent(programmeId)}`;
  
    axios.put(url)
      .then(response => {
        console.log('状态更新成功:', response);
        const newTabValue = programmeTabs[programmeId];
        if (newTabValue !== undefined) {
          setValue2(newTabValue);
        }
        setMenuVisible(false);
        setOpenVisible(false);
      })
      .catch(error => {
        console.error('更新状态失败:', error);
      });
  
    setOpenVisible(false); // 关闭对话框
  };
  

 

  return (
    <div className='container' id='MyPrograme'>
      <div className='leftbox'>
        <LeftBar tabNav="MyPrograme" />
      </div>
      <div className='maincenter'>
        <AppBar position="static">
          <Paper square>
          <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="secondary">
            <Tab label="Year 1" {...a11yProps(0)} />
            <Tab label="Year 2" {...a11yProps(1)} />
            <Tab label="Year 3" {...a11yProps(2)} disabled={user.studentType === 3} />
            <Tab label="Year 4" {...a11yProps(3)} disabled={user.studentType === 3} />
          </Tabs>
          </Paper>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className='tabbox' hidden>
            {/* component={Paper} */}
          </div>
          <>{renderTable()}</>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className='tabbox'>
            <div className='tiptxt'>
              {/* xxxxxxxxxxxxxxxxxx */}
              <div className='menu_btn'>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={btnChange}
                >
                  settings
                </Button>
                {
                  menuVisible && (
                    <div className='menu_box'>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => portStudent("E01")}
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
            <AppBar position="static">
              <Paper square>
              <Tabs value={value2} onChange={handleChange2} indicatorColor="secondary" textColor="secondary">
              <Tab label="Software" {...a11yProps(0)} disabled={selectedProgramme && selectedProgramme !== "S01" && value === 1} />
              <Tab label="Mechanical" {...a11yProps(1)} disabled={selectedProgramme && selectedProgramme !== "M01" && value === 1} />
              <Tab label="Electronics Hardware" {...a11yProps(2)} disabled={selectedProgramme && selectedProgramme !== "E01" && value === 1} />
              <Tab label="Electromechanical" {...a11yProps(3)} disabled={selectedProgramme && selectedProgramme !== "E02" && value === 1} />
            </Tabs>
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

export default AcademicHistory;
