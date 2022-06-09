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

export const VistaTablaMovimientosDiarios = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [invoices, setInvoices] = useState(undefined);
  let [casinos, setCasinos] = useState(undefined);
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
        setCasinos(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (casino !== undefined) {
      axios
        .get(
          'https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetAllMovementsByBranchName',
          {
            params: {
              branch: casino.name,
            },
          },
        )
        .then(function (response) {
          console.log('response', response);
          let data = response.data.map((item) => {
            let percent = item.participacion / 100;
            return {
              modelo: item.modelo,
              numero: item.numero,
              coinIn: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.coinIn),
              coinOut: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.coinOut),
              netWin: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(item.netwin),
              fechaInicial: item.fechaInicial,
              fechaFinal: item.fechaFinal,
              participacion: new Intl.NumberFormat('es-MX', {
                style: 'percent',
                minimumFractionDigits: 2,
              }).format(percent),
              id: item.id,
            };
          });
          setInvoices(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [casino]);

  const columnsForDataGrid = [
    {
      field: 'modelo',
      headerName: 'Modelo',
      width: 140,
    },
    {
      field: 'coinIn',
      headerName: 'CoinIn',
      width: 140,
    },
    {
      field: 'coinOut',
      headerName: 'CoinOut',
      width: 140,
    },
    {
      field: 'netWin',
      headerName: 'newWin',
      width: 140,
    },
    {
      field: 'numero',
      headerName: 'No. Máquinas',
      width: 140,
    },
    {
      field: 'participacion',
      headerName: '% Participación',
      width: 140,
    },
    {
      field: 'fechaInicial',
      headerName: 'Fecha Inicial',
      width: 140,
    },
    {
      field: 'fechaFinal',
      headerName: 'Fecha Final',
      width: 140,
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
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Tabla maquinas</title>
      </Helmet>
      <Container>
        <Card sx={{ boxShadow: 9 }}>
          <CardContent sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography sx={{ mt: 0, mb: 4 }} variant='h4' align='center'>
                  Tabla movimientos máquinas
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {casinos !== undefined && casinos.length > 0 && (
                  <SelectComponent
                    data={casinos}
                    handleSelected={handleSelect}
                    label='Sala'
                    withId='name'
                    propName='casino'
                    Width={300}
                  />
                )}
              </Grid>

              {invoices && casino !== null && (
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
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                      },
                    }}
                    columns={columnsForDataGrid}
                    rows={invoices}
                    getRowId={(row) => (row.id ? row.id : row.fechaFinal)}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    // autoHeight
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
