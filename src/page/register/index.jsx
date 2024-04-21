import React, { useState } from "react";
import axios from 'axios';
import { Box, Container, Tabs, Tab, Paper, Grid, Typography, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { registerRequest } from '../../api';
import './index.css';

const Register = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        surname: '',
        firstName: '',
        email: '',
        studentType: '', // 0: Undergraduate, 1: Postgraduate
        programmeId: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = activeTab === 0
            ? 'http://localhost:8080/api/user/registerStudent'
            : 'http://localhost:8080/api/user/registerEmp';

        try {
            const response = await registerRequest(url, formData);
            // 设置成功状态消息
            setResponseMessage(`注册成功: 状态码 ${response.status}`);
        } catch (error) {
            // 设置失败状态消息
            const statusCode = error.response ? error.response.status : 500;
            setResponseMessage(`注册失败: 状态码 ${statusCode}`);
        }
    };

    return (
        <Box
            className='register'
        >


            <Container component="main" maxWidth="xs" className="grid">
                <Grid container spacing={0} className="grid">

                    <Paper className="paper" elevation={1} sx={{
                        width: {
                            xs: '90%',   // 小屏幕宽度100%
                            sm: 600,      // 中屏幕宽度600px
                            md: 400,      // 大屏幕宽度400px
                        }
                    }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered>
                            <Tab label=" Student " />
                            <Tab label="Staff" />
                        </Tabs>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="surname"
                                label="surname"
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
                                label="firstName"
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
                                    label="studentType"
                                    name="studentType"
                                    value={formData.studentType}
                                    onChange={handleChange}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {activeTab === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="programmeId"
                                    label="programmeId"
                                    name="programmeId"
                                    value={formData.programmeId}
                                    onChange={handleChange}
                                />
                            )}

                            <Button
                            className="button"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2,  }}
                            >
                                register
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

            </Container>
        </Box>
    );
}

export default Register