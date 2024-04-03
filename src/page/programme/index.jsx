
import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import LeftBar from './../../component/leftbar/leftbar'
import {TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, Button} from '@material-ui/core';
import './Programme.css'

//只在组件挂载时执行一次 
function Programme () {
  useEffect(() => {
  }, []);

  // 模拟的学生模块列表数据
  const studentModules = [
    { id: 1, module: 'Mathematics', StartTime: 'xx', EndTime: 'xx' },
    { id: 2, module: 'Physics', StartTime: 'xx', EndTime: 'xx' },
    { id: 3, module: 'History', StartTime: 'xx', EndTime: 'xx' },
    { id: 4, module: 'Computer Science', StartTime: 'xx', EndTime: 'xx' },
    { id: 2, module: 'Physics', StartTime: 'xx', EndTime: 'xx' },
    { id: 3, module: 'History', StartTime: 'xx', EndTime: 'xx' },
    { id: 4, module: 'Computer Science', StartTime: 'xx', EndTime: 'xx' },
    { id: 2, module: 'Physics', StartTime: 'xx', EndTime: 'xx' },
    { id: 3, module: 'History', StartTime: 'xx', EndTime: 'xx' },
    { id: 4, module: 'Computer Science', StartTime: 'xx', EndTime: 'xx' },
    { id: 2, module: 'Physics', StartTime: 'xx', EndTime: 'xx' },
    { id: 3, module: 'History', StartTime: 'xx', EndTime: 'xx' },
    { id: 4, module: 'Computer Science', StartTime: 'xx', EndTime: 'xx' },
  ];
  const navigate = useNavigate();
  
  return (

    <div className='container' id='Programme'> {/* 整个页面的容器 */}
      <div className='leftbox'> {/* 左侧边栏容器 */}
        <LeftBar tabNav="Programme" /> {/* 引入左侧边栏组件 */}
      </div>
      <div className='maincenter'>{/* 页面主要内容区域 */}
        <div className='topline'>{/* 顶部信息区域 */}
          <div className='topMain'>
            <h2 className='gFont'>Programme Name</h2>
            <p>description:Programme Introduce</p>
          </div>
        </div>
        <div className='mainList'>{/* 主要内容列表区域 */}
          <h2 className='gFont'>Module List</h2>
          <TableContainer component={Paper} className='tablebox'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Module</TableCell>
                  <TableCell align="right">StartTime</TableCell>
                  <TableCell align="right">EndTime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* 循环遍历学生模块列表数据，并渲染到表格中 */}
                {studentModules.map((module, i) => ( 
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {module.module}
                    </TableCell>
                    <TableCell align="center">{module.StartTime}</TableCell>
                    <TableCell align="center">{module.EndTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* 底部按钮区域 */}
        <div className='fn-clear tr btnline'>
          <Button size="small" onClick={() => {
            navigate('/Modules') // 点击按钮时跳转到Modules页面
          }} variant="contained" color="primary">See My Modules</Button>
          &nbsp;<Button size="small" onClick={() => {
            navigate('/MyPrograme') // 点击按钮时跳转到MyPrograme页面
          }}variant="contained" color="primary">Programme History</Button>
        </div>
      </div>
    </div>
  );
}
export default Programme;
