/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alertas } from '../../components/Alertas/Alertas';
import InputAdornmentComponent from '../../components/Complements/InputAdornmentComponent';

export const CardAltaMaquina = ({
  casino,
  fechaInicial,
  fechaFinal,
  setFechaInicial,
  setFechaFinal,
  modelo,
  nomaquinas,
}) => {
  const axios = require('axios');
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [salas, setSalas] = useState();
  const [editableMovement, setEditableMovement] = useState(false);
  const [repeatedMovement, setRepeatedMovement] = useState(undefined);
  const [value, setValue] = useState({});
  const [reload, setReload] = useState(0);
  const [state, setState] = React.useState({
    editable: false,
  });

  const handleChangeSwitch = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleReset = () => {
    setValue({});
    setFechaInicial(null);
    setFechaFinal(null);
  };
  useEffect(() => {
    if (
      fechaInicial !== undefined &&
      fechaFinal !== undefined &&
      fechaInicial !== 'undefined-undefined-undefined' &&
      fechaFinal !== 'undefined-undefined-undefined'
    ) {
      axios
        .get(
          `https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetMovementByDateAndCasino`,
          {
            params: {
              casino: casino.name,
              model: modelo.name,
              start: fechaInicial,
              end: fechaFinal,
            },
          },
        )
        .then(function (response) {
          console.log('asd', response);
          if (response.status === 202) {
            setOpenAlert(true);
            setType('warning');
            setMessage('Semana ya capturada');
            setEditableMovement(true);
            setRepeatedMovement(response.data);
            setValue(response.data);
            setState({ editable: false });
          } else if (response.status === 204) {
            setState({ editable: true });
            setEditableMovement(false);
            setRepeatedMovement(undefined);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // getDataRangeOfDates(fechaInicial, fechaFinal, modelo).then((data) => {
      //   if (data) {
      //     setOpenAlert(true);
      //     setType('warning');
      //     setMessage('Semana ya capturada');
      //     setEditableMovement(true);
      //     setRepeatedMovement(data);
      //     setValue(data);
      //     setState({ editable: false });
      //   } else {
      //     setState({ editable: true });
      //     setEditableMovement(false);
      //     setRepeatedMovement(undefined);
      //   }
      // });
    }
  }, [fechaInicial, fechaFinal]);

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleCloseAlert = () => setOpenAlert(false);

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
  }, [reload]);

  let mes1 = parseInt(fechaFinal.split('-')[1]);

  const handleOperations = () => {
    if (Object.entries(value).length !== 0) {
      setValue({
        ...value,
        casino: casino.name,
        modelo: modelo.model,
        fechaInicial: fechaInicial,
        fechaFinal: fechaFinal,
        dia: parseInt(fechaFinal.substring(7, 9)),
        mes: mes1,
        year: fechaFinal.substring(0, 4),
        numero: parseInt(modelo.numero),
        retorno: (value.netwin * 100) / value.coinIn,
        participacion: parseInt(modelo.participacion),
      });
      setReload((oldR) => oldR + 1);
    }
  };
  useEffect(() => {
    if (Object.entries(value).length !== 0) {
      handleUpload();
    }
  }, [reload]);

  const handleUpload = () => {
    if (
      Object.entries(value).length > 3 &&
      fechaInicial !== undefined &&
      fechaInicial !== undefined
    ) {
      console.log(value);
      axios
        .post(
          'https://billbalanceapif.azurewebsites.net/api/SlotMachine/AddMachineMovement',
          {
            coinIn: parseInt(value.coinIn),
            coinOut: parseInt(value.coinOut),
            dia: parseInt(value.dia),
            fechaFinal: value.fechaFinal,
            fechaInicial: value.fechaInicial,
            netwin: parseInt(value.netwin),
            participacion: parseInt(value.participacion),
            retorno: parseInt(value.retorno),
            modelo: value.modelo,
            casino: value.casino,
            numero: parseInt(value.numero),
          },
        )
        .then(function (response) {
          if (response.status === 200) {
            setOpenAlert(true);
            setType('success');
            setMessage('Día dado de alta correctamente');
            handleReset();
          }
          if (response.status === 400) {
            setOpenAlert(true);
            setType('error');
            setMessage('Error al dar de alta el día');
            handleReset();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    handleReset();
  }, [modelo]);

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
        {casino !== undefined &&
          fechaInicial !== 'undefined-undefined-undefined' &&
          fechaFinal !== 'undefined-undefined-undefined' && (
            <Card sx={{ width: 800, height: 440 }}>
              <CardHeader title='Alta de máquinas' />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <>
                    <Grid item xs={6}>
                      {modelo !== undefined && (
                        <TextField
                          width={200}
                          disabled={true}
                          label='No. Máquinas'
                          name='numero'
                          required
                          value={modelo.numero}
                          variant='outlined'
                        />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <InputAdornmentComponent
                        disabled={state.editable ? false : true}
                        required
                        width={6 / 10}
                        label='Coin In'
                        values={value}
                        onChange={handleChange('coinIn')}
                        type={'coinIn'}
                        placeHolder='0'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputAdornmentComponent
                        disabled={state.editable ? false : true}
                        width={6 / 10}
                        label='Coin Out'
                        values={value}
                        onChange={handleChange('coinOut')}
                        type={'coinOut'}
                        placeHolder='0'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputAdornmentComponent
                        disabled={state.editable ? false : true}
                        required
                        width={6 / 10}
                        label='NetWin'
                        values={value}
                        onChange={handleChange('netwin')}
                        type={'netwin'}
                        placeHolder='0'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        width={200}
                        disabled={true}
                        label='% de retorno'
                        name='retorno'
                        required
                        value={(value.netwin * 100) / value.coinIn}
                        onChange={handleChange('retorno')}
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        width={200}
                        disabled={true}
                        label='% Participación'
                        name='participacion'
                        required
                        value={modelo.participacion}
                        onChange={handleChange('participacion')}
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputAdornmentComponent
                        disabled={state.editable ? false : true}
                        width={6 / 10}
                        label='Dinero promoción'
                        values={value}
                        onChange={handleChange('dineropromocion')}
                        type={'dineropromocion'}
                        placeHolder='0'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        width={200}
                        disabled={true}
                        label='Total a facturar promedio'
                        name='totalfacturarpromedio'
                        required
                        value={
                          (value.netwin * parseInt(modelo.participacion)) /
                          value.dineropromocion
                        }
                        onChange={handleChange('totalfacturarpromedio')}
                        variant='outlined'
                      />
                    </Grid>
                  </>
                </Grid>
              </CardContent>

              <Divider />

              <Box
                sx={{
                  p: 2,
                }}
              >
                {editableMovement && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.editable}
                        onChange={handleChangeSwitch}
                        name='editable'
                      />
                    }
                    label='Editable'
                  />
                )}
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleOperations}
                  disabled={state.editable ? false : true}
                >
                  {editableMovement ? 'Editar' : 'Agregar'}
                </Button>
              </Box>
            </Card>
          )}
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
