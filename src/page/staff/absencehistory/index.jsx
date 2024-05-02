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
    TextField, DialogTitle, DialogContent, DialogActions, Dialog
} from '@material-ui/core';
import axios from 'axios';
import './absencehistory.css';
import '../header.css';

/**
 * Component Name: AbsenceHistory
 * Description: Staff can view all absence history of students
 * Author: Yuhui Xiao
 * Created Date: 2024-04-25
 */

const AbsenceInfoDialog = ({msg, absence, onOk, onCancel}) => {
    // 展示请假信息
    const [absenceId, setAbsenceId] = useState(absence?.AbsenceUUID ?? '');
    const [studentId, setStudentId] = useState(absence?.StudentID ?? '');
    const [studentName, setStudentName] = useState(absence?.StudentName ?? '');
    const [startTime, setStartTime] = useState(absence?.StartTime ?? '');
    const [endTime, setEndTime] = useState(absence?.EndTime ?? '');
    const [reason, setReason] = useState(absence?.Reason ?? '');


    return (
        <div>
            <DialogTitle>Confirm {msg} Dialog</DialogTitle>
            <DialogContent>
                <div className='flex-center'>
                    <div className='left'>AbsenceUUID:</div>
                    <TextField value={absenceId} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>StudentID:</div>
                    <TextField value={studentId} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>StudentName:</div>
                    <TextField value={studentName} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>StartTime:</div>
                    <TextField value={startTime} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>EndTime:</div>
                    <TextField value={endTime} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Reason:</div>
                    <TextField value={reason} fullWidth disabled/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onOk}>Confirm</Button>
                <Button onClick={onCancel}>Close</Button>
            </DialogActions>
        </div>


    );
}

function AbsenceHistory() {
    // 初始化数据
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [absence, setAbsence] = useState(null);
    const [msg, setMsg] = useState('');

    const defaultAbsences = [
        {
            AbsenceUUID: 1,
            StudentID: 1,
            StudentName: 'John Doe',
            StartTime: '2024-04-25 09:00:00',
            EndTime: '2024-04-25 12:00:00',
            Reason: 'Sick',
            Status: '1'
        },
        {
            AbsenceUUID: 2,
            StudentID: 2,
            StudentName: 'Jane Doe',
            StartTime: '2024-04-25 09:00:00',
            EndTime: '2024-04-25 12:00:00',
            Reason: 'Sick',
            Status: '2'
        },
        {
            AbsenceUUID: 3,
            StudentID: 3,
            StudentName: 'John Smith',
            StartTime: '2024-04-25 09:00:00',
            EndTime: '2024-04-25 12:00:00',
            Reason: 'Sick',
            Status: '0'
        },
        {
            AbsenceUUID: 4,
            StudentID: 4,
            StudentName: 'Jane Smith',
            StartTime: '2024-04-25 09:00:00',
            EndTime: '2024-04-25 12:00:00',
            Reason: 'Sick',
            Status: '1'
        },
        {
            AbsenceUUID: 5,
            StudentID: 5,
            StudentName: 'John Doe',
            StartTime: '2024-04-25 09:00:00',
            EndTime: '2024-04-25 12:00:00',
            Reason: 'Sick',
            Status: '2'
        },
    ];

    const [absences, setAbsences] = useState(defaultAbsences);

    useEffect(() => {
        // axios.get('http://localhost:8080/api/staff/getAllAbsenceRequests')
        //     .then(response => {
        //         setStudents(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching absences:', error);
        //     });
    })



    const handleOk = () => {
        if (msg === 'Approve') {
            handleApprove(absence);
        } else {
            handleReject(absence);
        }
        setOpen(false);
    }

    const handleApprove = (absence) => {

        // axios.post('http://localhost:8080/api/staff/approveAbsenceRequest', absence)
        //     .then(response => {
        //         console.log('Absence request approved:', response);
        //         setAbsences(absences.filter(a => a.AbsenceUUID !== absence.AbsenceUUID));
        //     })
        //     .catch(error => {
        //         console.error('Error approving absence request:', error);
        //     });
        absence.Status = '1';
    }

    const handleReject = (absence) => {
        // axios.post('http://localhost:8080/api/staff/rejectAbsenceRequest', absence)
        //     .then(response => {
        //         console.log('Absence request rejected:', response);
        //         setAbsences(absences.filter(a => a.AbsenceUUID !== absence.AbsenceUUID));
        //     })
        //     .catch(error => {
        //         console.error('Error rejecting absence request:', error);
        //     });
        absence.Status = '2';
    }

    const handleClickOpen = (absence, msg) => {
        console.log(absence);
        setOpen(true);
        setAbsence(absence);
        setMsg(msg);
    }


    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="AbsenceHistory"/>
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        {/* 渲染程序名称和描述 */}
                        <h2 className='gFont'>Absence History</h2>
                        <p className="description">You can view and handle all your leave history here</p>
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
                                    <TableCell>AbsenceUUID</TableCell>
                                    <TableCell>StudentID</TableCell>
                                    <TableCell>StudentName</TableCell>
                                    <TableCell>StartTime</TableCell>
                                    <TableCell>EndTime</TableCell>
                                    <TableCell>Reason</TableCell>
                                    <TableCell>Request Handing</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {absences.map(absence => (
                                    <TableRow key={absence.AbsenceUUID}>
                                        <TableCell>{absence.AbsenceUUID}</TableCell>
                                        <TableCell>{absence.StudentID}</TableCell>
                                        <TableCell>{absence.StudentName}</TableCell>
                                        <TableCell>{absence.StartTime}</TableCell>
                                        <TableCell>{absence.EndTime}</TableCell>
                                        <TableCell>{absence.Reason}</TableCell>
                                        <TableCell>
                                            {absence.Status === '1' ? '' :
                                                <Button variant="contained" color="primary" className="absenceButton"
                                                        onClick={() => handleClickOpen(absence, 'Approve')}>Approve</Button>}
                                            {absence.Status === '2' ? '' :
                                                <Button variant="contained" color="secondary" className="absenceButton"
                                                        onClick={() => handleClickOpen(absence, 'Reject')}>Reject</Button>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
            <Dialog open={open}>
                <AbsenceInfoDialog msg={msg} absence={absence} onOk={() => {
                    handleOk()
                }} onCancel={() => {
                    setOpen(false)
                }}/>

            </Dialog>

        </div>
    );
}

export default AbsenceHistory;
