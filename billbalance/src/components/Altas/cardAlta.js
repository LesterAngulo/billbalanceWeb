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
import { Alertas } from '../Alertas/Alertas';
// import {
//   addSala,
//   addSucursalEmpeño,
//   addSucursalIDoctor,
// } from '../../configuration/firebase/Methods/Methods';

export const CardAlta = ({
  value,
  handleChange,
  setValue,
  setReload,
  title,
  type,
}) => {
  const axios = require('axios');
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [alertType, setAlertType] = useState();

  const handleCloseAlert = () => setOpenAlert(false);
  let props;

  if (type === 'Sucursal') {
    props = {
      CardTitle: 'Alta de sucursal',
      TextFieldTitle: 'Sucursal',
      EndPoint: 'SucursalesIDoctor',
      // UploadMethod: addSucursalIDoctor,
      typeBranch: 'Sucursal',
    };
  } else if (type === 'salacasino') {
    props = {
      CardTitle: 'Alta de Casino',
      TextFieldTitle: 'Casino',
      EndPoint: 'Salas',
      // UploadMethod: addSala,
      typeBranch: 'Casino',
    };
  } else if (type === 'empeño') {
    props = {
      CardTitle: 'Alta de Sucursales',
      TextFieldTitle: 'Sucursal',
      EndPoint: 'SucursalesEmepeño',
      // UploadMethod: addSucursalEmpeño,
      typeBranch: 'Empeño',
    };
  }

  const handleUploadCasino = () => {
    if (value.name === '') {
      setMessage('Favor de ingresar un nombre a la ' + props.TextFieldTitle);
      setAlertType('error');
      setOpenAlert(true);
    } else {
      axios
        .post('https://billbalanceapi.azurewebsites.net/api/Branch/AddBranch', {
          name: value.name,
          type: props.typeBranch,
        })
        .then(function (response) {
          if (response.status === 200) {
            setMessage(props.TextFieldTitle + ' dada de alta correctamente');
            setAlertType('success');
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
        m: 1,
      }}
    >
      <form autoComplete='off' noValidate>
        <Card sx={{ width: 400, height: 250 }}>
          <CardHeader title={props.CardTitle} />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={props.TextFieldTitle}
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
            <Button
              color='primary'
              variant='contained'
              onClick={handleUploadCasino}
            >
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
          type={alertType}
        />
      )}
    </Box>
  );
};
