
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import LeftBar from '../../component/leftbar/leftbar'
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  AppBar, Tabs, Tab, Box,
  Menu, MenuItem
} from '@material-ui/core';
import './myprograme.css';
// 页签切换
function TabPanel (props) {
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
          {/*  */}
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
function a11yProps (index) {
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
function Myprograme () {
  useStyles();
// 下拉菜单
  const [anchorEl, setAnchorEl] = React.useState(null);
  // 下拉菜单
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // 下拉菜单隐藏
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 页签切换
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  useEffect(() => {
  }, []);

  // 模拟的学生模块列表数据
  const studentModules = [
    { id: 1, module: 'Mathematics', credits: 3, grade: 'A' },
    { id: 2, module: 'Physics', credits: 4, grade: 'B' },
    { id: 3, module: 'History', credits: 3, grade: 'C' },
    { id: 4, module: 'Computer Science', credits: 5, grade: 'A' },
  ];
  const navigate = useNavigate();
  return (
    <div className='container' id='MyPrograme'>
      <div className='leftbox'>
        <LeftBar tabNav="MyPrograme" />
      </div>
      <div className='maincenter'>
        <AppBar position="static">
          <Paper square>
            <Tabs value={value} onChange={handleChange} indicatorColor="secondary"
              textColor="secondary">
              <Tab label="Year 1" {...a11yProps(0)} />
              <Tab label="Year 2" {...a11yProps(1)} />
              <Tab label="Year 3" {...a11yProps(2)} />
              <Tab label="Year 4" {...a11yProps(3)} />
            </Tabs>
          </Paper>

        </AppBar>
        <TabPanel value={value} index={0}>
          <div className='tabbox'>
            {/* component={Paper} */}
            <TableContainer className='tablebox'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Module Name</TableCell>
                    <TableCell align="center">start time</TableCell>
                    <TableCell align="center">end time</TableCell>
                    <TableCell align="center">grade</TableCell>
                    <TableCell align="center">opration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      1
                    </TableCell>
                    <TableCell align="center">xx</TableCell>
                    <TableCell align="center">xxx</TableCell>
                    <TableCell align="center">xxx</TableCell>
                    <TableCell align="center">xx</TableCell>
                    <TableCell align="right">
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        Open Menu
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>withdraw</MenuItem>
                        <MenuItem onClick={handleClose}>suspend</MenuItem>
                        <MenuItem onClick={handleClose}>enroll</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className='tabbox'>
            <div className='tiptxt'>
              xxxxxxxxxxxxxxxxxx
            </div>
            <AppBar position="static">
              <Paper square>
                <Tabs value={value2} onChange={handleChange2} indicatorColor="secondary"
                  textColor="secondary">
                  <Tab label="A专业" {...a11yProps(0)} />
                  <Tab label="B专业" {...a11yProps(1)} />
                  <Tab label="C专业" {...a11yProps(2)} />
                  <Tab label="D专业" {...a11yProps(3)} />
                </Tabs>
              </Paper>

            </AppBar>



            <TabPanel value={value2} index={0}>
              <TableContainer className='tablebox'>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Module Name</TableCell>
                      <TableCell align="center">start time</TableCell>
                      <TableCell align="center">end time</TableCell>
                      <TableCell align="center">grade</TableCell>
                      <TableCell align="center">opration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        5
                      </TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="right">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Open Menu
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>withdraw</MenuItem>
                          <MenuItem onClick={handleClose}>suspend</MenuItem>
                          <MenuItem onClick={handleClose}>enroll</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        5
                      </TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="right">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Open Menu
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>witjdraw</MenuItem>
                          <MenuItem onClick={handleClose}>suspend</MenuItem>
                          <MenuItem onClick={handleClose}>enroll</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        5
                      </TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="right">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Open Menu
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>withdraw</MenuItem>
                          <MenuItem onClick={handleClose}>suspend</MenuItem>
                          <MenuItem onClick={handleClose}>enroll</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        5
                      </TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="right">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Open Menu
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>withdraw</MenuItem>
                          <MenuItem onClick={handleClose}>suspend</MenuItem>
                          <MenuItem onClick={handleClose}>enroll</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        5
                      </TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="right">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Open Menu
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>withdraw</MenuItem>
                          <MenuItem onClick={handleClose}>suspend</MenuItem>
                          <MenuItem onClick={handleClose}>enroll</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        5
                      </TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xxx</TableCell>
                      <TableCell align="center">xx</TableCell>
                      <TableCell align="right">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Open Menu
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>withdraw</MenuItem>
                          <MenuItem onClick={handleClose}>suspend</MenuItem>
                          <MenuItem onClick={handleClose}>enroll</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value2} index={1}>
              1
            </TabPanel>
            <TabPanel value={value2} index={2}>
              2
            </TabPanel>
            <TabPanel value={value2} index={3}>
              3
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className='tabbox'>
            <TableContainer className='tablebox'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Module Name</TableCell>
                    <TableCell align="center">start time</TableCell>
                    <TableCell align="center">end time</TableCell>
                    <TableCell align="center">grade</TableCell>
                    <TableCell align="center">opration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      3
                    </TableCell>
                    <TableCell align="center">xx</TableCell>
                    <TableCell align="center">xxx</TableCell>
                    <TableCell align="center">xxx</TableCell>
                    <TableCell align="center">xx</TableCell>
                    <TableCell align="right">
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        Open Menu
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>withdraw</MenuItem>
                        <MenuItem onClick={handleClose}>suspend</MenuItem>
                        <MenuItem onClick={handleClose}>enroll</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </TabPanel>
        <TabPanel value={value} index={3} >
          <div className='tabbox'>
            <TableContainer className='tablebox'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Module Name</TableCell>
                    <TableCell align="center">start time</TableCell>
                    <TableCell align="center">end time</TableCell>
                    <TableCell align="center">grade</TableCell>
                    <TableCell align="center">opration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      5
                    </TableCell>
                    <TableCell align="center">xx</TableCell>
                    <TableCell align="center">xxx</TableCell>
                    <TableCell align="center">xxx</TableCell>
                    <TableCell align="center">xx</TableCell>
                    <TableCell align="right">
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        Open Menu
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>withdraw</MenuItem>
                        <MenuItem onClick={handleClose}>suspend</MenuItem>
                        <MenuItem onClick={handleClose}>enroll</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
export default Myprograme;
