import { Grid } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React from 'react';
export const InvoiceReport = ({ rows }) => {
  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Id',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Nombre',
    },
  ];

  const columnsForDataGrid = [
    {
      field: 'date',
      headerName: 'Fecha',
      description: 'Fecha de factura',
    },
    {
      field: 'invoiceNumber',
      headerName: 'Numero',
      description: 'Numero de factura',
    },
    {
      field: 'invoiceAmmount',
      headerName: 'Monto',
      description: 'Monto de factura',
    },
    {
      field: 'invoiceStatus',
      headerName: 'Estatús',
      description: 'Estatús de factura',
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={5} sx={{ pt: 6 }}>
        <DataGrid
          sx={{
            '@media print': {
              '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
            },
          }}
          columns={columnsForDataGrid}
          rows={rows}
          components={{
            Toolbar: CustomToolbar,
          }}
          autoHeight
        />
      </Grid>
    </Grid>
  );
};
