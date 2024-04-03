import React, { useState } from 'react';
import './mytutor.css';
import Grid from '@material-ui/core/Grid';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//定义样式
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function MyTutor() {
  const classes = useStyles();//使用样式
  const [selectedId, setSelectedId] = useState(0);//使用useState跟踪当前选中的导师索引
// 模拟导师信息数据
  const tutors = Array.from({ length: 10 }, (_, index) => ({
    name: `John Doe ${index + 1}`,
    email: `email${index + 1}@example.com`,
    mobile: `123-456-78${90 + index}`,
    website: `www.personalwebsite${index + 1}.com`,
    background: `xxxxxxxxxxxxxxxxxxxxBackground content for ${index + 1}`,
    research: `xxxxxxxxxxxxxxxxxxxxxxxResearch content for ${index + 1}`,
    teaching: `xxxxxxxxxxxxxxxxxxxxxxxxTeaching content for ${index + 1}`,
  }));

  return (
      <div className='container' id='mytutor'>
        <div className='leftbox'>
          <LeftBar tabNav="MyTutor" />
        </div>
        <div className='maincenter'>
          <div className='topline'>
            <div className='topMain'>
              <h2 className='gFont'>Module</h2>
              <br />
              <div className='fn-clear'>
                {/* 渲染导师选择按钮 */}
                {tutors.map((_, index) => (
                    <Button key={index} size="small" variant="contained" color="primary" onClick={() => setSelectedId(index)}>
                      ID:{index + 1}
                    </Button>
                ))}
              </div>
            </div>
            <br />
          </div>
          <div className='mainList'>
            <Grid container spacing={3} className='topline'>
              <Grid item xs={3}>
                <img src={`https://picsum.photos/400/200?random=${selectedId}`} alt="" />
              </Grid>
              <Grid item xs={7}>
                {/* 显示选中导师的信息 */}
                <p>name: {tutors[selectedId].name}</p>
                <p>Email: {tutors[selectedId].email}</p>
                <p>mobile: {tutors[selectedId].mobile}</p>
                <p>website: {tutors[selectedId].website}</p>
              </Grid>
              <Grid item xs={2}>
                {/* 显示联系导师的按钮 */}
                <Button size="small" onClick={() => {
                  window.location.href = `mailto:${tutors[selectedId].email}`;
                }} variant="contained" color="secondary">Contact</Button>
              </Grid>
            </Grid>
          </div>
           {/* 下方内容区域，包含展开面板显示背景、研究和教学内容 */}
          <div className="downList">
            <Accordion>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                 {/* 展开面板标题 */}
                <Typography className={classes.heading}>Background</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  {/* 展开面板内容 */}
                <Typography>
                  {tutors[selectedId].background}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
              >
                <Typography className={classes.heading}>Research</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* 展开面板内容 */}
                <Typography>
                  {tutors[selectedId].research}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
              >
                <Typography className={classes.heading}>Teaching</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* 展开面板内容 */}
                <Typography>
                  {tutors[selectedId].teaching}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
  );
}

export default MyTutor;

