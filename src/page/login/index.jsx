import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { loginRequest } from '../../api';
import './index.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginRequest(id, password);
      console.log('Login successful:', response.data);
      login(response.data.studentId, response.data.staffId);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      className="login"
      sx={{
        height: {
          xs: '100vh', // 在超小屏幕上（手机）高度为视口的50%
          sm: '75vh', // 在小屏幕上（平板）高度为视口的75%
          md: '100vh', // 在中屏幕上（小型笔记本）和更大尺寸上高度为视口的100%

        },
      }}>


      <Container component="main" className="login-container">
        <Grid container spacing={0} className="login-grid">
          <Grid item xs={12} sm={6}>
            {/* 在这里放置图片 */}
            <Box
              className='login-box'
              sx={{
                height:
                {
                  md: 440,
                  xs: 310
                }, // 根据需要调整高度
                width: {
                  md: '100%',
                  xs: '105%'
                },

              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* 登录表单 */}
            <Paper elevation={0} sx={{
              padding: (theme) => theme.spacing(3), display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 0,
              width: {
                xs: '90%',   // 小屏幕宽度100%
                sm: 600,      // 中屏幕宽度600px
                md: 450,      // 大屏幕宽度400px
              },
              minHeight: 300, // 最小高度为300px 

            }}>

              <Typography component="h1" variant="h3" fontWeight="fontWeightBold" >
                Dyson
              </Typography>
              <Box component="form" noValidate sx={{ mt: 5 }}>
                {/* ... 表单输入 ... */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  name="id"
                  autoComplete="id"
                  autoFocus
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
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember Me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="login-button"
                  sx={{ mt: 5, mb: 2,  }}
                >
                  Log In
                </Button>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>

  );
}

export default Login