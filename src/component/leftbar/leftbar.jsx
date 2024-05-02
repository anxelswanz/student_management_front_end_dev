import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './leftbar.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import logo from '../../assets//logo.png';

function LeftBar(props) {
  const [selectedIndex, setSelectedIndex] = useState(props.tabNav);
  const [isExpanded, setExpanded] = useState(true);

  const CustomLink = React.forwardRef((props, ref) => {
    return <Link ref={ref} {...props} />;
  });

  useEffect(() => {
    console.log(props.tabNav);
    setSelectedIndex(props.tabNav);
  }, [props.tabNav]);

  // User login information
  const [user] = useState(JSON.parse(localStorage.user || "{}") || {});

  return (
    <div id='leftbar' className={isExpanded ? 'expanded' : 'collapsed'}>
      <button className="toggle-button" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? '<' : '>'}  
      </button>

      <Card variant="outlined" className={isExpanded ? 'topbox' : 'topbox hidden'}>
        <CardContent>
          <img className='logo' src={logo} alt="logo" />
          {isExpanded && (
            <>
              <Typography className='details' gutterBottom>Student Name:{user?.firstName} {user?.surname}</Typography>
              <Typography className='details' gutterBottom>Student ID:{ user?.studentId }</Typography>
              <Typography className='details'>Year:{ user?.studentYear }</Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Divider />
      <List className={isExpanded ? 'navbox' : 'navbox collapsed'}>
        <ListItem button component={CustomLink} className={selectedIndex === 'Programme' || selectedIndex === '' ? 'sure' : ''} to="/Programme">
          <i className='iconfont icon-tianjiajihua'></i>
          Programme
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'Modules' ? 'sure' : ''} to="/Modules" >
          <i className='iconfont icon-mokuai'></i>
          Modules
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'CourseWork' ? 'sure' : ''} to="/CourseWork" >
          <i className='iconfont icon-zuoye'></i>
          Coursework
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'Exam' ? 'sure' : ''} to="/Exam">
          <i className='iconfont icon-kaoshi'></i>
          Exam
        </ListItem>
        <Divider />
       <ListItem button component={CustomLink} className={selectedIndex === 'MyTimetable' || selectedIndex === '' ? 'sure' : ''} to="/MyTimetable">
              <i className='iconfont icon-queqin'></i>
              My Timetable
          </ListItem>
        <ListItem button component={CustomLink} className={selectedIndex === 'MyTutor' ? 'sure' : ''} to="/MyTutor">
          <i className='iconfont icon-daoshi'></i>
          My Tutor
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'AcademicHistory' ? 'sure' : ''} to="/AcademicHistory">
          <i className='iconfont icon-project-o'></i>
          Academic History
        </ListItem>
      </List>
    </div>
  );
}

export default LeftBar;
