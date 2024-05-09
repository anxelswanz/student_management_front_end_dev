
/**
 * Component Name: StaffCoursework
 * Description: You can post assignments and view all published assignments here
 * Author: Yuhui Xiao
 * Created Date: 2024-04-26
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
    TextField, DialogActions,
    Select, MenuItem, Dialog, DialogTitle, DialogContent, InputLabel
} from '@material-ui/core';
import axios from 'axios';
import './coursework.css';
import '../header.css';
import Coursework from "../../coursework";

// CourseworkForm component that is used to display and submit the form for creating or editing a coursework.
const CourseworkForm = ({coursework, modules, onSubmit, onCancel}) => {
    // State variables to store the form data
    const [moduleId, setModuleId] = useState(coursework?.moduleId ?? '');
    const [courseworkDescription, setCourseworkDescription] = useState(coursework?.courseworkDescription ?? '');
    const [courseworkName, setCourseworkName] = useState(coursework?.courseworkName ?? '');
    const [releaseTime, setReleaseTime] = useState(coursework?.releaseTime ?? '');
    const [deadline, setDeadline] = useState(coursework?.deadline ?? '');

    const currentTime = new Date().toISOString().slice(0, 16);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({...coursework, moduleId, courseworkDescription, courseworkName, releaseTime, deadline});
    };

    // Generate the options for the module select dropdown
    const moduleOptions = modules.map((module, index) =>
        <MenuItem key={index} value={module.id}>{module.name}</MenuItem>);

    return (
        <form onSubmit={handleSubmit}>
            <InputLabel id="module-label">Module</InputLabel>
            <Select
                value={moduleId}
                labelId="module-label"
                onChange={(event) => setModuleId(event.target.value)}
                fullWidth
            >
                {moduleOptions}
            </Select>
            <InputLabel id="coursework-name-label">Coursework Name</InputLabel>
            <TextField
                labelId="coursework-name-label"
                value={courseworkName}
                onChange={(event) => setCourseworkName(event.target.value)}
                fullWidth
            />
            <InputLabel id="coursework-description-label">Coursework Description</InputLabel>
            <TextField
                labelId="coursework-description-label"
                value={courseworkDescription}
                onChange={(event) => setCourseworkDescription(event.target.value)}
                fullWidth
            />
            <InputLabel id="release-time-label">Release Time</InputLabel>
            <TextField
                labelId="release-time-label"
                type="datetime-local"
                value={releaseTime}
                onChange={(event) => setReleaseTime(event.target.value)}
                fullWidth
            />
            <InputLabel id="deadline-label">Deadline</InputLabel>
            <TextField
                labelId="deadline-label"
                type="datetime-local"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                fullWidth
            />
            <DialogActions>
                <Button type="submit">Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </form>
    );
};

// StaffCoursework component that displays the staff coursework page
function StaffCoursework() {
    // State variables to store the modules, coursework, currently editing coursework, and add coursework flag
    const [modules, setModules] = useState([]);
    const [courseworks, setCourseworks] = useState([]);
    const [editingCoursework, setEditingCoursework] = useState(null);
    const [addCoursework, setAddCoursework] = useState(false);

    const navigate = useNavigate();

    // Function to initialize the component by fetching modules and coursework from the server
    function init() {
        axios.get('http://localhost:8080/module')
            .then(response => {
                setModules(response.data);
            })
            .catch(error => {
                console.error('Error fetching modules:', error);
            });
        axios.get('http://localhost:8080/staff/coursework',{
            params: {
                staffId: localStorage.getItem('user').staffId
            }
        })
            .then(response => {
                setCourseworks(response.data);
            })
            .catch(error => {
                console.error('Error fetching coursework:', error);
            });
    }

    useEffect(() => {
        init();
    }, []);

    // Default modules data
    const defaultModules  = [
        { id: "EM00001", name: "Engineering Mathematics and Systems Modelling" },
        { id: "FP00002", name: "Foundations of Programming" },
        { id: "EC00003", name: "Electrical Circuits and Machines" },
        { id: "MS00004", name: "Statics and Structures" },
        { id: "EA00005", name: "Electronic Circuits and Applications" },
        { id: "T100006", name: "Thermofluids" }
    ]

    // Function to handle saving an added coursework
    const handleAddSaveCoursework = (coursework) => {
        axios.post('http://localhost:8080/staff/postCoursework', coursework)
            .then(response => {
                init()
                setEditingCoursework(null);
                setAddCoursework(false);
            })
            .catch(error => {
                console.error('Error saving coursework:', error);
            });
    }

    // Function to handle saving an edited coursework
    const handleEditSaveCoursework = (coursework) => {
        axios.post('http://localhost:8080/staff/postCoursework', coursework)
            .then(response => {
                init()
                setEditingCoursework(null);
                setAddCoursework(false);
            })
            .catch(error => {
                console.error('Error saving coursework:', error);
            });
    }

    // Function to handle editing a coursework
    const handleEditCoursework = (coursework) => {
        setEditingCoursework(coursework);
    }

    // Function to handle canceling the edit or add coursework action
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
                        <h2 className='gFont'>All Coursework</h2>
                        <p className="description">You can post assignments and view all published assignments here</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-top'>
                        <TextField label="Search" variant="outlined" size="small" />
                        <Button variant="contained" className="searchButton">Search</Button>
                        <Button
                            variant="contained"
                            className="addButton"
                            onClick={() => setAddCoursework(true)}
                        >
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
                        <CourseworkForm
                            coursework={null}
                            modules={defaultModules}
                            onSubmit={handleAddSaveCoursework}
                            onCancel={handleCancelEdit}
                        />
                    </DialogContent>
                </Dialog>

                <Dialog open={editingCoursework !== null} onClose={handleCancelEdit}>
                    <DialogTitle>Edit Coursework</DialogTitle>
                    <DialogContent>
                        {editingCoursework && (
                            <CourseworkForm
                                coursework={editingCoursework}
                                modules={defaultModules}
                                onSubmit={handleEditSaveCoursework}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default StaffCoursework;
