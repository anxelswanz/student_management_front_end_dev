/**
 * Component Name: StaffAllWork
 * Description: For staff to view all work and modify
 * Author: Yuhui Xiao
 * Created Date: 2024-04-20
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
    TextField, DialogActions,
    Select, MenuItem, Dialog, DialogTitle, DialogContent, InputLabel
} from '@material-ui/core';
import axios from 'axios';
import './allwork.css';
import '../header.css';
import downloadIcon from './../../../assets/download.png';



const WorkInfoDialog = ({work, onOk, onCancel}) => {
    // Display work information
    const [moduleId, setModuleId] = useState(work?.moduleId ?? '');
    const [studentId, setStudentId] = useState(work?.studentId ?? '');
    const [type, setType] = useState(work?.type ?? '');
    const [submitStatus, setSubmitStatus] = useState(work?.submitStatus ?? '');
    const [mark, setMark] = useState(work?.mark ?? '');
    const [tempMark, setTempMark] = useState(work?.tempMark ?? '');

    return (
        <div>
            <DialogTitle>Confirm Dialog</DialogTitle>
            <DialogContent>
                <div className='flex-center'>
                    <div className='left'>Module ID:</div>
                    <TextField value={moduleId} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Student ID:</div>
                    <TextField value={studentId} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Type:</div>
                    <TextField value={type} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Submit Status:</div>
                    <TextField value={submitStatus} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Mark:</div>
                    <TextField value={mark} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Result Mark:</div>
                    <TextField value={tempMark} onChange={(e) => setTempMark(e.target.value)} disabled/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onOk}>Confirm</Button>
                <Button onClick={onCancel}>Close</Button>
            </DialogActions>
        </div>


    );
}

function AllWork() {
    // initialization data
    const defaultWorks = [
        {
            id: 1,
            moduleId: 'EM00001',
            studentId: 1,
            type: 'Coursework',
            submitStatus: 'Submitted',
            mark: 80
        },
        {
            id: 2,
            moduleId: 'FP00002',
            studentId: 2,
            type: 'Exam',
            submitStatus: 'Submitted',
            mark: 90
        },
        {
            id: 3,
            moduleId: 'EC00003',
            studentId: 3,
            type: 'Coursework',
            submitStatus: 'Not Submitted',
            mark: 0
        },
        {
            id: 4,
            moduleId: 'MS00004',
            studentId: 4,
            type: 'Exam',
            submitStatus: 'Submitted',
            mark: 0
        },
        {
            id: 5,
            moduleId: 'EA00005',
            studentId: 5,
            type: 'Coursework',
            submitStatus: 'Submitted',
            mark: 75
        },
        {
            id: 6,
            moduleId: 'T100006',
            studentId: 6,
            type: 'Exam',
            submitStatus: 'Submitted',
            mark: 88
        }

    ]
    const [works, setWorks] = useState(defaultWorks);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [work, setWork] = useState(null);


    // Use tempMarks to store the modified mark, and the handleChange function to update tempMarks
    const [tempMarks, setTempMarks] = useState(defaultWorks.map(work => work.mark));
    const handleChange = (index, value) => {
        const updatedTempMark = [...tempMarks];
        updatedTempMark[index] = value;
        setTempMarks(updatedTempMark);
    };
    function init() {
        axios.get('http://localhost:8080/staff/getAllWork',{
            params: {
                staffId: localStorage.getItem('user').staffId
            }
        })
            .then(response => {
                setWorks(response.data);
            })
            .catch(error => {
                console.error('Error fetching work data:', error);
            });
    }
    // Get data from the back end
    useEffect(() => {
        init();

    })

    const handleOk = () => {
        setOpen(false);
        work.mark = work.tempMark
        axios.post('http://localhost:8080/staff/updateWork', work)
            .then(response => {
                init()
                console.log('Update work successfully');
            })
            .catch(error => {
                console.error('Error updating work:', error);
            });
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleOpenDialog = (work,tempMark) => {
        setWork(work);
        work.tempMark = tempMark;
        setOpen(true);
    }


    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="AllWork"/>
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        {/* Renderer name and description */}
                        <h2 className='gFont'>All Work</h2>
                        <p className="description">You can find all the assignments and exams submitted by students
                            here</p>
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
                                    <TableCell>Module ID</TableCell>
                                    <TableCell>Student ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Submit Status</TableCell>
                                    <TableCell>Download Content</TableCell>
                                    <TableCell>Mark</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {works.map((work,index) => (
                                    <TableRow key={work.id}>
                                        <TableCell>{work.id}</TableCell>
                                        <TableCell>{work.moduleId}</TableCell>
                                        <TableCell>{work.studentId}</TableCell>
                                        <TableCell>{work.type}</TableCell>
                                        <TableCell>{work.submitStatus}</TableCell>
                                        <TableCell>
                                            <a href='/'><img src={downloadIcon} alt="download" className='icon'/></a>
                                        </TableCell>
                                        <TableCell>
                                            <TextField value={tempMarks[index]}
                                                       key={index}
                                                       onChange={(e) => handleChange(index, e.target.value)}/>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpenDialog(work,tempMarks[index])}>Modify</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
            <Dialog open={open}>
                <WorkInfoDialog work={work}
                                onOk={() => handleOk()} onCancel={handleCancel}/>
            </Dialog>
        </div>

    );
}

export default AllWork;
