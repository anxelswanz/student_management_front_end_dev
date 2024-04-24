import React, { useState, useEffect } from 'react';
import './mytutor.css';
import Grid from '@material-ui/core/Grid';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { tutorInfo} from '../../api/api';

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
  const classes = useStyles();
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    const fetchTutorInfo = () => {
      axios.get(tutorInfo)
        .then(response => {
          if (response.data.code === 200 && response.data.obj && response.data.obj.length > 0) {
            // 假设只获取第一个导师信息
            setSelectedTutor(response.data.obj[0]);
          } else {
            console.error('无导师信息数据或数据格式错误');
          }
        })
        .catch(error => {
          console.error('获取导师信息失败:', error);
        });
    };

    // 调用获取导师信息数据的函数
    fetchTutorInfo();
  }, []);

  return (
    <div className='container' id='mytutor'>
      <div className='leftbox'>
        <LeftBar tabNav="MyTutor" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
            <h2 className='gFont'>My Tutor</h2>
            <br />
          </div>
          <br />
        </div>
        <div className='mainList'>
          <Grid container spacing={3} className='topline'>
            <Grid item xs={3}>
              <img src={`https://picsum.photos/400/200?random`} alt="" /> {/* 使用随机图片 */}
            </Grid>
            <Grid item xs={7}>
              {/* 显示选中导师的信息 */}
              <p>Name: {selectedTutor?.firstName} {selectedTutor?.surname}</p>
              <p>Email: {selectedTutor?.email}</p>
              <Typography>{selectedTutor?.background}</Typography> {/* 显示导师背景信息 */}
            </Grid>
            <Grid item xs={2}>
              {/* 显示联系导师的按钮 */}
              <Button 
                  size="small" 
                  onClick={() => {
                    window.location.href = `mailto:${selectedTutor?.email}`;
                  }} 
                  variant="contained" 
                  color="secondary"
                  title="通过电子邮件联系导师" // 添加悬停提示
                >
                 Bookings
              </Button>
            </Grid>
          </Grid>
        </div>
        {/* 下方内容区域，包含展开面板显示背景信息 */}
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
                {selectedTutor?.background}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default MyTutor;
