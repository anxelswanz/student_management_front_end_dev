import React, { useState, useEffect } from 'react';
import './mytutor.css';
import Grid from '@material-ui/core/Grid';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { tutorInfo} from '../../api/api';
import { useNavigate } from 'react-router-dom';



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
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [studentId, setStudentId] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user ? user.studentId : null;

    if (!studentId) {
      console.error('No student ID found');
      return;
    }
    const fetchTutorInfo = () => {
      axios.get(tutorInfo, { params: { studentId : studentId } })
        .then(response => {
          if (response.data.code === 200 && response.data.obj && response.data.obj.length > 0) {
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
  // 跳转到goToAbsence页面
  const goToAbsence = () =>{
    navigate("/Absence")
  };

  function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images[index] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../assets/staff', false, /\.(png|jpe?g|svg)$/));
    // 根据 staffId 后两位确定要显示的图片
    const getAvatarImage = (staffId) => {
      const lastTwoDigits = staffId.slice(-2);
      const index = parseInt(lastTwoDigits, 10);
      if (index >= 1 && index <= images.length) {
        return images[index - 1];
      } else {
        return `https://picsum.photos/400/200?random`;
      }
    };



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
            <Grid item xs={5}>
            <img className="left_img" src={selectedTutor ? getAvatarImage(selectedTutor.staffId) : `https://picsum.photos/400/200?random`} alt="" />
            </Grid>
            <Grid item xs={5}>
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
              <Button 
                  size="small" 
                  variant="contained" 
                  color="warning"
                  onClick={goToAbsence}
                >
                 Absence
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default MyTutor;
