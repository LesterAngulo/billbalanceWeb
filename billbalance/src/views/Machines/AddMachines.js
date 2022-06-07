import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alertas } from '../../components/Alertas/Alertas';
import { SelectComponent } from '../../components/Select/SelectComponent';

export const AddMachines = ({ value, handleChange, setValue, setReload }) => {
  const axios = require('axios');
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const handleCloseAlert = () => setOpenAlert(false);
  const [salas, setSalas] = useState();
  const [casino, setCasino] = useState();

  useEffect(() => {
    axios
      .get('https://billbalanceapif.azurewebsites.net/api/Branch/GetBranches', {
        params: {
          type: 'Casino',
        },
      })
      .then(function (response) {
        let data = response.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setSalas(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSelect = (e) => {
    setCasino(e.target.value.name);
    setValue({ ...value, casino: e.target.value.name });
  };

  const handleReset = () => {
    setValue({
      casino: casino,
      name: '',
      model: '',
      numero: '',
      porcentajeParticipacion: '',
    });
  };

  const handleUpload = () => {
    console.log(value);
    if (value.name === '') {
      setMessage('Favor de ingresar un nombre a la sala');
      setType('error');
      setOpenAlert(true);
    } else {
      axios
        .post(
          'https://billbalanceapif.azurewebsites.net/api/SlotMachine/AddMachine',
          {
            casino: value.casino,
            model: value.model,
            name: value.name,
            numero: value.numero,
            porcentajeParticipacion: parseInt(value.porcentajeParticipacion),
          },
        )
        .then(function (response) {
          if (response.status === 200) {
            setMessage('Maquina dada de alta correctamente');
            setType('success');
            setOpenAlert(true);
            setReload((oldR) => oldR + 1);
            setValue({ name: '' });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <form autoComplete='off' noValidate>
        <Card sx={{ width: 400, height: 430 }}>
          {salas !== undefined && salas.length > 0 ? (
            <>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <SelectComponent
                      data={salas}
                      val={casino}
                      handleSelected={handleSelect}
                      label='Sala'
                      withId='name'
                      propName='salas'
                      Width={300}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Máquina'
                      name='name'
                      onChange={handleChange('name')}
                      required
                      value={value.name}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Modelo'
                      name='model'
                      onChange={handleChange('model')}
                      required
                      value={value.model}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Numero de maquinas'
                      name='numero'
                      onChange={handleChange('numero')}
                      required
                      type='number'
                      value={value.numero}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='% Participación'
                      name='porcentajeParticipacion'
                      onChange={handleChange('porcentajeParticipacion')}
                      type='number'
                      required
                      value={value.porcentajeParticipacion}
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  p: 2,
                }}
              >
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleUpload}
                >
                  Guardar
                </Button>
              </Box>
            </>
          ) : (
            <>
              <h1>No hay datos para mostrar</h1>
              <h5>Favor de registrar sucursales para poder continuar</h5>
            </>
          )}
        </Card>
      </form>

      {openAlert && (
        <Alertas
          Message={message}
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          type={type}
        />
      )}
    </Box>
  );
};
