/**
 * Component Name: MyTimetable
 * Description: For tutor/student to view and manage their timetable
 * Author: Yuhui Xiao
 * Created Date: 2024-04-29
 */

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LeftBar from './../../component/leftbar/leftbar';
import {
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    TextField, DialogActions,
    Dialog, DialogTitle, DialogContent
} from '@material-ui/core';
import axios from 'axios';
import './timetable.css';




const ModuleInfoDialog = ({module, onCancel}) => {
    const [moduleName, setModuleName] = useState(module?.moduleName ?? '');
    const [moduleTutor, setModuleTutor] = useState(module?.moduleTutor ?? '');
    const [classLocation, setClassLocation] = useState(module?.classLocation ?? '');
    const [moduleTime, setModuleTime] = useState(module?.moduleTime ?? '');

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['morning', 'afternoon']

    return (
        <div>
            <DialogTitle>Module Information</DialogTitle>
            <DialogContent>
                <div className='flex-center'>
                    <div className='left'>Module:</div>
                    <TextField value={moduleName} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Tutor:</div>
                    <TextField value={moduleTutor} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Location:</div>
                    <TextField value={classLocation} fullWidth disabled/>
                </div>
                <div className='flex-center'>
                    <div className='left'>Time:</div>
                    <TextField
                        value={weekDays[moduleTime.split('-')[0] - 1] + ' ' + times[moduleTime.split('-')[1] - 1]}
                        fullWidth disabled/>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Close</Button>
            </DialogActions>
        </div>


    );
}
function MyTimetable() {
    const [timetables, setTimetables] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [module, setModule] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/staff/getMyTimetable',{
            params: {
                staffId: localStorage.getItem('user').staffId
            }
        })
            .then((response) => {
                setTimetables(response.data);
            });
    });


    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9', '10', '11', 'Noon', '3', '4', '5'];

    const defaultTimetables = [
        {moduleId: '1', moduleName: 'Course 1', classLocation: 'Room 101', moduleTime: '1-1'},
        {moduleId: '2', moduleName: 'Course 2', classLocation: 'Room 202', moduleTime: '2-2'},
        {moduleId: '3', moduleName: 'Course 3', classLocation: 'Room 303', moduleTime: '3-1'},
        {moduleId: '4', moduleName: 'Course 4', classLocation: 'Room 404', moduleTime: '4-2'},
        {moduleId: '5', moduleName: 'Course 5', classLocation: 'Room 505', moduleTime: '5-1'},
        // Add more courses as needed
    ];

    const handleClickCourse = (moduleId) => {
        axios.get('http://localhost:8080/module/' + moduleId)
            .then((response) => {
                setModule(response.data);
                setOpen(true);

            })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="MyTimetable"/>
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        {/* Renderer name and description */}
                        <h2 className='gFont'>My Timetable</h2>
                        <p className="description">You can check your timetable here.</p>
                    </div>
                </div>

                <div className='content'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{border: 'none'}}></TableCell>
                                {daysOfWeek.map((day) => (
                                    <TableCell key={day} style={{border: 'none'}}>{day}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeSlots.map((time, index) => (
                                <TableRow key={time}>
                                    <TableCell style={{border: 'none'}}>{time}</TableCell>
                                    { time === 'Noon' ? <TableCell style={{border: 'none'}}><br/></TableCell> :
                                        time !== '9' && time !== '3' ? null :
                                    daysOfWeek.map((day, index) => (
                                        <TableCell key={day} rowSpan={3} style={{border: '2px solid black'}} className='t_cell'>
                                            {defaultTimetables.filter(t => t.moduleTime === ((index + 1) + '-' + (time === '9' ? '1' : time === '3' ? '2' : '0')))
                                                .map((timetable) => (
                                                    <div className='timetable' key={timetable.moduleId}
                                                         onClick={() => handleClickCourse(timetable.moduleId)}>
                                                        <div>{timetable.moduleName}</div>
                                                        <br/>
                                                        <div>{timetable.classLocation}</div>
                                                    </div>
                                                ))}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>

            </div>
            <Dialog open={open} onClose={handleClose}>
                <ModuleInfoDialog module={module} onCancel={handleClose}/>
            </Dialog>
        </div>
    );
}

export default MyTimetable;
