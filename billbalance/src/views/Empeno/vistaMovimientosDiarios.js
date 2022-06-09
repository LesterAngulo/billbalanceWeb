/* eslint-disable react-hooks/rules-of-hooks */
import DatePicker from '@mui/lab/DatePicker';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Grid,
  Switch,
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

export const MovimientosDiarios = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'contador' && roles !== 'captura') {
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
  const [reloadForEdit, setReloadForEdit] = useState(0);
  const [values, setValues] = useState({});
  const [editableMovement, setEditableMovement] = useState(false);
  const [repeatedMovement, setRepeatedMovement] = useState(undefined);
  let [formattedDate] = useDatePicker(date);
  const [state, setState] = React.useState({
    editable: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeSwitch = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleReset = () => {
    setDate(null);
    setValues({});
  };

  useEffect(() => {
    if (
      formattedDate !== null &&
      casino !== undefined &&
      formattedDate !== 'undefined-undefined-undefined'
    ) {
      axios
        .get(
          `https://billbalanceapif.azurewebsites.net/api/PawnShop/GetMovementsByBranchNameAndDate`,
          {
            params: {
              date: formattedDate,
              branch: casino,
            },
          },
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setOpenAlert(true);
            setType('warning');
            setMessage('Día ocupado por movimiento');
            setEditableMovement(true);
            setRepeatedMovement(response.data);
            setValues(response.data);
            setState({ editable: false });
          } else if (response.status === 204) {
            setValues({
              fecha: formattedDate,
              dia: parseInt(formattedDate.substring(7, 9)),
              año: parseInt(formattedDate.substring(0, 4)),
              mes: parseInt(formattedDate.split('-')[1]),
            });
            setState({ editable: true });
            setEditableMovement(false);
            setRepeatedMovement(undefined);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [formattedDate]);

  const handleOperations = () => {
    if (editableMovement) {
      if (Object.entries(values).length !== 0) {
        let gasto = values.gasto;
        let interes = values.interes;
        let utilVenta = values.utilidadVenta;
        setValues({
          ...values,
          utilBruta: interes + utilVenta,
          utilNeta: interes + utilVenta - gasto,
          total: interes + utilVenta,
          casino: casino,
        });
        setReloadForEdit((oldR) => oldR + 1);
      }
    } else {
      if (Object.entries(values).length !== 0) {
        let gasto = values.gasto;
        let interes = values.interes;
        let utilVenta = values.utilidadVenta;
        setValues({
          ...values,
          utilBruta: interes + utilVenta,
          utilNeta: interes + utilVenta - gasto,
          total: interes + utilVenta,
          casino: casino,
        });
        setReload((oldR) => oldR + 1);
      }
    }
  };

  const handleSubmit = () => {
    if (Object.entries(values).length > 3 && date !== null) {
      axios
        .post(
          'https://billbalanceapif.azurewebsites.net/api/PawnShop/AddPawnShopMovement',
          {
            costoVenta: parseInt(values.costoVenta),
            desempeño: parseInt(values.desempeño),
            dia: parseInt(values.dia),
            empeño: parseInt(values.empeño),
            fecha: values.fecha,
            gasto: parseInt(values.gasto),
            interes: parseInt(values.interes),
            inventario: parseInt(values.inventario),
            referendo: parseInt(values.referendo),
            utilidadVenta: parseInt(values.utilidadVenta),
            sucursal: casino,
            año: parseInt(values.año),
          },
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setMessage(' dada de alta correctamente');
            setType('success');
            setReload((oldR) => oldR + 1);
            setValues({});
            handleReset();
          }
          if (response.status === 400) {
            setMessage('error al realizar alta');
            setType('error');
            setReload((oldR) => oldR + 1);
            setValues({});
            handleReset();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
    }
  };

  const handleEdit = () => {
    if (Object.entries(values).length > 3 && date !== null) {
      axios
        .post(
          'https://billbalanceapif.azurewebsites.net/api/PawnShop/EditPawnShopMovement',
          {
            id: parseInt(values.id),
            costoVenta: parseInt(values.costoVenta),
            desempeño: parseInt(values.desempeño),
            dia: parseInt(values.dia),
            empeño: parseInt(values.empeño),
            fecha: values.fecha,
            gasto: parseInt(values.gasto),
            interes: parseInt(values.interes),
            inventario: parseInt(values.inventario),
            referendo: parseInt(values.referendo),
            utilidadVenta: parseInt(values.utilidadVenta),
            sucursal: casino,
            año: parseInt(values.año),
          },
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setMessage('Día editado correctamente');
            setType('success');
            setReload((oldR) => oldR + 1);
            setValues({});
            handleReset();
          }
          if (response.status === 400) {
            setMessage('error al realizar edición');
            setType('error');
            setReload((oldR) => oldR + 1);
            setValues({});
            handleReset();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
    }
  };

  useEffect(() => {
    if (Object.entries(values).length !== 0) {
      handleSubmit();
    }
  }, [Reload]);

  useEffect(() => {
    if (Object.entries(values).length !== 0) {
      handleEdit();
    }
  }, [reloadForEdit]);

  useEffect(() => {
    axios
      .get('https://billbalanceapif.azurewebsites.net/api/Branch/GetBranches', {
        params: {
          type: 'Empeño',
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
              <form
                autoComplete='off'
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOperations();
                }}
              >
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
                    {salas !== undefined && salas.length > 0 && (
                      <SelectComponent
                        data={salas}
                        handleSelected={handleSelect}
                        label='Sucursal'
                        withId='name'
                        propName='sucursal'
                        Width={400}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {casino !== undefined && (
                      <DatePicker
                        label='Fecha de Movimiento'
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
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
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={6 / 10}
                          label='Interes'
                          values={values}
                          onChange={handleChange('interes')}
                          type={'interes'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          required
                          width={6 / 10}
                          label='Inventario'
                          values={values}
                          onChange={handleChange('inventario')}
                          type={'inventario'}
                          placeHolder='0'
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={6 / 10}
                          label='P Costo Venta'
                          values={values}
                          onChange={handleChange('costoVenta')}
                          type={'costoVenta'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          required
                          width={6 / 10}
                          label='Empeño'
                          values={values}
                          onChange={handleChange('empeño')}
                          type={'empeño'}
                          placeHolder='0'
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={6 / 10}
                          label='Utilidad de Venta'
                          values={values}
                          onChange={handleChange('utilidadVenta')}
                          type={'utilidadVenta'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          required
                          width={6 / 10}
                          label='Refrendo'
                          values={values}
                          onChange={handleChange('referendo')}
                          type={'referendo'}
                          placeHolder='0'
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          label='Gasto'
                          values={values}
                          width={6 / 10}
                          onChange={handleChange('gasto')}
                          type={'gasto'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={6 / 10}
                          label='Desempeño'
                          values={values}
                          onChange={handleChange('desempeño')}
                          type={'desempeño'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      {editableMovement && (
                        <Grid item sx={{ mt: 1 }} xs={6}>
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
                        </Grid>
                      )}

                      <Grid item sx={{ mt: 1 }} xs={editableMovement ? 6 : 12}>
                        <Button
                          disabled={!values.dia}
                          variant='outlined'
                          type='submit'
                        >
                          {editableMovement ? 'Editar' : 'Agregar'}
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </form>
            </CardContent>
          ) : (
            <>
              <h1>No hay data para mostrar</h1>
              <h5>Favor de registrar sucursales en la pestaña de empeño</h5>
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
