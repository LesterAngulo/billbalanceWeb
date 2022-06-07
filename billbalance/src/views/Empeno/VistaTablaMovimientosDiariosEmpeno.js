/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { SelectComponent } from '../../components/Select/SelectComponent';

export const VistaTablaMovimientosDiariosEmpeno = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'contador' && roles !== 'captura') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [invoices, setInvoices] = useState(undefined);
  let [sucursales, setSucursales] = useState(undefined);
  const [sucursal, setSucursal] = useState();
  const [reload, setReload] = useState(0);

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
        setSucursales(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (sucursal != undefined) {
      axios
        .get(
          'https://billbalanceapif.azurewebsites.net/api/PawnShop/GetMovementsByBranchName',
          {
            params: {
              branch: sucursal.name,
            },
          },
        )
        .then(function (response) {
          console.log(response);
          let data = response.data.map((item) => {
            return {
              // sucursal: sucursal.name,
              fecha: item.fecha,
              inventario: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.inventario),
              empeño: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.empeño),
              refrendo: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.referendo),
              desempeño: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.desempeño),
              venta: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.costoVenta),
              intereses: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.interes),
              total: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.total),
              utilventa: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.utilidadVenta),
              gastos: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.gasto),
              utilNeta: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.utilidadNeta),
              rentabilidad: new Intl.NumberFormat('es-MX', {
                style: 'percent',
                minimumFractionDigits: 2,
              }).format(item.utilidadNeta / item.inventario),
              id: item.id,
            };
          });
          setInvoices(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [sucursal]);

  const [datosTabla, setDatosTabla] = useState();

  const columnsForDataGrid = [
    // {
    //   field: 'sucursal',
    //   headerName: 'Sucursal',
    //   width: 140,
    // },
    {
      field: 'inventario',
      width: 128,
    },
    {
      field: 'empeño',
      headerName: 'Empeño',
      width: 128,
    },
    {
      field: 'refrendo',
      headerName: 'Refrendo',
      width: 128,
    },
    {
      field: 'desempeño',
      headerName: 'Desempeño',
      width: 128,
    },
    {
      field: 'venta',
      headerName: 'Venta',
      width: 128,
    },
    {
      field: 'intereses',
      headerName: 'Intereses',
      width: 128,
    },
    {
      field: 'utilventa',
      headerName: 'Util. Venta',
      width: 128,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 128,
    },
    {
      field: 'gastos',
      headerName: 'Gasto',
      width: 128,
    },
    {
      field: 'utilNeta',
      headerName: 'Utilidad Neta',
      width: 128,
    },
    {
      field: 'rentabilidad',
      headerName: 'Rentabilidad',
      width: 120,
    },
  ];
  const handleSelect = (e) => {
    setSucursal(e.target.value);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Tabla de movimientos</title>
      </Helmet>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ boxShadow: 9 }}>
          <CardContent sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography sx={{ mt: 0, mb: 4 }} variant='h4' align='center'>
                  Tabla movimientos diarios
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {sucursales !== undefined && sucursales.length > 0 && (
                  <SelectComponent
                    data={sucursales}
                    handleSelected={handleSelect}
                    label='Sucursal'
                    withId='name'
                    propName='casino'
                    Width={300}
                  />
                )}
              </Grid>

              {invoices !== undefined && sucursal !== null && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 500,
                  }}
                >
                  <DataGrid
                    sx={{
                      '@media print': {
                        '.MuiDataGrid-main': {
                          color: 'rgba(0, 0, 0, 0.87)',
                        },
                      },
                      // hei
                    }}
                    columns={columnsForDataGrid}
                    rows={invoices}
                    getRowId={(row) => (row.id ? row.id : row.fecha)}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
