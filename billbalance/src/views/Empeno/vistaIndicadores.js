/* eslint-disable react-hooks/rules-of-hooks */
/* import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; */
import DatePicker from '@mui/lab/DatePicker';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { Alertas } from '../../components/Alertas/Alertas';
import { useDatePicker } from '../../components/hooks/useDatePicker';
import { useMonthAndYear } from '../../components/hooks/useMonthAndYear';
import { SelectComponent } from '../../components/Select/SelectComponent';

export const Indicadores = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'contador') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [openAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const handleCloseAlert = () => setOpenAlert(false);
  const [date, setDate] = useState(null);
  const [dataDiaSeleccionado, setDataDiaSeleccionado] = useState(undefined);
  const [casino, setCasino] = useState(undefined);
  const [firstMonth, setFirstMonth] = useState(null);
  const [secondMonth, setSecondMonth] = useState(null);
  let [fMonth, fYear] = useMonthAndYear(firstMonth);
  let [sMonth, sYear] = useMonthAndYear(secondMonth);
  const [fristDate, setFristDate] = useState();
  const [secondDate, setSecondDate] = useState();
  let [formattedDate1] = useDatePicker(fristDate);
  let [formattedDate2] = useDatePicker(secondDate);
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [indicadores, setIndicadores] = useState(undefined);
  const [resultados, setResultados] = useState(undefined);
  const [salas, setSalas] = useState();
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const columnsForIndicadores = [
    {
      field: 'identificador',
      headerName: 'Identificador',
      description: 'identificador',
      width: 128,
    },
    {
      field: 'inventario',
      headerName: 'Inventario',
      description: 'inventario',
      width: 128,
    },
    {
      field: 'empeño',
      headerName: 'Empeño',
      description: 'empeño total',
      width: 128,
    },
    {
      field: 'refrendo',
      headerName: 'Refrendo',
      description: 'refrendo',
      width: 128,
    },
    {
      field: 'desempeño',
      headerName: 'Desempeño',
      description: 'desempeño',
      width: 128,
    },
    {
      field: 'venta',
      headerName: 'Venta',
      description: 'venta',
      width: 128,
    },
    {
      field: 'intereses',
      headerName: 'Intereses',
      description: 'intereses',
      width: 128,
    },
    {
      field: 'utilventa',
      headerName: 'Util. Venta',
      description: 'utilidad de venta',
      width: 128,
    },
    {
      field: 'total',
      headerName: 'Total',
      description: 'total',
      width: 128,
    },
    {
      field: 'gastos',
      headerName: 'Gasto',
      description: 'gasto',
      width: 128,
    },
    {
      field: 'utilneta',
      headerName: 'Utilidad Neta',
      description: 'utilidad neta',
      width: 128,
    },
    {
      field: 'rentabilidad',
      headerName: 'Rentabilidad',
      description: 'rentabilidad',
      width: 120,
    },
  ];
  const columnsForResultados = [
    {
      field: 'interes',
      headerName: 'Intereses',
      description: 'intereses',
      width: 150,
      align: 'center',
    },
    {
      field: 'utilidadVenta',
      headerName: 'Util. Venta',
      description: 'utilidad de venta',
      width: 150,
      align: 'center',
    },
    {
      field: 'total',
      headerName: 'Total',
      description: 'total',
      width: 150,
      align: 'center',
    },
    {
      field: 'gastos',
      headerName: 'Gasto',
      description: 'gasto',
      width: 150,
      align: 'center',
    },
    {
      field: 'utilidadNeta',
      headerName: 'Utilidad Neta',
      description: 'utilidad neta',
      width: 150,
      align: 'center',
    },
    {
      field: 'rentabilidad',
      headerName: 'Rentabilidad',
      description: 'rentabilidad',
      width: 150,
      align: 'center',
    },
  ];

  const handleSelect = (e) => {
    setCasino(e.target.value);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
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

  useEffect(() => {
    if (fMonth !== undefined) {
      setFristDate(new Date(fYear, fMonth, 0));
    }
    if (sMonth !== undefined) {
      setSecondDate(new Date(sYear, sMonth, 0));
    }
  }, [fMonth, fYear, sYear, sMonth]);

  useEffect(() => {
    if (casino !== undefined) {
      if (formattedDate2 !== null) {
        axios
          .get(
            `https://billbalanceapif.azurewebsites.net/api/PawnShop/GetPawnShopMonthReport`,
            {
              params: {
                year1: fYear,
                month1: fMonth,
                year2: sYear,
                month2: sMonth,
                branch: casino.name,
              },
            },
          )
          .then(function (response) {
            // console.log(response.data[0]);
            let totalindicadorresultado =
              parseFloat(response.data[0].interes) +
              parseFloat(response.data[0].utilidadVenta);
            let utiliadNetaResultados =
              parseFloat(response.data[0].interes) +
              parseFloat(response.data[0].utilidadVenta) -
              parseFloat(response.data[0].gasto);
            let rentabilidadResultados =
              parseFloat(response.data[1].utilidadNeta) /
              parseFloat(response.data[0].inventario);

            let refrendoIdentificadores =
              response.data[1].referendo / response.data[0].inventario;
            let indicadores = [
              {
                identificador: months[mes1 - 1],
                inventario: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].inventario),
                empeño: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].empeño),
                refrendo: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].referendo),
                desempeño: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].desempeño),
                venta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].costoVenta),
                intereses: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].interes),
                utilventa: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].utilidadVenta),
                total: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].total),
                gastos: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].gasto),
                utilneta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].utilidadNeta),
                rentabilidad: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].utilidadBruta),
              },

              {
                identificador: months[mes2 - 1],
                inventario: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].inventario),
                empeño: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].empeño),
                refrendo: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].referendo),
                desempeño: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].desempeño),
                venta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].costoVenta),
                intereses: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].interes),
                utilventa: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].utilidadVenta),
                total: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].total),
                gastos: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].gasto),
                utilneta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].utilidadNeta),
                rentabilidad: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[1].utilidadBruta),
              },
              {
                identificador: 'Totales',
                inventario: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(
                  parseInt(response.data[1].inventario) -
                    parseInt(response.data[1].inventario),
                ),
                empeño: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(
                  parseInt(response.data[1].empeño) -
                    parseInt(response.data[0].empeño),
                ),
                refrendo: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(refrendoIdentificadores),

                desempeño: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(
                  response.data[1].desempeño / response.data[0].inventario,
                ),
                venta: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(
                  parseInt(response.data[0].costoVenta) /
                    parseInt(response.data[1].inventario),
                ),
                intereses: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(
                  parseInt(response.data[0].interes) /
                    parseInt(response.data[1].inventario),
                ),
                utilventa: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(
                  parseInt(response.data[1].utilidadVenta) /
                    parseInt(response.data[0].costoVenta),
                ),
                total: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(
                  parseFloat(response.data[1].total) -
                    parseFloat(response.data[0].total),
                ),
                // parseFloat(data2[0].total) - parseFloat(data1[0].total),
                gastos: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(
                  parseFloat(response.data[1].gasto) -
                    parseFloat(response.data[0].gasto),
                ),
                utilneta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(
                  parseFloat(response.data[0].utilidadNeta) -
                    parseFloat(response.data[1].utilidadNeta),
                ),
                rentabilidad: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(
                  parseFloat(response.data[1].utilidadNeta) /
                    parseFloat(response.data[0].inventario),
                ),
              },
            ];
            let resultados = [
              {
                interes: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].interes),
                utilidadVenta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].utilidadVenta),
                total: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(totalindicadorresultado),
                gastos: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(response.data[0].gasto),
                utilidadNeta: new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(utiliadNetaResultados),

                rentabilidad: new Intl.NumberFormat('es-MX', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }).format(rentabilidadResultados),
              },
            ];
            console.log(indicadores);
            console.log(resultados);
            setIndicadores(indicadores);
            setResultados(resultados);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [casino, fMonth, fYear, formattedDate1, formattedDate2, sMonth, sYear]);

  let mes1 = parseInt(formattedDate1.split('-')[1]);
  let mes2 = parseInt(formattedDate2.split('-')[1]);

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - Indicadores</title>
      </Helmet>
      <Card sx={{ boxShadow: 9 }}>
        {salas !== undefined && salas.length > 0 ? (
          <>
            <CardContent>
              <Grid container justifyContent='center'>
                <Grid item xs={12}>
                  <Typography sx={{ mt: 1, mb: 4 }} variant='h4' align='center'>
                    Indicadores
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
                >
                  <SelectComponent
                    data={salas}
                    handleSelected={handleSelect}
                    label='Sucursal'
                    withId='name'
                    propName='sucursal'
                    Width={300}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'end', pr: 3 }}
                >
                  <DatePicker
                    views={['year', 'month']}
                    label='Mes 1'
                    minDate={new Date('2012-03-01')}
                    maxDate={new Date('2023-06-01')}
                    value={firstMonth}
                    onChange={(newValue) => {
                      setFirstMonth(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'start', pl: 3 }}
                >
                  <DatePicker
                    views={['year', 'month']}
                    label='Year and Month'
                    minDate={new Date('2012-03-01')}
                    maxDate={new Date('2023-06-01')}
                    value={secondMonth}
                    onChange={(newValue) => {
                      setSecondMonth(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </Grid>

                <Grid item xs={10} sx={{ pt: 3 }}>
                  {casino &&
                    indicadores &&
                    firstMonth !== null &&
                    secondMonth !== null && (
                      <DataGrid
                        getRowId={(row) => row.total}
                        sx={{
                          '@media print': {
                            '.MuiDataGrid-main': {
                              color: 'rgba(0, 0, 0, 0.87)',
                            },
                          },
                        }}
                        columns={columnsForIndicadores}
                        rows={indicadores}
                        components={{
                          Toolbar: CustomToolbar,
                        }}
                        autoHeight
                      />
                    )}
                </Grid>
                <Grid item xs={6} sx={{ pt: 3 }}>
                  {casino &&
                    resultados &&
                    firstMonth !== null &&
                    secondMonth !== null && (
                      <DataGrid
                        getRowId={(row) => row.total}
                        sx={{
                          '@media print': {
                            '.MuiDataGrid-main': {
                              color: 'rgba(0, 0, 0, 0.87)',
                            },
                          },
                        }}
                        columns={columnsForResultados}
                        rows={resultados}
                        components={{
                          Toolbar: CustomToolbar,
                        }}
                        autoHeight
                      />
                    )}
                </Grid>
              </Grid>
            </CardContent>
          </>
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
      <Alertas
        Message={Message}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        type={type}
      />
    </div>
  );
};
