/**
 * Component Name: Absence
 * Description: Students submit the start time, end time and reason for their  absence and view the history of  absence records
 * Author: Yu Han
 * Created Date: 2024-04-28
 */

import React, { useState, useEffect } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Grid } from '@material-ui/core';
import './absence.css';
import axios from 'axios';
import { absenceRecord, uploadAbsence } from '../../api/api';
import { DatePicker, Input, Table } from 'antd';
import { ContactlessTwoTone } from '@material-ui/icons';

const { TextArea } = Input;

const Absence = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [tableData, setTableData] = useState([]);
  const [studentId, setStudentId] = useState(null);

   // useEffect to fetch data on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));// Retrieve user data from localStorage
    if (!user || !user.studentId) {
      console.error('No student ID found');
      return;
    }
    setStudentId(user.studentId); // Set student ID


    // Define async function to fetch absence data
        const fetchAbsenceData = async () => {
      try {
        const response = await axios.get(absenceRecord, { params: { studentId: user.studentId } });
        if (response.data.code === 200 && response.data.message === 'SUCCESS') {
          setTableData(response.data.obj); // Set table data if successful
        } else {
          console.error('Failed to fetch absence data:', response.data.message);
          setTableData([]);
        }
      } catch (error) {
        setTableData([]);
      }
    };
  
    fetchAbsenceData();// Call the fetch data function
  }, []); 
  
  // Handle date change
  const timeChange = (date, dateString) => {
    setStartTime(dateString);
  };

  const endTimeChange = (date, dateString) => {
    setEndTime(dateString);
  };

  const textAreaChange = (event) => {
    setReason(event.target.value);// Handle changes to the text area and set the reason for absence
  };

  // Handle form submission
  const submitForm = () => {
    console.log(studentId)
    if (!studentId) {
      alert('Student ID is missing. Please login again.');
     
      return;
    }

    const params = {// Define parameters for submission
      studentId: studentId,
      startTime: startTime,
      endTime: endTime,
      reason: reason,
    };
    
    // Submit data using the uploadAbsence API endpoint
    axios.post(`${uploadAbsence}?studentId=${encodeURIComponent(studentId)}`, { startTime, endTime, reason })
      .then(res => {

        alert('Absence submitted successfully!');
        window.location.reload();// Reload the page
      })
      .catch(err => {
        console.error(err);
        alert('Failed to submit absence. Please try again!');
      });
  };

  // Define status object
  const statusObj = {
    0: "not decided",
    1: "approved",
    2: "not approved"
  };

  // Define table columns configuration
  const columns = [
    {
      title: 'Start Time',// Column title
      dataIndex: 'startTime',// Data index for column
      key: 'startTime',// Key for the column
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => statusObj[text],
    },
  ];

  // Render component content
  return (
    <div className='container' id='absence'>
      <div className='leftbox'>
        <LeftBar tabNav="Absence" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
            <h2 className='gFont'>My Tutor</h2>{/* Top title*/}
            <div className='fn-clear'></div>
          </div>
        </div>
        <div className='centerbox'>
          <div className='btn-group'>
            <div className='leftbox'>
              <h2 className='gFont'>Create a absence request</h2>{/* Prompt to create an absence request*/}
            </div>
          </div>
        </div>
        <div className='date_form'>
        
          <Grid container justifyContent="space-between">
            <div className='data_item'>
              <div className='data_title'>First date of absence</div>
              <DatePicker
                defaultValue={startTime}
                onChange={timeChange}
                format={dateFormat}
              />                                   {/* Date picker for start date*/}
            </div>
            <div className='data_item'>
              <div className='data_title'>Lasted date of absence</div>
              <DatePicker
                defaultValue={endTime}
                onChange={endTimeChange}
                format={dateFormat}
              />                                  {/* Date picker for end date*/}
            </div>
          </Grid>
          <div className='desc'>
            Please provide BRlEF details of your absence 
          </div>
          <TextArea
            style={{ marginTop: "1rem" }}
            placeholder="Enter your reason for absence here"
            autoSize={{ minRows: 2, maxRows: 8 }}
            name={"background"}
            maxLength={300}
            onChange={textAreaChange}
            defaultValue={reason}
          />                                     {/* Text area for entering the reason for absence*/}
          <Button
            className="button"
            type="warning"
            variant="contained"
            onClick={submitForm}
          >
            Submit
          </Button>                               {/* Submit button*/}
          <Table columns={columns} dataSource={tableData} />{/* Table to display data*/}
        </div>
      </div>
    </div>
  );
};

export default Absence;
