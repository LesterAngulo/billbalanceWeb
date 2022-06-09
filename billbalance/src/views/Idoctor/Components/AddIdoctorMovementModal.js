import DatePicker from '@mui/lab/DatePicker';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Modal,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alertas } from '../../../components/Alertas/Alertas';
import InputAdornmentComponent from '../../../components/Complements/InputAdornmentComponent';
import { useDatePicker } from '../../../components/hooks/useDatePicker';
import { SelectComponent } from '../../../components/Select/SelectComponent';

export const AddIdoctorMovementModal = ({ open, closeAction }) => {
  const axios = require('axios');
  const [sucursales, setSucursales] = useState();
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
  const [checkedSwitch2, setCheckedSwitch2] = useState(false);

  const [state, setState] = React.useState({
    editable: false,
  });
  let [formattedDate] = useDatePicker(date);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (prop) => (event) => {
    if (prop === 'tipo') {
      setValues({ ...values, [prop]: event.target.checked });
      setCheckedSwitch2(event.target.checked);
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleReset = () => {
    setDate(null);
    setValues({});
  };
  const handleChangeSwitch = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (
      formattedDate !== null &&
      casino !== undefined &&
      formattedDate !== 'undefined-undefined-undefined'
    ) {
      axios
        .get(
          `https://billbalanceapif.azurewebsites.net/api/Idoctor/GetMovementsByDateRange`,
          {
            params: {
              start: formattedDate,
              end: formattedDate,
            },
          },
        )
        .then(function (response) {
          console.log(response);
          if (response.data.length !== 0) {
            setOpenAlert(true);
            setType('warning');
            setMessage('Día ocupado por movimiento');
            setEditableMovement(true);
            setRepeatedMovement(response.data);
            setValues(response.data);
            setCheckedSwitch2(response.data.tipo);
            setState({ editable: false });
            if (response.data.checked === false) setCheckedSwitch2(false);
            setCheckedSwitch2(true);
          } else {
            setValues({
              fecha: formattedDate,
              dia: parseInt(formattedDate.substring(7, 9)),
              año: parseInt(formattedDate.substring(0, 4)),
              casino: casino.name,
              tipo: checkedSwitch2,
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
      // getDataByDayIDoctor(formattedDate, casino.name).then((data) => {
      //   if (data) {
      //     setOpenAlert(true);
      //     setType('warning');
      //     setMessage('Día ocupado por movimiento');
      //     setEditableMovement(true);
      //     setRepeatedMovement(data);
      //     setValues(data);
      //     setCheckedSwitch2(data.tipo);
      //     setState({ editable: false });
      //     // if (data.checked === false) setCheckedSwitch2(false);
      //     // setCheckedSwitch2(true);
      //   } else {
      //     setValues({
      //       fecha: formattedDate,
      //       dia: parseInt(formattedDate.substring(7, 9)),
      //       año: parseInt(formattedDate.substring(0, 4)),
      //       casino: casino.name,
      //       tipo: checkedSwitch2,
      //       mes: parseInt(formattedDate.split('-')[1]),
      //     });
      //     setState({ editable: true });
      //     setEditableMovement(false);
      //     setRepeatedMovement(undefined);
      //   }
      // });
    }
  }, [formattedDate, casino]);

  const handleSubmit = () => {
    if (Object.entries(values).length !== 0) {
      console.log(values);
      // https://billbalanceapif.azurewebsites.net/api/Idoctor/AddIdoctorMovement
      axios
        .post(
          'https://billbalanceapif.azurewebsites.net/api/Idoctor/AddIdoctorMovement',
          {
            año: parseInt(values.año),
            casino: values.casino,
            descripcionEgreso: values.descripcionEgreso,
            descripcionIngreso: values.descripcionIngreso,
            dia: parseInt(values.dia),
            egreso: parseInt(values.egreso),
            ingreso: parseInt(values.ingreso),
            fecha: values.fecha,
            mes: parseInt(values.mes),
            tipo: values.tipo,
          },
        )
        .then(function (response) {
          console.log(response);
          // if (response.status === 200) {
          //   setMessage(' dada de alta correctamente');
          //   setType('success');
          //   setReload((oldR) => oldR + 1);
          //   setValues({});
          //   handleReset();
          // }
          // if (response.status === 400) {
          //   setMessage('error al realizar alta');
          //   setType('error');
          //   setReload((oldR) => oldR + 1);
          //   setValues({});
          //   handleReset();
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
      // addData(values, formattedDate, 'DataIDoctor');
      // setOpenAlert(true);
      // setType('success');
      // if (editableMovement) {
      //   setMessage('Día editado correctamente');
      // } else {
      //   setMessage('Día dado de alta correctamente');
      // }
      // handleReset();
      // } else {
      //   setOpenAlert(true);
      //   setType('error');
      //   setMessage('Error al dar de alta el día');
      // }
    }
  };

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
        setSucursales(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [open === true]);

  const handleSelect = (e) => {
    setCasino(e.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeAction}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form
          autoComplete='off'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Card sx={{ ...style, maxWidth: 800 }}>
            <CardHeader title='Agregar movimiento' />
            <Divider />
            {sucursales !== undefined && sucursales.length > 0 ? (
              <CardContent>
                <Grid
                  container
                  spacing={3}
                  sx={{
                    display: 'flex',
                    flexDirection: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Grid item xs={12}>
                    {sucursales !== undefined && (
                      <SelectComponent
                        data={sucursales}
                        handleSelected={handleSelect}
                        label='Sucursal'
                        withId='name'
                        propName='sucursal'
                        Width='full'
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {casino !== undefined && (
                      <DatePicker
                        label='Fecha de Movimiento'
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        type={'fecha'}
                        renderInput={(params) => (
                          <TextField
                            sx={{ mb: 2 }}
                            fullWidth
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
                      <Grid item xs={10}>
                        <h8>Ingreso</h8>
                      </Grid>
                      <Grid item xs={5}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={130}
                          label='Ingreso'
                          values={values}
                          onChange={handleChange('ingreso')}
                          type={'ingreso'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={130}
                          label='Descripción'
                          values={values}
                          onChange={handleChange('descripcionIngreso')}
                          type={'descripcionIngreso'}
                          normal={false}
                          tipo='text'
                          required
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <h8>Egreso</h8>
                      </Grid>
                      <Grid item xs={5}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={130}
                          label='Egreso'
                          values={values}
                          onChange={handleChange('egreso')}
                          type={'egreso'}
                          placeHolder='0'
                          required
                          tipo='number'
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          width={130}
                          label='Descripción'
                          values={values}
                          onChange={handleChange('descripcionEgreso')}
                          type={'descripcionEgreso'}
                          normal={false}
                          tipo='text'
                          required
                        />
                      </Grid>
                      <Grid item xs={9}>
                        {/* <h3>Utilidad neta: {values.ingreso - values.egreso}</h3> */}
                        <TextField
                          width={300}
                          disabled={true}
                          label='Utilidad neta:'
                          name='utilidadneta'
                          required
                          value={values.ingreso - values.egreso}
                          onChange={handleChange('utilidadneta')}
                          variant='outlined'
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
                      <Grid item xs={6}>
                        <Button
                          sx={{ mt: 1 }}
                          disabled={!values.dia}
                          variant='outlined'
                          onClick={handleSubmit}
                          type='sumbit'
                        >
                          {editableMovement ? 'Editar' : 'Agregar'}
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            ) : (
              <div>
                <h1>No hay data para mostrar</h1>
                <h5>Favor de registrar sucursales en la pestaña de IDoctor</h5>
                <Button
                  onClick={closeAction}
                  variant='contained'
                  color='primary'
                >
                  Cerrar
                </Button>
              </div>
            )}
          </Card>
        </form>
      </Modal>
      <Alertas
        Message={Message}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        type={type}
      />
    </>
  );
};
