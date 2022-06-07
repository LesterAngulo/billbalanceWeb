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
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { useDatePicker } from '../../components/hooks/useDatePicker';
import { useMonthAndYear } from '../../components/hooks/useMonthAndYear';
import { AddIdoctorMovementModal } from '../Idoctor/Components/AddIdoctorMovementModal';
export const MovimientosIdoctor = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [month, setMonth] = useState(null);
  const [invoices, setInvoices] = useState(undefined);
  let [fMonth, fYear] = useMonthAndYear(month);
  const [fristDate, setFristDate] = useState();
  let [formattedDate1] = useDatePicker(fristDate);
  useEffect(() => {
    if (fMonth !== undefined) {
      setFristDate(new Date(fYear, fMonth, 0));
    }
  }, [fMonth, fYear]);

  const closeInvoiceModal = () => setOpenInvoiceModal(false);

  const columnsForDataGrid = [
    {
      field: 'fecha',
      headerName: 'Fecha',
      description: 'Fecha de factura',
      width: 140,
    },
    {
      field: 'casino',
      headerName: 'Sucursal',
      description: 'Monto de factura',
      width: 140,
    },
    {
      field: 'ingreso',
      headerName: 'Ingreso',
      description: 'Numero de factura',
      width: 140,
    },
    {
      field: 'egreso',
      headerName: 'Egreso',
      description: 'Numero de factura',
      width: 140,
    },
    {
      field: 'descripcionIngreso',
      headerName: 'Decripción Ingreso',
      description: 'Estatús de factura',
      width: 230,
    },
    {
      field: 'descripcionEgreso',
      headerName: 'Decripción Egreso',
      description: 'Estatús de factura',
      width: 230,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    let mes1 = parseInt(formattedDate1.split('-')[1]);
    let año = parseInt(formattedDate1.split('-')[0]);
    setInvoices(undefined);
    // getDataIDoctor(mes1, año).then((data) => {
    //   data = data.map((item) => {
    //     return {
    //       fecha: item.fecha,
    //       casino: item.casino,
    //       ingreso: new Intl.NumberFormat('es-MX', {
    //         style: 'currency',
    //         currency: 'MXN',
    //       }).format(item.ingreso),
    //       descripcionIngreso: item.descripcionIngreso,
    //       egreso: new Intl.NumberFormat('es-MX', {
    //         style: 'currency',
    //         currency: 'MXN',
    //       }).format(item.egreso),
    //       descripcionEgreso: item.descripcionEgreso,
    //     };
    //   });

    //   setInvoices(data);
    // });
  }, [formattedDate1]);

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Idoctor</title>
      </Helmet>
      <Container>
        <Card sx={{ boxShadow: 9 }}>
          <CardContent sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography sx={{ mt: 0, mb: 4 }} variant='h4' align='center'>
                  IDoctor
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  sx={{ mb: 3 }}
                  children='Agregar Movimiento'
                  variant='contained'
                  size='small'
                  onClick={() => {
                    setOpenInvoiceModal(true);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <DatePicker
                  views={['year', 'month']}
                  label='Mes 1'
                  minDate={new Date('2012-03-01')}
                  maxDate={new Date('2023-06-01')}
                  value={month}
                  onChange={(newValue) => {
                    setMonth(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Grid>
              {invoices && month !== null && (
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <DataGrid
                    sx={{
                      '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                      },
                      width: 900,
                    }}
                    columns={columnsForDataGrid}
                    rows={invoices}
                    getRowId={(row) => row.fecha}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    autoHeight
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <AddIdoctorMovementModal
        open={openInvoiceModal}
        closeAction={closeInvoiceModal}
      />
    </div>
  );
};
