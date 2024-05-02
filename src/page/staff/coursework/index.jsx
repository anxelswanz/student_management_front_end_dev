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
import './coursework.css';
import '../header.css';
import Coursework from "../../coursework";
/**
 * Component Name: StaffCoursework
 * Description: You can post assignments and view all published assignments here
 * Author: Yuhui Xiao
 * Created Date: 2024-04-25
 */

const CourseworkForm = ({coursework, modules, onSubmit, onCancel}) => {
    const [moduleId, setModuleId] = useState(coursework?.moduleId ?? '');
    const [courseworkDescription, setCourseworkDescription] = useState(coursework?.courseworkDescription ?? '');
    const [courseworkName, setCourseworkName] = useState(coursework?.courseworkName ?? '');
    const [releaseTime, setReleaseTime] = useState(coursework?.releaseTime ?? '');
    const [deadline, setDeadline] = useState(coursework?.deadline ?? '');

    const currentTime = new Date().toISOString().slice(0, 16);


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({...coursework, moduleId, courseworkDescription, courseworkName, releaseTime, deadline});
    };

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
            <InputLabel id="coursework-name-label">Coursework Name</InputLabel>
            <TextField labelId="coursework-name-label"
                          value={courseworkName} onChange={(event) =>
                setCourseworkName(event.target.value)} fullWidth/>
            <InputLabel id="coursework-description-label">Coursework Description</InputLabel>
            <TextField labelId="coursework-description-label"
                            value={courseworkDescription} onChange={(event) =>
                setCourseworkDescription(event.target.value)} fullWidth/>
            <InputLabel id="release-time-label">Release Time</InputLabel>
            <TextField labelId="release-time-label" type="datetime-local"
                            value={releaseTime} onChange={(event) =>
                setReleaseTime(event.target.value)} fullWidth/>
            <InputLabel id="deadline-label">Deadline</InputLabel>
            <TextField labelId="deadline-label" type="datetime-local"
                            value={deadline} onChange={(event) =>
                setDeadline(event.target.value)} fullWidth/>
            <DialogActions>
                <Button type="submit">Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </form>
    );

};

function StaffCoursework() {
    const [modules, setModules] = useState([]);
    const [courseworks, setCourseworks] = useState([]);
    const [editingCoursework, setEditingCoursework] = useState(null);
    const [addCoursework, setAddCoursework] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // axios.get('http://localhost:8080/module')
        //     .then(response => {
        //         setModules(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching modules:', error);
        //     });
        // axios.get('http://localhost:8080/coursework')
        //     .then(response => {
        //         setCourseworks(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching coursework:', error);
        //     });
    })

    const defaultModules  = [
        { id: "EM00001", name: "Engineering Mathematics and Systems Modelling" },
        { id: "FP00002", name: "Foundations of Programming" },
        { id: "EC00003", name: "Electrical Circuits and Machines" },
        { id: "MS00004", name: "Statics and Structures" },
        { id: "EA00005", name: "Electronic Circuits and Applications" },
        { id: "T100006", name: "Thermofluids" }
    ]

    const handleAddSaveCoursework = (coursework) => {
        // axios.post('http://localhost:8080/coursework', coursework)
        //     .then(response => {
        //         setCourseworks(prevCourseworks => [...prevCourseworks, response.data]);
        //         setEditingCoursework(null);
        //     })
        //     .catch(error => {
        //         console.error('Error saving coursework:', error);
        //     });
        coursework.id = courseworks.length + 1;
        coursework.moduleName = defaultModules.find(module => module.id === coursework.moduleId).name;
        setCourseworks(prevCourseworks => [...prevCourseworks, coursework]);
        setEditingCoursework(null);
        setAddCoursework(false);
    }

    const handleEditSaveCoursework = (coursework) => {
        // axios.put('http://localhost:8080/coursework', coursework)
        //     .then(response => {
        //         setCourseworks(prevCourseworks => prevCourseworks.map(c => c.id === coursework.id ? response.data : c));
        //         setEditingCoursework(null);
        //     })
        //     .catch(error => {
        //         console.error('Error saving coursework:', error);
        //     });
        setCourseworks(prevCourseworks => prevCourseworks.map(c => c.id === coursework.id ? coursework : c));
        coursework.moduleName = defaultModules.find(module => module.id === coursework.moduleId).name;
        setEditingCoursework(null);
        setAddCoursework(false);
    }

    const handleEditCoursework = (coursework) => {
        setEditingCoursework(coursework);
    }

    const handleCancelEdit = () => {
        setEditingCoursework(null);
        setAddCoursework(false);
    }

    return (
    <div className='container' id='Header'>
        <div className='leftbox'>
            <LeftBar tabNav="StaffCoursework" />
        </div>
        <div className='maincenter'>
            <div className='topline'>
                <div className='topMain'>
                    {/* 渲染程序名称和描述 */}
                    <h2 className='gFont'>All Coursework</h2>
                    <p className="description">You can post assignments and view all published assignments here</p>
                </div>
            </div>

            <div className='content'>
                <div className='content-top'>
                    <TextField label="Search" variant="outlined" size="small"/>
                    <Button variant="contained" className="searchButton">Search</Button>
                    <Button variant="contained" className="addButton" onClick={() => setAddCoursework(true)}>
                        Release a Coursework
                    </Button>
                </div>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Module</TableCell>
                                <TableCell>Coursework Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Release Time</TableCell>
                                <TableCell>Deadline</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courseworks.map((coursework, index) => (
                                <TableRow key={index}>
                                    <TableCell>{coursework.id}</TableCell>
                                    <TableCell>{coursework.moduleName}</TableCell>
                                    <TableCell>{coursework.courseworkName}</TableCell>
                                    <TableCell>{coursework.courseworkDescription}</TableCell>
                                    <TableCell>{coursework.releaseTime}</TableCell>
                                    <TableCell>{coursework.deadline}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditCoursework(coursework)}>Edit</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            <Dialog open={addCoursework} onClose={handleCancelEdit}>
                <DialogTitle>Release Coursework</DialogTitle>
                <DialogContent>
                    <CourseworkForm coursework={null} modules={defaultModules}
                                   onSubmit={handleAddSaveCoursework} onCancel={handleCancelEdit}/>
                </DialogContent>
            </Dialog>

            <Dialog open={editingCoursework !== null} onClose={handleCancelEdit}>
                <DialogTitle>Edit Timetable</DialogTitle>
                <DialogContent>
                    {editingCoursework && (
                        <CourseworkForm coursework={editingCoursework} modules={defaultModules}
                                       onSubmit={handleEditSaveCoursework} onCancel={handleCancelEdit}/>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    </div>
    );
}

export default StaffCoursework;
