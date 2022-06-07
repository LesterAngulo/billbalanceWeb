import { Grid } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
export const ReporteMaquinas = ({
  casino = '',
  date,
  maquinas,
  year,
  Report,
}) => {
  const axios = require('axios');
  const [data, setData] = useState();
  const [onlyYear, setOnlyYear] = useState();
  const [yearDate, setYearDate] = useState();
  const [payload2, setPayload2] = useState(undefined);
  const [dateForYear, setDateForYear] = useState();
  const [datesForAnualReport, setDateForAnualReport] = useState(undefined);
  const [datesFormatted, setDatesFormatted] = useState(undefined);

  useEffect(() => {
    console.log(Report);
    if (Report === 'mensual') {
      if (date !== null) {
        axios
          .get(
            `https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetAllMovementsByYearAndMonth`,
            {
              params: {
                year: parseInt(date.split('-')[0]),
                month: parseInt(date.split('-')[1]),
                casino: casino,
                model: maquinas,
              },
            },
          )
          .then(function (response) {
            console.log(response);
            let data = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else if (Report === 'anual') {
      if (year !== null) {
        function getDaysInMonth(year, monthOfYear) {
          return new Date(year, monthOfYear, 0);
        }

        function getDatesLastDayByYear(yearToWorkWith) {
          let results = [];
          for (let i = 0; i < 12; i++) {
            results[i] = getDaysInMonth(yearToWorkWith, i + 1);
          }
          return results;
        }
        setDateForAnualReport(getDatesLastDayByYear(year.getFullYear()));
      }
    }
  }, [Report, casino, date, year, maquinas]);

  useEffect(() => {
    if (datesForAnualReport !== undefined) {
      let formatted = [];
      datesForAnualReport.forEach((x, i) => {
        let dateobj, date, month, year;
        if (x != null) {
          dateobj = x;
          // eslint-disable-next-line no-unused-expressions
          (date = dateobj.getDate()),
            (month = dateobj.getMonth() + 1),
            (year = dateobj.getFullYear());
        }
        formatted.push(`${year}-${month}-${date}`);
      });
      setDatesFormatted(formatted);
    }
  }, [datesForAnualReport]);

  useEffect(() => {
    if (casino !== undefined && maquinas !== undefined) {
      if (Report === 'mensual') {
        if (date !== null) {
          let mes = parseInt(date.split('-')[1]);
          let obj,
            lista = [],
            date1,
            date2,
            diffTime,
            diffDays;
          axios
            .get(
              `https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetAllMovementsByYearAndMonth`,
              {
                params: {
                  year: parseInt(date.split('-')[0]),
                  month: parseInt(date.split('-')[1]),
                  casino: casino,
                  model: maquinas,
                },
              },
            )
            .then(function (response) {
              console.log(response.data);
              response.data.map((items) => {
                date1 = new Date(items.fechaInicial);
                date2 = new Date(items.fechaFinal);

                diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(diffDays);
                let percent = items.participacion / 100;
                // (parseInt(items.netwin) * parseInt(items.participacion)) / 100;
                obj = {
                  fechaInicial: items.fechaInicial,
                  fechaFinal: items.fechaFinal,
                  mediaCoinIn: new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  }).format(items.coinIn / 12 / diffDays),
                  mediaNewWin: new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  }).format(items.netwin / 30 / diffDays),
                  participacion: new Intl.NumberFormat('es-MX', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                  }).format(items.participacion / 100),
                };
                lista.push(obj);
              });
              setData(lista);
            })
            .catch(function (error) {
              console.log(error);
            });
          // getDataMonthMachines(mes, casino, maquinas).then((payload) => {
          //   payload.map((items) => {
          //     date1 = new Date(items.fechaInicial);
          //     date2 = new Date(items.fechaFinal);

          //     diffTime = Math.abs(date2 - date1);
          //     diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          //     let percent = items.participacion / 100;
          //     // (parseInt(items.netwin) * parseInt(items.participacion)) / 100;
          //     obj = {
          //       fechaInicial: items.fechaInicial,
          //       fechaFinal: items.fechaFinal,
          //       mediaCoinIn: new Intl.NumberFormat('es-MX', {
          //         style: 'currency',
          //         currency: 'MXN',
          //       }).format(
          //         parseInt(items.coinIn) / parseInt(items.numero) / diffDays,
          //       ),
          //       // parseInt(items.coinIn) / parseInt(items.numero) / diffDays,
          //       mediaNewWin: new Intl.NumberFormat('es-MX', {
          //         style: 'currency',
          //         currency: 'MXN',
          //       }).format(
          //         parseInt(items.netwin) / parseInt(items.numero) / diffDays,
          //       ),
          //       participacion: new Intl.NumberFormat('es-MX', {
          //         style: 'percent',
          //         minimumFractionDigits: 2,
          //       }).format(percent),
          //     };
          //     lista.push(obj);
          //   });
          //   setData(lista);
          // });
        }
      } else {
        if (datesFormatted !== undefined) {
          let obj,
            lista = [],
            date1,
            date2,
            diffTime,
            diffDays;
          axios
            .get(
              `https://billbalanceapi.azurewebsites.net/api/SlotMachine/GetMachineMovementByDateRange?start=${year.getFullYear()}-01-01&end=${year.getFullYear()}-12-31`,
            )
            .then(function (response) {
              console.log(response);
              response.data.map((item) => {
                date1 = new Date(item.fechaInicial);
                date2 = new Date(item.fechaFinal);

                diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                let percent = item.participacion / 100;
                obj = {
                  fechaInicial: item.fechaInicial,
                  fechaFinal: item.fechaFinal,
                  mediaCoinIn: new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  }).format(item.coinIn / item.numero / diffDays),
                  mediaNewWin: new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  }).format(item.netwin / item.numero / diffDays),
                  participacion: new Intl.NumberFormat('es-MX', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                  }).format(percent),
                };
                lista.push(obj);
              });
              setData(lista);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  }, [date, casino, maquinas, datesFormatted]);

  const columnsForDataGrid2 = [
    {
      field: 'fechaInicial',
      headerName: 'Fecha inicial',
      description: 'Fecha de inicial',
      width: 150,
    },
    {
      field: 'fechaFinal',
      headerName: 'Fecha final',
      description: 'Fecha de final',
      width: 150,
    },
    {
      field: 'mediaCoinIn',
      headerName: 'Media coin',
      description: 'media coin in',
      width: 150,
    },
    {
      field: 'mediaNewWin',
      headerName: 'Media NetWin',
      description: 'media coin out',
      width: 150,
    },
    {
      field: 'participacion',
      headerName: '% Participación',
      description: 'Participacion',
      width: 150,
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
      {data !== undefined && data.length > 0 ? (
        <Grid item xs={5} sx={{ pt: 6 }}>
          <DataGrid
            pageSize={25}
            sx={{
              '@media print': {
                '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
              },
            }}
            columns={columnsForDataGrid2}
            rows={data}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight
            style={{ width: 800 }}
            getRowId={(row) => row.fechaFinal}
          />
        </Grid>
      ) : (
        <h1>NO EXISTE DATA REGISTRADA</h1>
      )}
    </Grid>
  );
};
