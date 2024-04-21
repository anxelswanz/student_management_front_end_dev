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
              <Typography className='details' gutterBottom>Student Name:xxx</Typography>
              <Typography className='details' gutterBottom>Student ID:xxx</Typography>
              <Typography className='details'>Year:xxx</Typography>
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
          Course work
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'Exam' ? 'sure' : ''} to="/Exam">
          <i className='iconfont icon-kaoshi'></i>
          Exam
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'Absence' ? 'sure' : ''} to="/Absence">
          <i className='iconfont icon-queqin'></i>
          Absence
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'MyTutor' ? 'sure' : ''} to="/MyTutor">
          <i className='iconfont icon-daoshi'></i>
          My Tutor
        </ListItem>
        <Divider />
        <ListItem button component={CustomLink} className={selectedIndex === 'MyPrograme' ? 'sure' : ''} to="/MyPrograme">
          <i className='iconfont icon-project-o'></i>
          My Programe
        </ListItem>
      </List>
    </div>
  );
}

export default LeftBar;
