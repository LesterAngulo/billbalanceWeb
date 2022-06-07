/* eslint-disable react-hooks/rules-of-hooks */
/* import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; */
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
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { Alertas } from '../../components/Alertas/Alertas';
import InputAdornmentComponent from '../../components/Complements/InputAdornmentComponent';
import { SelectComponent } from '../../components/Select/SelectComponent';
import {
  addFacturas,
  getDataByDay,
  getFacturas,
  getMachines,
  getSalas,
} from '../../configuration/firebase/Methods/Methods';
import { useDatePicker } from '../../hooks/useDatePicker';
import { EditInvoiceModal } from '../Facturas/EditInvoiceModal';
import { SelectFacturacion } from './Facturacion/SelectFacturacion';

export const Facturacion = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [invoiceToEdit, setInvoiceToEdit] = useState(undefined);
  const [editableMovement, setEditableMovement] = useState(false);
  const [repeatedMovement, setRepeatedMovement] = useState(undefined);

  const [modalType, setModalType] = useState(undefined);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [date, setDate] = useState(null);
  const [paidDay, setPaidDay] = useState(null);
  const [value, setValue] = useState({});
  const [sucursales, setSucursales] = useState();
  const [sucursal, setSucursal] = useState();
  const [facutras, setFacturas] = useState();
  const [values, setValues] = useState({});
  const [data, setData] = useState();
  const [option, setOption] = useState();
  const [Reload, setReload] = useState(0);
  const [models, setModels] = useState();
  const [modelo, setModelo] = useState(undefined);

  let [formattedDate] = useDatePicker(date);
  const handleCloseAlert = () => setOpenAlert(false);

  const closeModal = () => setOpenModal(false);
  const closeInvoiceModal = () => setOpenInvoiceModal(false);

  const [state, setState] = React.useState({
    editable: false,
  });

  const handleReset = () => {
    setValues({
      nofactura: '',
      monto: '',
    });
    setDate(null);
  };

  const handleChangeSwitch = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    getSalas().then((payload) => {
      setSucursales(payload);
    });
  }, []);
  useEffect(() => {
    if (sucursal !== undefined) {
      getMachines(sucursal.nameid).then((data) => {
        data = data.map((item) => {
          return {
            model: item.model,
            numero: item.numero,
          };
        });
        setModels(data);
      });
    }
  }, [sucursal]);

  useEffect(() => {
    if (sucursal !== undefined && modelo !== undefined) {
      getFacturas(sucursal.name, modelo.model).then((payload) => {
        payload = payload.map((items) => {
          return {
            casino: items.casino,
            nofactura: items.nofactura,
            monto: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(items.monto),
            estado: items.estado ? items.estado : 'sin estado',
            fecha: items.fecha,
            modelo: items.modelo,
            diapagado: items.diapagado,
          };
        });
        setData(payload);
      });
    }
  }, [sucursal, modelo, Reload, formattedDate]);

  useEffect(() => {
    if (formattedDate !== null && sucursal !== undefined) {
      getDataByDay(formattedDate, sucursal.name, 'Facturas').then((data) => {
        if (data) {
          setOpenAlert(true);
          setType('warning');
          setMessage('Día ocupado por movimiento');
          setEditableMovement(true);
          setRepeatedMovement(data);
          setValues(data);
          setOption(data.estado);
          setState({ editable: false });
        } else {
          setValues({
            fecha: formattedDate,
            dia: parseInt(formattedDate.substring(7, 9)),
            año: parseInt(formattedDate.substring(0, 4)),
          });
          setOption([]);
          setState({ editable: true });
          setEditableMovement(false);

          setRepeatedMovement(undefined);
        }
      });
    }
  }, [formattedDate, sucursal]);

  const handleEdit = (item) => {
    setInvoiceToEdit(item);
    setOpenModal(true);
  };

  const StatusOptions = [
    { name: 'Pagada', id: 0 },
    { name: 'Pendiente', id: 1 },
    { name: 'No pagada', id: 2 },
  ];

  const headCells = [
    {
      field: 'casino',
      headerName: 'Casino',
      description: 'Casino',
      width: 140,
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      description: 'Modelo maquina',
      width: 140,
    },
    {
      field: 'nofactura',
      headerName: 'No.Factura',
      description: 'Numero de factura',
      width: 140,
    },
    {
      field: 'monto',
      headerName: 'Monto',
      description: 'Monto de factura',
      width: 140,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      description: 'Estado de factura',
      width: 140,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      description: 'Fecha de factura',
      width: 140,
    },
    {
      field: 'diapagado',
      headerName: 'Día pagado',
      description: 'Dia de paga de factura',
      width: 140,
    },
  ];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSelect = (e) => {
    setSucursal(e.target.value);
  };

  const putSucursal = () => {
    if (Object.entries(values).length !== 0) {
      if (option == 'Pagada') {
        setValues({
          ...values,
          casino: sucursal.name,
          estado: option,
          modelo: modelo.model,
          diapagado: useDatePicker(paidDay)[0],
        });
        setReload((oldR) => oldR + 1);
      } else {
        setValues({
          ...values,
          casino: sucursal.name,
          estado: option,
          modelo: modelo.model,
        });
        setReload((oldR) => oldR + 1);
      }
    }
  };

  useEffect(() => {
    if (Object.entries(values).length !== 0) {
      handleSubmit();
    }
  }, [Reload]);

  const handleSubmit = () => {
    if (Object.entries(values).length > 0 && date !== null) {
      // addFacturas(values).then((payload) => {
      // });
      addFacturas(values).then((payload) => {
        if (payload === false) {
          setOpenAlert(true);
          setType('error');
          setMessage('Error al dar de alta el día');
          handleReset();
        } else {
          if (editableMovement) {
            setMessage('Día editado correctamente');
            setType('success');
            setOpenAlert(true);
            handleReset();
            setReload((oldR) => oldR + 1);
          } else {
            setMessage('Día dado de alta correctamente');
            setType('success');
            setOpenAlert(true);
            handleReset();
            setReload((oldR) => oldR + 1);
          }
        }
      });
    }
    // addData(values, formattedDate, 'Facturas');
    // setOpenAlert(true);
    // setType('success');
    // } else {
    //   setOpenAlert(true);
    //   setType('error');
    //   setMessage('Error al dar de alta el día');
    //   handleReset();
    // }
  };
  const handleSelectModelo = (e) => {
    setModelo(e.target.value);
    handleReset();
  };
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - Facturación</title>
      </Helmet>
      <Container
        style={{
          display: 'flex',
          height: window.height,
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
          {sucursales !== undefined && sucursales.length > 0 ? (
            <CardContent sx={{ p: 5 }}>
              <Typography sx={{ mt: 0, mb: 4 }} variant='h4'>
                Facturación
              </Typography>
              <form
                autoComplete='off'
                onSubmit={(e) => {
                  e.preventDefault();
                  putSucursal();
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Grid item xs={6}>
                    {sucursales !== undefined && sucursales.length > 0 && (
                      <SelectComponent
                        data={sucursales}
                        handleSelected={handleSelect}
                        label='Sala'
                        withId='name'
                        propName='casino'
                        Width={300}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {models !== undefined && models.length > 0 && (
                      <SelectComponent
                        data={models}
                        handleSelected={handleSelectModelo}
                        label='Modelo'
                        withId='model'
                        propName='model'
                        Width={300}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {sucursal !== undefined && (
                      <DatePicker
                        label='Fecha de Movimiento'
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        type={'dia'}
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: 300 }}
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
                          width={300}
                          label='No. Factura'
                          values={values}
                          onChange={handleChange('nofactura')}
                          type={'nofactura'}
                          normal={false}
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputAdornmentComponent
                          disabled={state.editable ? false : true}
                          required
                          width={300}
                          label='Monto'
                          values={values}
                          onChange={handleChange('monto')}
                          type={'monto'}
                          placeHolder='0'
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectFacturacion
                          disable={state.editable ? false : true}
                          label='Estado'
                          withId='name'
                          value={option}
                          options={StatusOptions}
                          handleChange={setOption}
                        />
                      </Grid>
                      {option === 'Pagada' && (
                        <Grid item xs={6}>
                          <DatePicker
                            label='Fecha del pago'
                            value={paidDay}
                            disabled={state.editable ? false : true}
                            onChange={(newValue) => {
                              setPaidDay(newValue);
                            }}
                            type={'dia'}
                            renderInput={(params) => (
                              <TextField
                                sx={{ width: 300 }}
                                autoFocus
                                required
                                // disabled={state.editable ? false : true}
                                {...params}
                              />
                            )}
                          />
                        </Grid>
                      )}
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
                  <Grid xs={10}>
                    {data !== undefined &&
                      data.length > 0 &&
                      sucursal !== undefined &&
                      modelo !== undefined && (
                        <DataGrid
                          columns={headCells}
                          rows={data}
                          getRowId={(row) => row.nofactura}
                          autoHeight
                          style={{ marginTop: 20, width: 710 }}
                          pageSize={5}
                        />
                      )}
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          ) : (
            <>
              <h1>No hay datos para mostrar</h1>
              <h5>
                Favor de registrar salas, maquinas y modelos para poder
                continuar
              </h5>
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
      {invoiceToEdit && (
        <EditInvoiceModal
          open={openModal}
          closeAction={closeModal}
          invoiceValues={invoiceToEdit}
        />
      )}
    </div>
  );
};
