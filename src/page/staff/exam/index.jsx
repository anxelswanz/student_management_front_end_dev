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
import './exam.css';
import '../header.css';

const ExamForm = ({exam, modules, onSubmit, onCancel}) => {
    const [moduleId, setModuleId] = useState(exam?.moduleId ?? '');
    const [examName, setExamName] = useState(exam?.examName ?? '');
    const [examDate, setExamDate] = useState(exam?.examDate ?? '');
    const [examSite, setExamSite] = useState(exam?.examSite ?? '');
    const [examStartTime, setExamStartTime] = useState(exam?.examStartTime ?? '');
    const [examEndTime, setExamEndTime] = useState(exam?.examEndTime ?? '');
    const [examDuration, setExamDuration] = useState(exam?.examDuration ?? '');
    const [examDescription, setExamDescription] = useState(exam?.examDescription ?? '');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            ...exam,
            moduleId,
            examName,
            examDate,
            examSite,
            examStartTime,
            examEndTime,
            examDuration,
            examDescription
        });
    };

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
            <InputLabel id="exam-name-label">Exam Name</InputLabel>
            <TextField
                labelId="exam-name-label"
                value={examName}
                onChange={(event) => setExamName(event.target.value)}
                fullWidth
            />
            <InputLabel id="exam-date-label">Exam Date</InputLabel>
            <TextField
                labelId="exam-date-label"
                type="date"
                value={examDate}
                onChange={(event) => setExamDate(event.target.value)}
                fullWidth
            />
            <InputLabel id="exam-site-label">Exam Site</InputLabel>
            <TextField
                labelId="exam-site-label"
                value={examSite}
                onChange={(event) => setExamSite(event.target.value)}
                fullWidth
            />
            <InputLabel id="exam-start-time-label">Exam Start Time</InputLabel>
            <TextField
                labelId="exam-start-time-label"
                type="time"
                value={examStartTime}
                onChange={(event) => setExamStartTime(event.target.value)}
                fullWidth
            />
            <InputLabel id="exam-end-time-label">Exam End Time</InputLabel>
            <TextField
                labelId="exam-end-time-label"
                type="time"
                value={examEndTime}
                onChange={(event) => setExamEndTime(event.target.value)}
                fullWidth
            />
            <InputLabel id="exam-duration-label">Exam Duration</InputLabel>
            <TextField
                labelId="exam-duration-label"
                type="number"
                value={examDuration}
                onChange={(event) => setExamDuration(event.target.value)}
                fullWidth
            />
            <InputLabel id="exam-description-label">Exam Description</InputLabel>
            <TextField
                labelId="exam-description-label"
                value={examDescription}
                onChange={(event) => setExamDescription(event.target.value)}
                fullWidth
            />
            <DialogActions>
                <Button type="submit">Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </form>
    );
};

function StaffExam() {
    const [modules, setModules] = useState([]);
    const [exams, setExams] = useState([]);
    const [editingExam, setEditingExam] = useState(null);
    const [addExam, setAddExam] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('http://localhost:8080/module')
    //         .then(response => {
    //             setModules(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching modules:', error);
    //         });
    //     axios.get('http://localhost:8080/exam')
    //         .then(response => {
    //             setExams(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching exams:', error);
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

    const handleAddSaveExam = (exam) => {
        // axios.post('http://localhost:8080/exam', exam)
        //     .then(response => {
        //         setExams(prevExams => [...prevExams, response.data]);
        //         setEditingExam(null);
        //     })
        //     .catch(error => {
        //         console.error('Error saving exam:', error);
        //     });
        setAddExam(false);
        exam.id = exams.length + 1;
        setExams(prevExams => [...prevExams, exam]);
        exam.moduleName = defaultModules.find(module => module.id === exam.moduleId).name;


    };

    const handleEditSaveExam = (exam) => {
        // axios.put('http://localhost:8080/exam', exam)
        //     .then(response => {
        //         setExams(prevExams => prevExams.map(e => e.id === exam.id ? response.data : e));
        //         setEditingExam(null);
        //     })
        //     .catch(error => {
        //         console.error('Error saving exam:', error);
        //     });

        exam.moduleName = defaultModules.find(module => module.id === exam.moduleId).name;
        setExams(prevExams => prevExams.map(e => e.id === exam.id ? exam : e));


        setEditingExam(null);
    };

    const handleEditExam = (exam) => {
        setEditingExam(exam);
    };

    const handleCancelEdit = () => {
        setEditingExam(null);
        setAddExam(false);
    };

    return (
        <div className='container' id='Header'>
            <div className='leftbox'>
                <LeftBar tabNav="StaffExam" />
            </div>
            <div className='maincenter'>
                <div className='topline'>
                    <div className='topMain'>
                        <h2 className='gFont'>All Exams</h2>
                        <p className="description">You can post exams and view all published exams here</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-top'>
                        <TextField label="Search" variant="outlined" size="small" />
                        <Button variant="contained" className="searchButton">Search</Button>
                        <Button
                            variant="contained"
                            className="addButton"
                            onClick={() => setAddExam(true)}
                        >
                            Release an Exam
                        </Button>
                    </div>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Module</TableCell>
                                    <TableCell>Exam Name</TableCell>
                                    <TableCell>Exam Date</TableCell>
                                    <TableCell>Exam Site</TableCell>
                                    <TableCell>Exam Start Time</TableCell>
                                    <TableCell>Exam End Time</TableCell>
                                    <TableCell>Exam Duration</TableCell>
                                    <TableCell>Exam Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exams.map((exam, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{exam.id}</TableCell>
                                        <TableCell>{exam.moduleName}</TableCell>
                                        <TableCell>{exam.examName}</TableCell>
                                        <TableCell>{exam.examDate}</TableCell>
                                        <TableCell>{exam.examSite}</TableCell>
                                        <TableCell>{exam.examStartTime}</TableCell>
                                        <TableCell>{exam.examEndTime}</TableCell>
                                        <TableCell>{exam.examDuration}</TableCell>
                                        <TableCell>{exam.examDescription}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEditExam(exam)}>Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <Dialog open={addExam} onClose={handleCancelEdit}>
                    <DialogTitle>Release Exam</DialogTitle>
                    <DialogContent>
                        <ExamForm
                            exam={null}
                            modules={defaultModules}
                            onSubmit={handleAddSaveExam}
                            onCancel={handleCancelEdit}
                        />
                    </DialogContent>
                </Dialog>

                <Dialog open={editingExam !== null} onClose={handleCancelEdit}>
                    <DialogTitle>Edit Exam</DialogTitle>
                    <DialogContent>
                        {editingExam && (
                            <ExamForm
                                exam={editingExam}
                                modules={defaultModules}
                                onSubmit={handleEditSaveExam}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default StaffExam;