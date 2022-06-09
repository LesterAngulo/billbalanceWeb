/* eslint-disable react-hooks/rules-of-hooks */
import DatePicker from '@mui/lab/DatePicker';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { Alertas } from '../../components/Alertas/Alertas';
import InputAdornmentComponent from '../../components/Complements/InputAdornmentComponent';
import { useDatePicker } from '../../components/hooks/useDatePicker';
import { SelectComponent } from '../../components/Select/SelectComponent';

export const MovimientosDiariosIdoctor = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [salas, setSalas] = useState();
  const [casino, setCasino] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const handleCloseAlert = () => setOpenAlert(false);
  const [date, setDate] = useState(null);
  const [Reload, setReload] = useState(0);
  const [values, setValues] = useState({});
  const [editableMovement, setEditableMovement] = useState(false);
  const [repeatedMovement, setRepeatedMovement] = useState(undefined);
  let [formattedDate] = useDatePicker(date);
  let mes1 = parseInt(formattedDate.split('-')[1]);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleReset = () => {
    setDate(null);
    setValues({});
  };

  const handleDatePicker = (newValue) => {
    let FinalDate = newValue.toISOString().substring(0, 10);
    setDate(newValue);
    setValues({
      ...values,
      dia: newValue.toISOString().substring(0, 10),
      mes: mes1,
    });

    // getDataByDay(FinalDate).then((data) => {
    //   if (data) {
    //     setOpenAlert(true);
    //     setType('warning');
    //     setMessage('Día ocupado por movimiento');
    //     setEditableMovement(true);
    //     setRepeatedMovement(data);
    //   } else {
    //     setValues({
    //       dia: newValue.toISOString().substring(0, 10),
    //       mes: mes1,
    //     });

    //     setEditableMovement(false);

    //     setRepeatedMovement(undefined);
    //   }
    // });
  };

  const handleOperations = () => {
    if (Object.entries(values).length !== 0) {
      let gasto = parseInt(values.gasto);
      let interes = parseInt(values.interes);
      let utilVenta = parseInt(values.utilidadVenta);
      setValues({
        ...values,
        utilBruta: interes + utilVenta,
        utilNeta: interes + utilVenta - gasto,
        casino: casino.name,
      });
      setReload((oldR) => oldR + 1);
    }
  };

  const handleSubmit = () => {
    if (Object.entries(values).length > 3 && date !== null) {
      let FinalDate = date.toISOString().substring(0, 10);
      // addData(values, FinalDate, 'Data');
      // addIndicators(values, date);
      setOpenAlert(true);
      setType('success');
      setMessage('Día dado de alta correctamente');
      handleReset();
    } else {
      setOpenAlert(true);
      setType('error');
      setMessage('Error al dar de alta el día');
    }
  };
  useEffect(() => {
    if (Object.entries(values).length !== 0) {
      handleSubmit();
    }
  }, [Reload]);

  useEffect(() => {
    axios
      .get('https://billbalanceapif.azurewebsites.net/api/Branch/GetBranches', {
        params: {
          type: 'Sucursal',
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
    setCasino(e.target.value);
  };
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - Movimientos Diarios</title>
      </Helmet>
      <Container
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            width: 900,
            textAlign: 'center',
            position: 'absolute',
          }}
          sx={{ boxShadow: 9 }}
        >
          {salas !== undefined && salas.length > 0 ? (
            <CardContent sx={{ p: 5 }}>
              <Typography sx={{ m: 3, mb: 4 }} variant='h4'>
                Movimientos Diarios
              </Typography>
              {/* <AccountCircleIcon sx={{ fontSize: 50 }} color='info' /> */}

              <Grid
                container
                spacing={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={6}>
                  {salas !== undefined && (
                    <SelectComponent
                      data={salas}
                      handleSelected={handleSelect}
                      label='Sala'
                      withId='name'
                      propName='casino'
                      Width={400}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {casino !== undefined && (
                    <DatePicker
                      label='Fecha de Movimiento'
                      value={date}
                      onChange={handleDatePicker}
                      type={'dia'}
                      renderInput={(params) => (
                        <TextField
                          sx={{ mb: 2, width: 400 }}
                          autoFocus
                          required
                          {...params}
                        />
                      )}
                    />
                  )}
                </Grid>
                {date !== null && (
                  <>
                    <Grid item xs={4}>
                      <InputAdornmentComponent
                        disabled={repeatedMovement ? true : false}
                        width={1}
                        label='Monto'
                        values={repeatedMovement ? repeatedMovement : values}
                        onChange={handleChange('monto')}
                        type={'monto'}
                        placeHolder='0'
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <InputAdornmentComponent
                        disabled={repeatedMovement ? true : false}
                        required
                        width={1}
                        label='Descripción'
                        values={repeatedMovement ? repeatedMovement : values}
                        onChange={handleChange('descripcion')}
                        type={'descripcion'}
                        placeHolder='0'
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        sx={{ mt: 1 }}
                        disabled={!values.dia}
                        variant='outlined'
                        onClick={handleOperations}
                      >
                        {editableMovement ? 'Editar' : 'Agregar'}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>No hay data para mostrar</h1>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h5>
                  Favor de registrar datos en la pestaña de movimientos diarios
                </h5>
              </div>
            </>
          )}
        </Card>
      </Container>
      <Alertas
        Message={Message}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        type={type}
      />
    </div>
  );
};
