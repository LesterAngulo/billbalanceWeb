import { Grid } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Chart from '../../Charts/Chart';
import LineCharts from '../../Charts/LineChart';

export const ReporteMensualIdoctor = ({
  sucursal = '',
  year,
  Report,
  month,
}) => {
  const axios = require('axios');
  const [onlyYear, setOnlyYear] = useState();
  const [data, setData] = useState([]);
  const [dataForGrid, setDataForGrid] = useState();
  const [dataCharts, setDataCharts] = useState();
  const [dataLineCharts, setDataLineCharts] = useState();

  const columnsForDataGrid = [
    {
      field: 'mes',
      headerName: 'Indicador',
      description: 'indicador',
      width: 120,
    },
    {
      field: 'ingreso',
      headerName: 'Ingresos',
      description: 'Ingresos',
      width: 120,
    },
    {
      field: 'egreso',
      headerName: 'Egresos',
      description: 'Egresos',
      width: 120,
    },
    {
      field: 'resultadoMes',
      headerName: 'Resultado',
      description: 'resultado por mes',
      width: 120,
    },
  ];

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
  useEffect(() => {
    if (Report === 'anual') {
      if (year != undefined) {
        setOnlyYear(year.getFullYear());
      } else {
        return;
      }
    } else if (Report === 'mensual') {
      if (month !== null) {
        setOnlyYear(month.getFullYear());
      } else {
        return;
      }
    }
  }, [year, month]);

  function getDaysInMonth(year, monthOfYear) {
    return new Date(year, monthOfYear, 0);
  }

  function getDatesLastDayByYear(year) {
    let results = [];
    for (let i = 0; i < 12; i++) {
      results[i] = getDaysInMonth(year, i + 1);
    }
    return results;
  }

  let fechas = getDatesLastDayByYear(onlyYear);

  const [payload2, setPayload2] = useState(undefined);

  useEffect(() => {
    if ((Report === 'anual' && year !== null) || month !== null) {
      axios
        .get(
          'https://billbalanceapif.azurewebsites.net/api/Idoctor/GetIdoctorYearReport',
          {
            params: {
              year: year.getFullYear(),
              branch: sucursal.name,
            },
          },
        )
        .then(function (response) {
          if (Report === 'anual') {
            let lista = [];
            response.data.map((item) => {
              let a;
              a = {
                mes: months[item.mes - 1],
                ingreso: item.ingreso,
                egreso: item.egreso,
                resultadoMes: item.ingreso - item.egreso,
              };
              lista.push(a);
            });
            setData(lista);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [sucursal, year, month, onlyYear, Report]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    if (data !== undefined || data.length > 0) {
      let arr = [];
      let obj;
      let ant;
      let arr2 = [];
      let obj2;
      let ant2;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(i);
        if (i === 0) {
          obj = {
            mes: data[i].mes,
            ingreso: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].ingreso),
            egreso: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].egreso),
            resultadoMes: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].resultadoMes),
            saldoacumulado: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].resultadoMes),
          };
          ant = data[i].resultadoMes;
        } else {
          obj = {
            mes: data[i].mes,
            ingreso: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].ingreso),
            egreso: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].egreso),
            resultadoMes: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(data[i].resultadoMes),
            saldoacumulado: new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(ant + data[i].resultadoMes),
          };
          ant = ant + data[i].resultadoMes;
        }
        if (i === 0) {
          obj2 = {
            mes: data[i].mes,
            ingreso: data[i].ingreso,
            egreso: data[i].egreso,
            resultadoMes: data[i].resultadoMes,
            saldoacumulado: data[i].resultadoMes,
          };
          ant2 = data[i].resultadoMes;
        } else {
          obj2 = {
            mes: data[i].mes,
            ingreso: data[i].ingreso,
            egreso: data[i].egreso,
            resultadoMes: data[i].resultadoMes,
            saldoacumulado: ant + data[i].resultadoMes,
          };
          ant2 = ant2 + data[i].resultadoMes;
        }
        console.log(obj);
        console.log(obj2);
        arr.push(obj);
        arr2.push(obj2);
      }
      if (Report === 'mensual') {
        // let monthToSearch = months[month.getMonth()];
        // if (arr.find((elem) => elem.mes === monthToSearch)) {
        //   arr.map((elem) => {
        //     if (elem.mes === monthToSearch) {
        //       setDataForGrid(data);
        //     }
        //   });
        //   arr2.map((elem) => {
        //     if (elem.mes === monthToSearch) {
        //       setDataCharts([elem]);
        //     }
        //   });
        // } else {
        //   setDataForGrid([]);
        // }
      } else if (Report === 'anual') {
        setDataForGrid(arr);
        setDataCharts(arr2);
      }
    }
  }, [data, Report]);

  useEffect(() => {
    if (dataCharts !== undefined && dataCharts.length > 0) {
      let arr = [];
      let obj;
      dataCharts.map((items) => {
        obj = {
          mes: items.mes,
          saldoacumulado: items.saldoacumulado,
        };
        arr.push(obj);
      });
      setDataLineCharts(arr);
    }
  }, [dataCharts]);

  return (
    <Grid container justifyContent='center'>
      {data !== undefined && data.length > 0 ? (
        <>
          <Grid item xs={6} sx={{ pt: 5 }}>
            <Chart
              data={dataCharts}
              width={500}
              height={300}
              dk1='ingreso'
              dk2='egreso'
            />
          </Grid>
          {Report === 'anual' && (
            <Grid item xs={6} sx={{ pt: 5 }}>
              <LineCharts data={dataLineCharts} width={500} height={300} />
            </Grid>
          )}
          <Grid
            item
            xs={Report === 'anual' ? 12 : 6}
            sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}
          >
            <DataGrid
              sx={{
                width: '50%',
                '@media print': {
                  '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                },
              }}
              columns={columnsForDataGrid}
              rows={dataForGrid}
              components={{
                Toolbar: CustomToolbar,
              }}
              autoHeight
              style={{ width: 500 }}
              getRowId={(row) => row.mes}
            />
          </Grid>
        </>
      ) : (
        <h1>NO EXISTE DATA REGISTRADA</h1>
      )}
    </Grid>
  );
};
