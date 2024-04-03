
import React, {useState, useEffect, Fragment, useRef, createRef} from 'react';
import LeftBar from './../../component/leftbar/leftbar'
import {
  useNavigate
} from 'react-router-dom';
import './Modules.css'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,IconButton,Collapse,Box} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
function Modules () {

  // 模拟的学生模块列表数据
  const [list, setlist] = useState([
    { id: 1, module: 'Mathematics', credits: 10, grade: 'A', open: false },
    { id: 2, module: 'Physics', credits: 20, grade: 'B', open: false },
    { id: 3, module: 'History', credits: 10, grade: 'C', open: false },
    { id: 4, module: 'Computer Science', credits: 20, grade: 'A', open: false },
    { id: 5, module: 'Computer Science', credits: 20, grade: 'A', open: false },
    { id: 6, module: 'Computer Science', credits: 20, grade: 'A', open: false },
    { id: 7, module: 'Computer Science', credits: 20, grade: 'A', open: false },
    { id: 8, module: 'Computer Science', credits: 20, grade: 'A', open: false },
    { id: 9, module: 'Computer Science', credits: 20, grade: 'A', open: false },
    { id: 10, module: 'Computer Science', credits: 20, grade: 'A', open: false },


  ])
  const navigate = useNavigate();//获取用于页面导航的navigate函数
  const refsdata = useRef([]);// 创建一个ref数组，用于存储每个表格行的ref

  useEffect(() => {
    // 为每一个 list 项创建一个 ref
    refsdata.current = list.map((_, i) => refsdata.current[i] ?? createRef());
  }, [list]); // 当 list 发生变化时重新创建 refs
  const tableBoxRef = useRef(null);// 创建一个ref，用于存储表格容器的引用
  const handleButtonClick = (index) => {
    // 更新特定项的 open 状态为 true
    const updatedList = list.map((item, idx) =>
        idx === index ? { ...item, open: !item.open } : item
    );
    setlist(updatedList);
    navigate(`/Modules#line${index}`);// 页面滚动到指定行（但是没有实现！！！）

    setTimeout(() => {
      // 访问 ref
      const rowElement = refsdata.current[index];
      if (rowElement && rowElement.current) {
        tableBoxRef.current.scrollTo({
          top: rowElement.current.offsetTop,
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
              {/* 遍历模块列表 */}
              {list.map((ele, i) => {
                return (
                    <Button
                        key={i}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => { handleButtonClick(i) }}// 点击按钮时，更新特定项的 open 状态为 true（handleButtonClick函数）
                    >
                      ID:{ele.id} {/* 按钮显示模块ID */}
                    </Button>
                );
              })}
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
                  <TableCell align="center">Grade</TableCell>
                  <TableCell align="center">opration</TableCell>{/* 空单元格用于放置按钮列 */}
                  <TableCell align="center">
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* 遍历模块列表 */}
                {list.map((item, i) => (
                  <Fragment key={i}>
                    <TableRow id={`line${i}`}>
                      <TableCell component="th" scope="row" ref={refsdata[i]}>
                        {item.module}
                      </TableCell>
                      <TableCell align="center">{item.credits}</TableCell>
                      <TableCell align="center">{item.grade}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="expand row" size="small" onClick={() => {
                          let showlist = list;
                          showlist[i].open = !showlist[i].open;
                          setlist([...showlist])
                        }}>
                          {item.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{/* 根据open状态显示向上或向下箭头图标 */}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Collapse in={item.open} timeout="auto" unmountOnExit>{/* 根据open状态显示或隐藏嵌套表格 */}
                          <Box margin={1}>
                            {/* 嵌套的表格 */}
                            <TableContainer component={Paper} className='tablebox'>
                              <Table aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>名称</TableCell>
                                    <TableCell align="center">开始时间</TableCell>
                                    <TableCell align="center">结束时间</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow >
                                    <TableCell component="th" scope="row">
                                      111
                                    </TableCell>
                                    <TableCell align="center">111</TableCell>
                                    <TableCell align="center">111</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
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
