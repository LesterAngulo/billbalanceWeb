import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { Alertas } from '../../components/Alertas/Alertas';
import ConfigParticles from '../../components/ConfigParticles/ConfigParticles';
export const LogIn = () => {
  const axios = require('axios');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('https://billbalanceapif.azurewebsites.net/api/User/Login', {
        userName: user.email,
        password: user.password,
      })
      .then(function (response) {
        if (user.email === '' && user.password === '') {
          return setOpenAlert(true);
        }
        localStorage.setItem('role', response.data.role);
        navigate('/inicio');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#f6f6f6',
      }}
    >
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - LogIn</title>
      </Helmet>
      <div style={{ position: 'absolute' }}>
        <Particles height='100vh' width='100vw' params={ConfigParticles} />
      </div>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            width: 350,
            height: 350,
            textAlign: 'center',
            position: 'absolute',
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <AccountCircleIcon sx={{ fontSize: 50 }} color='info' />
            <form onSubmit={handleSubmit}>
              <Grid container sx={{ pt: 2.5 }}>
                <Grid item xs={12}>
                  <TextField
                    id='outlined-basic'
                    label='Email'
                    name='email'
                    variant='outlined'
                    value={user.email}
                    onChange={handleChange}
                  />
                </Grid>
                <br />
                <br />
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      name='password'
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      value={user.password}
                      onChange={handleChange}
                      label='Password'
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <br />

              <Button type='submit' variant='contained'>
                LogIn
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Alertas
        Message={'Errror al iniciar sesion compruebe credenciales'}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        type={'error'}
      />
    </div>
  );
};
