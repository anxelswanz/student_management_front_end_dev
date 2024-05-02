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
    TextField, DialogActions,
    Select, MenuItem, Dialog, DialogTitle, DialogContent, InputLabel
} from '@material-ui/core';
import axios from 'axios';
import './assignstudent.css';
import '../header.css';

/**
 * Component Name: AssignStudent
 * Description: Admin can assign sequential student numbers to teachers
 * Author: Yuhui Xiao
 * Created Date: 2024-04-25
 */
function AssignStudent() {


    const [assignStudentsInfo, setAssignStudentsInfo] = useState([]);
    const [toAssignTutors, setToAssignTutors] = useState([]);
    const [studentNumber, setStudentNumber] = useState({
        'startStudentNumber': 1,
        'endStudentNumber': 15
    });
    const [tutorId, setTutorId] = useState(0);

    const defaultAssignTutors = [
        {id: 1, name: 'Tutor1'},
        {id: 2, name: 'Tutor2'},
        {id: 3, name: 'Tutor3'},
        {id: 4, name: 'Tutor4'},
    ];
    useEffect(() => {
        // axios.get('http://localhost:8080/assignStudentsInfo')
        //     .then((response) => {
        //         setAssignStudentsInfo(response.data);
        //     });
        // axios.get('http://localhost:8080/toAssignTutors')
        //     .then((response) => {
        //         setToAssignTutors(response.data);
        //     });
        // axios.get('http://localhost:8080/assignStudentNumber')
        //     .then((response) => {
        //         setStudentNumber(response.data);
        //     });

        setToAssignTutors(defaultAssignTutors);

    }, []);


    const options = toAssignTutors.map((tutor, index) =>
        <MenuItem key={index} value={tutor.id}>{tutor.name}</MenuItem>);

    const handleAssign = (startStudentNumber, endStudentNumber, tutorId) => {
        // axios.post('http://localhost:8080/assignStudent', {
        //     startStudentNumber: startStudentNumber,
        //     endStudentNumber: endStudentNumber,
        //     tutorId: tutorId
        // }).then((response) => {
        //     setAssignStudentsInfo(response.data);
        // });

        assignStudentsInfo.push({
            tutorId: tutorId,
            tutorName: defaultAssignTutors.find(tutor => tutor.id === tutorId).name,
            startStudentNumber: startStudentNumber,
            endStudentNumber: endStudentNumber
        })
        setAssignStudentsInfo([...assignStudentsInfo]);
        toAssignTutors.splice(toAssignTutors.findIndex(tutor => tutor.id === tutorId), 1);
        setToAssignTutors([...toAssignTutors]);
        let newStudentNumber = {
            'startStudentNumber': endStudentNumber + 1,
            'endStudentNumber': endStudentNumber + 15
        }
        setStudentNumber(newStudentNumber);
    }

    const handleDelete = (tutorId) => () => {
        // axios.post('http://localhost:8080/deleteAssignStudent', {
        //     tutorId: tutorId
        // }).then((response) => {
        //     setAssignStudentsInfo(response.data);
        // });
        setAssignStudentsInfo(assignStudentsInfo.filter(assignStudent => assignStudent.tutorId !== tutorId));
        setToAssignTutors([...toAssignTutors, defaultAssignTutors.find(tutor => tutor.id === tutorId)]);
    }


    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="AssignStudent"/>
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        {/* 渲染程序名称和描述 */}
                        <h2 className='gFont'>Assign Student</h2>
                        <p className="description">You can assign sequential student numbers to teachers</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-top'>
                        <div className='content-1'>Select Tutor:</div>
                        <Select value={tutorId} onChange={(e) => setTutorId(e.target.value)}>
                            {options}
                        </Select>
                        <div className='content-number'>
                            <div className='content-number'>
                                <TextField value={studentNumber.startStudentNumber} disabled={true}
                                           onChange={(e) => setStudentNumber(e.target.value)}/>
                            </div>
                            <div className='content-number'>
                                -
                            </div>
                            <div className='content-number'>
                                <TextField value={studentNumber.endStudentNumber} disabled={true}
                                           onChange={(e) => setStudentNumber(e.target.value)}/>
                            </div>
                        </div>
                        <Button variant="contained" color="primary"
                                onClick={() => handleAssign(studentNumber.startStudentNumber, studentNumber.endStudentNumber, tutorId)}>Assign</Button>



                    </div>


                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tutor Name</TableCell>
                                    <TableCell>Student Number Interval</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignStudentsInfo.map((assignStudent, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{assignStudent.tutorName}</TableCell>
                                        <TableCell>{assignStudent.startStudentNumber} - {assignStudent.endStudentNumber}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary"
                                                    onClick={handleDelete(assignStudent.tutorId)}>Delete</Button>
                                        </TableCell>
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
