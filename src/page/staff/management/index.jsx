/**
 * Component Name: AdminManagement
 * Description: AdminManagement component is used to look all the student and the teacher information
 * Author: Yuhui Xiao
 * Created Date: 2024-04-28
 */

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
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
import './management.css';
import '../header.css';

// StudentTable component displays a table of student information
const StudentTable = ({students})=> {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Programme Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map(student => (
                        <TableRow hover key={student.id}>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.type}</TableCell>
                            <TableCell>{student.studentName}</TableCell>
                            <TableCell>{student.programmeName}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// TeacherTable component displays a table of teacher information
const TeacherTable = ({teachers})=> {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Teacher ID</TableCell>
                        <TableCell>Teacher Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Background</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachers.map(teacher => (
                        <TableRow hover key={teacher.id}>
                            <TableCell>{teacher.id}</TableCell>
                            <TableCell>{teacher.teacherId}</TableCell>
                            <TableCell>{teacher.teacherName}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.background}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

function AdminManagement() {
    const defaultStudents = [
        {
            id: 1,
            studentId: 'S10001',
            type: 'Undegraduate',
            studentName: 'John Doe',
            year: 'year1',
            programmeName: 'Computer Science',
            email: '123@edu.cn'
        },
        {
            id: 2,
            studentId: 'S10002',
            type: 'Postgraduate',
            studentName: 'Jane Doe',
            year: 'year2',
            programmeName: 'Computer Science',
            email: '234@edu.cn'
        },
    ];

    const defaultTeachers = [
        {id: 1, teacherId: 'T10001', teacherName: 'John Doe', email: '213@edu.cn', background: 'Computer Science'},
        {id: 2, teacherId: 'T10002', teacherName: 'Jane Doe', email: '213@edu.cn', background: 'Computer Science'},
    ];
    // State variables to store students, teachers, and toggles for table visibility
    const [students, setStudents] = useState(defaultStudents);
    const [teachers, setTeachers] = useState(defaultTeachers);
    const [openStudent, setOpenStudent] = useState(true);
    const [openTeacher, setOpenTeacher] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch student and teacher data from the server
        axios.get('http://localhost:8080/staff/getAllStudents')
            .then(res => {
                console.log(res.data);
                setStudents(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        axios.get('http://localhost:8080/staff')
            .then(res => {
                console.log(res.data);
                setTeachers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="Management"/>
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        {/* Render the program name and description */}
                        <h2 className='gFont'>Admin Management</h2>
                        <p className="description">You can look all the student and the teacher information</p>
                        <div className='content-top'>
                            <div className={'btn'}>
                                <Button variant="contained" className="searchButton"
                                        onClick={() => {setOpenStudent(true); setOpenTeacher(false)}}
                                >Student</Button>
                            </div>
                            <div className={'btn'}>
                                <Button variant="contained" className="searchButton"
                                        onClick={() => {setOpenTeacher(true); setOpenStudent(false)}}
                                >Teacher</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-top'>
                        <TextField label="Search" variant="outlined" size="small"/>
                        <Button variant="contained" className="searchButton">Search</Button>
                        <Button variant="contained" className="searchButton"
                                onClick={() => navigate('/Register')}>
                            Register</Button>
                    </div>
                    {/* Render the StudentTable if openStudent is true, otherwise render the TeacherTable */}
                    {openTeacher ? '': <StudentTable students={students}/>}
                    {openStudent ? '': <TeacherTable teachers={teachers}/>}

                </div>
            </div>
        </div>
    );
}

export default AdminManagement;