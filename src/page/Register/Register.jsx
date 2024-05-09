/**
 * Component Name: Register
 * Description: The page of Register.
 * Author: Qianfeng Zhang
 * Created Date: 2024-04-27
 * Modified By: Ronghui Zhong
 * Last Modified: 2024-05-03
 */

import React, { useState } from "react";
import { Box, Tabs, Tab, Paper, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { registerRequest } from '../../api/api';
import Login_register from "../../component/login_register/index";
import SearchTags from "../../component/searchTags/index";
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd'; // Correctly Imported Input
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";

const { TextArea } = Input;

// Define a regular expression to allow letters, hyphens, spaces and apostrophes
const nameRegex = /^[a-zA-Z\s'-]+$/;



// The main component for user registration
const Register = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        surname: '',
        firstName: '',
        email: '',
        studentType: '', // 2: Undergraduate, 3: Postgraduate
        tags: [],
        background: ""
    });

   
    const setTags = (tags) => {
        setFormData({ ...formData, tags });
    }
    
    
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    
   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

   
    const handleChangeBG = (event) => {
        setFormData({ ...formData, background: event.target.value })
    }
    
    
    const validateSurname = () => {
        if (!formData.surname.trim()) {
            toast.error("Surname is required.");
            return false;
        }else if (!nameRegex.test(formData.surname)) {
            toast.error("Surname contains invalid characters.");
            return false;
        }
        return true;
    };
    
    const validateFirstName = () => {
        if (!formData.firstName.trim()) {
            toast.error("First Name is required.");
            return false;
        }else if (!nameRegex.test(formData.firstName)) {
            toast.error("First Name contains invalid characters.");
            return false;
        }
        return true;
    };
    
    const validateEmail = () => {
        if (!formData.email.includes('@')) {
            toast.error("Email must include '@'.");
            return false;
        }
        return true;
    };
    
    const validateStudentType = () => {
        if (activeTab === 0 && formData.studentType !== '2' && formData.studentType !== '3') {
            toast.error("Student type must be 2 or 3.");
            return false;
        }
        return true;
    };
    
    const validateBackground = () => {
        if (activeTab === 1 && !formData.background.trim()) {
            toast.error("Background information is required.");
            return false;
        }
        return true;
    };
    

    // Handles form submission with validation
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Perform field validation
        const isSurnameValid = validateSurname();
        const isFirstNameValid = validateFirstName();
        const isEmailValid = validateEmail();
        const isStudentTypeValid = validateStudentType();
        const isBackgroundValid = validateBackground();
    
        if (!isSurnameValid || !isFirstNameValid || !isEmailValid || !isStudentTypeValid || !isBackgroundValid) {
            return; // Stop the submission if any validation fails
        }
    
        // Form submission logic after validation
        const url = activeTab === 0
            ? 'http://localhost:3000/api/user/registerStudent'
            : 'http://localhost:3000/api/user/registerEmp';
    
        try {
            const response = await registerRequest(url, formData);
            if (response.data.code === 200) {
                navigate("/AllTimetable");
            } else {
                toast.error("Registration failed: Invalid data.");
            }
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(`Registration failed: Status code ${error.response ? error.response.status : 500}`);
        }
    };
    



    return (
        <Login_register bgimg={require("../../assets/reg.png")}>
            <ToastContainer />
            <div className={'form'} >
                <Paper className="paper" elevation={1} style={{ borderRadius: 0 }} >
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Student" />
                        <Tab label="Staff" />
                    </Tabs>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Surname"
                            label="Surname"
                            name="surname"
                            autoComplete="family-name"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {activeTab === 0 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="studentType"
                                label="Student Type: 2 for Undergraduate, 3 for Postgraduate"
                                name="studentType"
                                value={formData.studentType}
                                onChange={handleChange}
                            />
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {activeTab === 1 && (
                            <SearchTags setTags={setTags} />
                        )}
                        {activeTab === 1 && (
                            <TextArea
                                style={{ marginTop: "1rem" }}
                                placeholder="Background information"
                                autoSize={{ minRows: 2, maxRows: 8 }}
                                name="background"
                                onChange={handleChangeBG}
                                maxLength={300}
                            />
                        )}
                        <Button
                            className="button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, }}
                        >
                            Register
                        </Button>
                        <Button 
                        className="button"
                        variant="contained" 
                        fullWidth 
                        onClick={() => navigate("/AllTimetable")} 
                        sx={{ mt: 1 }}
                        >
                            Back
                        </Button>
                    </Box>
                </Paper>
            </div>
        </Login_register>
    );
}

export default Register;
