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
import timetableIcon from '../../assets/timetable.png';
import academicIcon from '../../assets/ac.png';
import studentIcon from '../../assets/student.png';
import absenceIcon from '../../assets/absence.png';
import courseworkIcon from '../../assets/coursework.png';
import examIcon from '../../assets/exam.png';
import managementIcon from '../../assets/management.png';
import workIcon from '../../assets/work.png';

function LeftBar(props) {
  const [selectedIndex, setSelectedIndex] = useState(props.tabNav);
  const [isExpanded, setExpanded] = useState(true);  // State to toggle sidebar visibility

  const CustomLink = React.forwardRef((props, ref) => {
    return <Link ref={ref} {...props} />;
  });

  useEffect(() => {
    console.log(props.tabNav);
    setSelectedIndex(props.tabNav);
  }, [props.tabNav]);

  

  return (
    <div id='leftbar' className={isExpanded ? 'expanded' : 'collapsed'}>
      <button className="toggle-button" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? '<' : '>'}  {/* Change icon based on state */}
      </button>

      <Card variant="outlined" className={isExpanded ? 'topbox' : 'topbox hidden'}>
        <CardContent>
          <img className='logo' src={logo} alt="logo" />
          {isExpanded && (
            <>
              <Typography className='details' gutterBottom>Staff Name:xxx</Typography>
              <Typography className='details' gutterBottom>Staff ID:xxx</Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Divider />
      <List className={isExpanded ? 'navbox' : 'navbox collapsed'}>
        <ListItem button component={CustomLink} className={selectedIndex === 'AllTimetable' || selectedIndex === '' ? 'sure' : ''} to="/AllTimetable">
          <img className='icon' src={timetableIcon} alt="logo" />
          All Timetable
        </ListItem>
        <Divider />
          <ListItem button component={CustomLink} className={selectedIndex === '/StaffMyTimetable' || selectedIndex === '' ? 'sure' : ''} to="/StaffMyTimetable">
              <img className='icon' src={timetableIcon} alt="logo" />
              My Timetable
          </ListItem>
          <Divider />
          <ListItem button component={CustomLink} className={selectedIndex === 'StudentAcademicHistory' || selectedIndex === '' ? 'sure' : ''} to="/StudentAcademicHistory">
              <img className='icon' src={academicIcon} alt="logo" />
              Student Academic History
          </ListItem>
          <Divider />
          <ListItem button component={CustomLink} className={selectedIndex === 'AssignStudent' || selectedIndex === '' ? 'sure' : ''} to="/AssignStudent">
              <img className='icon' src={studentIcon} alt="logo" />
              Assign Student
          </ListItem>
          <Divider />
          <ListItem button component={CustomLink} className={selectedIndex === 'StaffCoursework' || selectedIndex === '' ? 'sure' : ''} to="/StaffCoursework">
              <img className='icon' src={courseworkIcon} alt="logo" />
                Coursework
          </ListItem>
          <Divider />
            <ListItem button component={CustomLink} className={selectedIndex === 'StaffExam' || selectedIndex === '' ? 'sure' : ''} to="/StaffExam">
                <img className='icon' src={examIcon} alt="logo" />
                Exam
            </ListItem>
            <Divider />
            <ListItem button component={CustomLink} className={selectedIndex === 'AbsenceHistory' || selectedIndex === '' ? 'sure' : ''} to="/AbsenceHistory">
                <img className='icon' src={absenceIcon} alt="logo" />
                Absence History
            </ListItem>
            <Divider />
            <ListItem button component={CustomLink} className={selectedIndex === 'AllWork' || selectedIndex === '' ? 'sure' : ''} to="/AllWork">
                <img className='icon' src={workIcon} alt="logo" />
                All Work
            </ListItem>
            <Divider />
            <ListItem button component={CustomLink} className={selectedIndex === 'Management' || selectedIndex === '' ? 'sure' : ''} to="/Management">
                <img className='icon
                ' src={managementIcon} alt="logo" />
                Management
            </ListItem>
            <Divider />
      </List>
    </div>
  );
}

export default LeftBar;
