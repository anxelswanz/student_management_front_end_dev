/**
 * Component Name: Login
 * Description: The page of Login.
 * Author: Qianfeng Zhang
 * Created Date: 2024-04-24
 * Modified By: Ronghui Zhong
 * Last Modified: 2024-05-01
 */

import React, { useState } from "react";
import { Box, Paper, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { loginRequest } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import Login_register from "../../component/login_register/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss"

// Define a React component with login functionality
export default function Login() {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [id, setId] = useState(''); // State for storing the user ID input
  const [password, setPassword] = useState(''); // State for storing the user password input

  // Function to handle the login form submission
  const handleSubmit = async () => {
    let error = false; 

    // Define allowed character rules, e.g., letters, numbers, and some special characters
    const validRegex = /^[a-zA-Z0-9_.-]*$/;

    
    if (!id.trim()) {
      toast.error("ID cannot be empty."); 
      error = true; 
    } else if (!validRegex.test(id)) {
      toast.error("ID contains invalid characters."); 
      error = true; 
    }

    
    if (!password.trim()) {
      toast.error("Password cannot be empty."); 
      error = true; 
    } else if (!validRegex.test(password)) {
      toast.error("Password contains invalid characters."); 
      error = true; 
    }

  
    if (error) {
      return;
    }

  
  try {
    const response = await loginRequest(id, password); 
    if (response.data.code === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.obj)); 

      // Check the first character of ID and navigate accordingly
      if (id.startsWith('S')) {
        navigate("/programme"); // Navigate to the programme page if ID starts with 'S'
      } else if (id.startsWith('E')) {
        navigate("/AllTimetable"); // Navigate to the staff management page if ID starts with 'E'
      } else {
        
        toast.error("Login failed: Invalid user type."); 
      }
    } else {
      toast.error("Login failed: Invalid ID or password."); 
    }
  } catch (error) {
    console.error('Login failed:', error); 
    toast.error("Login request failed: Please check your network connection or contact support."); 
  }
};
  
  return (
    <Login_register bgimg={require("../../assets/login.jpg")}>
      <ToastContainer /> 
      <div className={'form'}>
        <Paper elevation={0} sx={{
          padding: (theme) => theme.spacing(3), display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 0,
          height: 459
        }}>
          <div className="title">Dyson</div>
          <Box component="form" noValidate sx={{ mt: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="id"
              autoComplete="id"
              autoFocus
              onChange={(e) => setId(e.target.value)} // Update state when user types in the ID field
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} // Update state when user types in the password field
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me" // Checkbox for users to choose to be remembered
            />
            <Button
              fullWidth
              variant="contained"
              className="login-button"
              sx={{ mt: 5, mb: 2 }}
              onClick={handleSubmit} // Button to submit the form
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </div>
    </Login_register>
  );

}