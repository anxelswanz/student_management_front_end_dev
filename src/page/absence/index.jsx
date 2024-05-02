import React, { useState, useEffect } from 'react';
import LeftBar from '../../component/leftbar/leftbar';
import { Button, Grid } from '@material-ui/core';
import './absence.css';
import axios from 'axios';
import { absenceRecord, uploadAbsence } from '../../api/api'; // 导入 uploadAbsence
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.studentId) {
      console.error('No student ID found');
      return;
    }
    setStudentId(user.studentId); 
    const fetchAbsenceData = async () => {
      try {
        const response = await axios.get(absenceRecord, { params: { studentId: user.studentId } });
        if (response.data.code === 200 && response.data.message === 'SUCCESS') {
          setTableData(response.data.obj); 
        } else {
          console.error('Failed to fetch absence data:', response.data.message);
          setTableData([]);
        }
      } catch (error) {
        setTableData([]);
      }
    };
  
    fetchAbsenceData();
  }, []); 
  

  const timeChange = (date, dateString) => {
    setStartTime(dateString);
  };

  const endTimeChange = (date, dateString) => {
    setEndTime(dateString);
  };

  const textAreaChange = (event) => {
    setReason(event.target.value);
  };

  const submitForm = () => {
    console.log(studentId)
    if (!studentId) {
      alert('Student ID is missing. Please login again.');
     
      return;
    }

    const params = {
      studentId: studentId,
      startTime: startTime,
      endTime: endTime,
      reason: reason,
    };
    
    // 使用 uploadAbsence 接口提交数据
    axios.post(`${uploadAbsence}?studentId=${encodeURIComponent(studentId)}`, { startTime, endTime, reason })
      .then(res => {

        alert('Absence submitted successfully!');
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('Failed to submit absence. Please try again!');
      });
  };

  const statusObj = {
    0: "not decided",
    1: "approved",
    2: "not approved"
  };

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
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

  return (
    <div className='container' id='absence'>
      <div className='leftbox'>
        <LeftBar tabNav="Absence" />
      </div>
      <div className='maincenter'>
        <div className='topline'>
          <div className='topMain'>
            <h2 className='gFont'>My Tutor</h2>
            <div className='fn-clear'></div>
          </div>
        </div>
        <div className='centerbox'>
          <div className='btn-group'>
            <div className='leftbox'>
              <h2 className='gFont'>Create a absence request</h2>
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
              />
            </div>
            <div className='data_item'>
              <div className='data_title'>Lasted date of absence</div>
              <DatePicker
                defaultValue={endTime}
                onChange={endTimeChange}
                format={dateFormat}
              />
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
          />
          <Button
            className="button"
            type="warning"
            variant="contained"
            onClick={submitForm}
          >
            Submit
          </Button>
          {/* 表格 */}
          <Table columns={columns} dataSource={tableData} />


        </div>
      </div>
    </div>
  );
};

export default Absence;
