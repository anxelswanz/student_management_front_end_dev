/**
 * Component Name: AssignStudent
 * Description: This component allows admin to assign sequential student numbers to teachers.
 * Author: Yuhui Xiao
 * Created Date: 2024-04-25
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './../../../component/staffLeftbar/leftbar';
import {
    TableCell,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    TextField,
    DialogActions,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    InputLabel
} from '@material-ui/core';
import axios from 'axios';
import './assignstudent.css';
import '../header.css';
// Component for assigning students to tutors
function AssignStudent() {
    // State variables
    const [assignStudentsInfo, setAssignStudentsInfo] = useState([]);
    const [toAssignTutors, setToAssignTutors] = useState([]);
    const [studentNumber, setStudentNumber] = useState({
        'firstStudentId': 1,
        'lastStudentId': 15
    });
    const [staffId, setstaffId] = useState(0);

    const defaultAssignTutors = [
        { id: 1, name: 'Tutor1' },
        { id: 2, name: 'Tutor2' },
        { id: 3, name: 'Tutor3' },
        { id: 4, name: 'Tutor4' },
    ];

    // Function to initialize data
    function init() {
        axios.get('http://localhost:8080/staff/getTutorsAssignStudents')
            .then((response) => {
                setAssignStudentsInfo(response.data);
            });
        axios.get('http://localhost:8080/staff/toAssignTutors')
            .then((response) => {
                setToAssignTutors(response.data);
            });
        axios.get('http://localhost:8080/staff/getAvailableStudentIds')
            .then((response) => {
                setStudentNumber(
                    {
                        'firstStudentId': response.data.firstStudentId,
                        'lastStudentId': response.data.lastStudentId
                    }
                );
            });

        setToAssignTutors(defaultAssignTutors);
    }

    useEffect(() => {
        init()
    }, []);

    // Generate options for the select input
    const options = toAssignTutors.map((tutor, index) => (
        <MenuItem key={index} value={tutor.id}>{tutor.name}</MenuItem>
    ));

    // Function to handle assigning students to tutors
    const handleAssign = (firstStudentId, lastStudentId, staffId) => {
        axios.post('http://localhost:8080/saveTutorAndStudent', {
            firstStudentId: firstStudentId,
            lastStudentId: lastStudentId,
            staffId: staffId,
            staffName: defaultAssignTutors.find(tutor => tutor.id === staffId).name
        }).then((response) => {
            setAssignStudentsInfo(response.data);
        });

        init()
    }

    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="AssignStudent" />
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        <h2 className='gFont'>Assign Student</h2>
                        <p className="description">You can assign sequential student numbers to teachers</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-top'>
                        <div className='content-1'>Select Tutor:</div>
                        <Select value={staffId} onChange={(e) => setstaffId(e.target.value)}>
                            {options}
                        </Select>
                        <div className='content-number'>
                            <div className='content-number'>
                                <TextField value={studentNumber.firstStudentId} disabled={true} onChange={(e) => setStudentNumber(e.target.value)} />
                            </div>
                            <div className='content-number'>-</div>
                            <div className='content-number'>
                                <TextField value={studentNumber.lastStudentId} disabled={true} onChange={(e) => setStudentNumber(e.target.value)} />
                            </div>
                        </div>
                        <Button variant="contained" color="primary" onClick={() => handleAssign(studentNumber.firstStudentId, studentNumber.lastStudentId, staffId)}>Assign</Button>
                    </div>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tutor ID</TableCell>
                                    <TableCell>Student Number Interval</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignStudentsInfo.map((assignStudent, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{assignStudent.staffName}</TableCell>
                                        <TableCell>{assignStudent.firstStudentId} - {assignStudent.lastStudentId}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default AssignStudent;