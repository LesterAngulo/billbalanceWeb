import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Alertas } from '../../../components/Alertas/Alertas';
import { addSala } from '../../../configuration/firebase/Methods/Methods';

export const CardAltaSucursal = ({
  value,
  handleChange,
  setValue,
  setReload,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const handleCloseAlert = () => setOpenAlert(false);
  const handleUpload = () => {
    if (value.name === '') {
      setMessage('Favor de ingresar un nombre a la sucursal');
      setType('error');
      setOpenAlert(true);
    } else {
      addSala(value, 'Salas').then((data) => {
        if (data === false) {
          setMessage('Favor de ingresar una sucursal no dada de alta');
          setType('error');
          setOpenAlert(true);
        } else {
          setMessage('Sucursal dada de alta correctamente');
          setType('success');
          setReload((oldR) => oldR + 1);

          setValue({ name: '' });
          setOpenAlert(true);
        }
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 1,
      }}
    >
      <form autoComplete='off' noValidate>
        <Card sx={{ width: 400, height: 250 }}>
          <CardHeader title='Alta de Salas' />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Sucursal'
                  name='name'
                  onChange={handleChange}
                  required
                  value={value.name}
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
            <Button color='primary' variant='contained' onClick={handleUpload}>
              Guardar
            </Button>
          </Box>
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
