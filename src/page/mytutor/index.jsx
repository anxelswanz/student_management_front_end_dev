/**
 * Component Name: My Tutor
 * Description: Students can view the tutor's information, as well as click on the button to email the tutor and go to the ABSENCE page.
 * Author: Yu Han
 * Created Date: 2024-04-26
 */

import React, { useState, useEffect } from 'react';
import './mytutor.css';
import Grid from '@material-ui/core/Grid';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { tutorInfo} from '../../api/api';
import { useNavigate } from 'react-router-dom';

// Define styles
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
  const navigate = useNavigate();// Initializing the navigate function for navigation
  const classes = useStyles();// Using custom styles
  const [selectedTutor, setSelectedTutor] = useState(null);// Initializing the selected tutor state
  const [studentId, setStudentId] = useState(null);// Initializing the student ID state

  // Executed once when the component is loaded
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));// Getting user information from localStorage
    const studentId = user ? user.studentId : null;

    if (!studentId) {
      console.error('No student ID found');
      return;
    }

    // GET  tutor information, passing the student ID as a parameter
    const fetchTutorInfo = () => {
      axios.get(tutorInfo, { params: { studentId : studentId } })
        .then(response => {
          if (response.data.code === 200 && response.data.obj && response.data.obj.length > 0) {
            setSelectedTutor(response.data.obj[0]);// If the request is successful and the returned data is valid, set the selected tutor information
          } else {
            console.error('No tutor information data or data format error');
          }
        })
        .catch(error => {
          console.error('Failed to get tutor information:', error);
        });
    };

    // Call the function to fetch tutor information data
    fetchTutorInfo();
  }, []);


// Function to navigate to the Absence page
  const goToAbsence = () =>{
    navigate("/Absence")
  };

  // Function to dynamically import all image
  function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images[index] = r(item); });
    return images;
  }
  
  // Dynamically import images using require.context
  const images = importAll(require.context('../../assets/staff', false, /\.(png|jpe?g|svg)$/));
    // Determine which image to display based on the last two digits of the staff ID
    const getAvatarImage = (staffId) => {
      const lastTwoDigits = staffId.slice(-2);
      const index = parseInt(lastTwoDigits, 10);
      if (index >= 1 && index <= images.length) {
        return images[index - 1];
      } else {
        return `https://picsum.photos/400/200?random`;// Return a random image link if the index is invalid
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
            <h2 className='gFont'>My Tutor</h2>{/* Render the title */}
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
               {/* Display the selected tutor's information */}
              <p>Name: {selectedTutor?.firstName} {selectedTutor?.surname}</p>
              <p>Email: {selectedTutor?.email}</p>
              <Typography>{selectedTutor?.background}</Typography> {/* Display the tutor's background information */}
            </Grid>
            <Grid item xs={2}>
              {/* Display buttons to contact the tutor */}
              <Button 
                  size="small" 
                  onClick={() => {
                    window.location.href = `mailto:${selectedTutor?.email}`;
                  }} 
                  variant="contained" 
                  color="secondary"
                  title="Contact tutor via email" // Add hover tooltip
                >
                 Bookings
              </Button>
              <Button 
                  size="small" 
                  variant="contained" 
                  color="warning"
                  onClick={goToAbsence}// Redirect to the Absence page when clicked
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
