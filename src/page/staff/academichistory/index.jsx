/**
 * Component Name: StudentAcademicHistory
 * Description: Staff can view all relevant student information here
 * Author: Yuhui Xiao
 * Created Date: 2024-04-15
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
    TextField
} from '@material-ui/core';
import axios from 'axios';
import './StudentAcademicHistory.css';
import '../header.css';

// Define the functional component for Student Academic History
function StudentAcademicHistory() {
    // State to hold student data
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch student data from API
        axios.get('http://localhost:8080/getAllStudents',{
            params: {
                staffType: localStorage.getItem('user').staffType
            }
        })
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    })
 // Default student data
    const defaultStudents = [
        {id: 1, studentId: 'S10001', studentName: 'John Doe', year: 'year1', programmeName: 'Computer Science'},
        {id: 2, studentId: 'S10002', studentName: 'Jane Doe', year: 'year2', programmeName: 'Computer Science'},
        {id: 3, studentId: 'S10003', studentName: 'Alice Doe', year: 'year3', programmeName: 'Computer Science'},
        {id: 4, studentId: 'S10004', studentName: 'Bob Doe', year: 'year4', programmeName: 'Computer Science'},
        {id: 5, studentId: 'S10005', studentName: 'Eve Doe', year: 'year1', programmeName: 'Computer Science'},
    ];


    return (
    <div className='container' id='Header'>
        <div className='leftbox'>
            <LeftBar tabNav="StudentAcademicHistory" />
        </div>
        <div className='maincenter'>
            <div className='topline'>
                <div className='topMain'>
                    {/* Renderer name and description */}
                    <h2 className='gFont'>Student Academic History</h2>
                    <p className="description">You can view all relevant student information here, click on the row, you will see all academic history of this student</p>
                </div>
            </div>

            <div className='content'>
                <div className='content-top'>
                    <TextField label="Search" variant="outlined" size="small"/>
                    <Button variant="contained" className="searchButton">Search</Button>
                </div>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Student ID</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Programme Name</TableCell>
                                <TableCell>Year</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {defaultStudents.map(student => (
                                <TableRow hover key={student.id} onClick={() => navigate(`/StudentAcademicHistory/${student.id}`)}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{student.studentName}</TableCell>
                                    <TableCell>{student.programmeName}</TableCell>
                                    <TableCell>{student.year}</TableCell>
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
// Export the component
export default StudentAcademicHistory;
