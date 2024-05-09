/**
 * Component Name: Leftbar
 * Description: A  left sidebar navigation component that provides links to various sections of the application, such as Programme, Modules, CourseWork, etc.
 * Author: Yu Han
 * Created Date: 2024-04-11
 */

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

function LeftBar(props) {// Define a component named LeftBar, taking props as parameter
  const [selectedIndex, setSelectedIndex] = useState(props.tabNav);// Define a state named selectedIndex, initial value is props.tabNav
  const [isExpanded, setExpanded] = useState(true);// Define a state named isExpanded, initial value is true, to control the expansion and collapse of the left navigation bar

  const CustomLink = React.forwardRef((props, ref) => {// Define a CustomLink component using React.forwardRef to forward refs
    return <Link ref={ref} {...props} />;// Return a Link component, passing ref and props
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
          <img className='logo' src={logo} alt="logo" />{/* Display logo image */}
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
          <i className='iconfont icon-tianjiajihua'></i>{/* Navigate to Programme */}
          Programme
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'Modules' ? 'sure' : ''} to="/Modules" >
          <i className='iconfont icon-mokuai'></i>{/* Navigate to Modules */}
          Modules
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'CourseWork' ? 'sure' : ''} to="/CourseWork" >
          <i className='iconfont icon-zuoye'></i>{/* Navigate to CourseWork */}
          Coursework
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'Exam' ? 'sure' : ''} to="/Exam">
          <i className='iconfont icon-kaoshi'></i>{/* Navigate to Exam */}
          Exam
        </ListItem>
        <Divider />
       <ListItem button component={CustomLink} className={selectedIndex === 'MyTimetable' || selectedIndex === '' ? 'sure' : ''} to="/MyTimetable">
              <i className='iconfont icon-queqin'></i>{/* Navigate to MyTimetable */}
              My Timetable
          </ListItem>
        <ListItem button component={CustomLink} className={selectedIndex === 'MyTutor' ? 'sure' : ''} to="/MyTutor">
          <i className='iconfont icon-daoshi'></i>{/* Navigate to MyTutor */}
          My Tutor
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'AcademicHistory' ? 'sure' : ''} to="/AcademicHistory">
          <i className='iconfont icon-project-o'></i>{/* Navigate to AcademicHistory */}
          Academic History
        </ListItem>
      </List>
    </div>
  );
}

export default LeftBar;
