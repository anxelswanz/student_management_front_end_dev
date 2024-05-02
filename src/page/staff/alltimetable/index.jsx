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
    TextField, DialogActions,
    Select, MenuItem, Dialog, DialogTitle, DialogContent, InputLabel
} from '@material-ui/core';
import axios from 'axios';
import './timetable.css';
import '../header.css';
/**
 * Component Name: AllTimetable
 * Description: For admin to look all modules mytimetable and modify
 * Author: Yuhui Xiao
 * Created Date: 2024-04-25
 */

const TimetableForm = ({timetable, modules, onSubmit, onCancel}) => {
    const [moduleId, setModuleId] = useState(timetable?.moduleId ?? '');
    const [classLocation, setClassLocation] = useState(timetable?.classLocation ?? '');
    const [moduleTime, setModuleTime] = useState(timetable?.moduleTime ?? '');
    const [weekDay, setWeekDay] = useState(moduleTime.split('-')[0]);
    const [time, setTime] = useState(moduleTime.split('-')[1]);


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({...timetable, moduleId, classLocation, moduleTime, weekDay, time});
    };

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weekDayOptions = weekDays.map((day, index) =>
        <MenuItem key={index} value={index+1}>{day}</MenuItem>);

    const times = ['morning', 'afternoon']
    const timeOptions = times.map((time, index) =>
        <MenuItem key={index} value={index+1}>{time}</MenuItem>);

    const moduleOptions = modules.map((module, index) =>
        <MenuItem key={index} value={module.id}>{module.name}</MenuItem>);

    return (
        <form onSubmit={handleSubmit}>
            <InputLabel id="module-label">Module</InputLabel>
            <Select value={moduleId}
                    labelId="module-label"
                    onChange={(event) =>
                        setModuleId(event.target.value)} fullWidth>
                {moduleOptions}
            </Select>
            <InputLabel id="class-location-label">Class Location</InputLabel>
            <TextField labelId="class-location-label"
                       value={classLocation} onChange={(event) =>
                setClassLocation(event.target.value)} fullWidth/>
            <InputLabel id="week-day-label">Week day</InputLabel>
            <Select labelId="week-day-label" value={weekDay}
                    onChange={(event) =>
                        setWeekDay(event.target.value)} fullWidth>
                {weekDayOptions}
            </Select>
            <InputLabel id="time-label">Module Time</InputLabel>
            <Select labelId="time-label" value={time}
                    onChange={(event) =>
                        setTime(event.target.value)} fullWidth>
                {timeOptions}
            </Select>
            <DialogActions>
                <Button type="submit">Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </form>
    );

};

function AllTimetable() {
    const [timetables, setTimetables] = useState([]);
    const [modules, setModules] = useState([]);
    const [editingTimetable, setEditingTimetable] = useState(null);
    const [addTimetable, setAddTimetable] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('http://localhost:8080/timetable')
    //         .then(response => {
    //             setTimetables(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching alltimetable data:', error);
    //         });
    //
    //     axios.get('http://localhost:8080/module')
    //         .then(response => {
    //             setModules(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching module data:', error);
    //         });
    // }, []);

    const defaultModules  = [
        { id: "EM00001", name: "Engineering Mathematics and Systems Modelling" },
        { id: "FP00002", name: "Foundations of Programming" },
        { id: "EC00003", name: "Electrical Circuits and Machines" },
        { id: "MS00004", name: "Statics and Structures" },
        { id: "EA00005", name: "Electronic Circuits and Applications" },
        { id: "T100006", name: "Thermofluids" }
    ]

    const handleAddSaveTimetable = (timetable) => {
        // axios.post('http://localhost:8080/timetable', alltimetable)
        //     .then(response => {
        //         setTimetables(prevTimetables => [...prevTimetables, response.data]);
        //         setEditingTimetable(null);
        //     })
        //     .catch(error => {
        //         console.error('Error saving mytimetable:', error);
        //     });
        timetable.id = timetables.length + 1;
        timetable.moduleName = defaultModules.find(module => module.id === timetable.moduleId).name;
        timetable.moduleTime = timetable.weekDay + '-' + timetable.time;
        timetable.programmeId = 'P10001';
        setTimetables(prevTimetables => [...prevTimetables, timetable]);
        console.log(timetable);
        setAddTimetable(false)
    }

    const handleEditSaveTimetable = (timetable) => {
        // axios.put('http://localhost:8080/timetable', alltimetable)
        //     .then(response => {
        //         setTimetables(prevTimetables => prevTimetables.map(t =>
        //             t.id === response.data.id ? response.data : t));
        //         setEditingTimetable(null);
        //     })
        //     .catch(error => {
        //         console.error('Error saving mytimetable:', error);
        //     });
        timetable.moduleName = defaultModules.find(module => module.id === timetable.moduleId).name;
        timetable.moduleTime = timetable.weekDay + '-' + timetable.time;
        setTimetables(prevTimetables => prevTimetables.map(t =>
            t.id === timetable.id ? timetable : t));
        setEditingTimetable(null);
    }

    const handleEditTimetable = (timetable) => {
        setEditingTimetable(timetable);
    }

    const handleCancelEdit = () => {
        setEditingTimetable(null);
        setAddTimetable(false);
    }

    return (
    <div className='container' id='Header'>
        <div className='leftbox'>
            <LeftBar tabNav="AllTimetable" />
        </div>
        <div className='maincenter'>
            <div className='topline'>
                <div className='topMain'>
                    {/* 渲染程序名称和描述 */}
                    <h2 className='gFont'>All Timetable</h2>
                    <p className="description">You can look all of the modules timetable and modify</p>
                </div>
            </div>

            <div className='content'>
                <div className='content-top'>
                    <TextField label="Search" variant="outlined" size="small"/>
                    <Button variant="contained" className="searchButton">Search</Button>
                    <Button variant="contained" className="addButton" onClick={() => setAddTimetable(true)}>
                        Add Timetable
                    </Button>
                </div>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Module ID</TableCell>
                                <TableCell>Module Name</TableCell>
                                <TableCell>Programme ID</TableCell>
                                <TableCell>Class Location</TableCell>
                                <TableCell>Module Time</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timetables.map((timetable, index) => (
                                <TableRow key={index}>
                                    <TableCell>{timetable.id}</TableCell>
                                    <TableCell>{timetable.moduleId}</TableCell>
                                    <TableCell>{timetable.moduleName}</TableCell>
                                    <TableCell>{timetable.programmeId}</TableCell>
                                    <TableCell>{timetable.classLocation}</TableCell>
                                    <TableCell>{timetable.moduleTime}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                            onClick={() => handleEditTimetable(timetable)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            <Dialog open={addTimetable} onClose={handleCancelEdit}>
                <DialogTitle>Add Timetable</DialogTitle>
                <DialogContent>
                    <TimetableForm timetable={null} modules={defaultModules}
                                   onSubmit={handleAddSaveTimetable} onCancel={handleCancelEdit}/>
                </DialogContent>
            </Dialog>

            <Dialog open={editingTimetable !== null} onClose={handleCancelEdit}>
                <DialogTitle>Edit Timetable</DialogTitle>
                <DialogContent>
                    {editingTimetable && (
                        <TimetableForm timetable={editingTimetable} modules={defaultModules}
                                       onSubmit={handleEditSaveTimetable} onCancel={handleCancelEdit}/>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    </div>
    );
}

export default AllTimetable;
