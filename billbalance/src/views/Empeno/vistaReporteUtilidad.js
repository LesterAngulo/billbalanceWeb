/* import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; */
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from '../../components/Charts/Chart';
import { useDatePicker } from '../../components/hooks/useDatePicker';
import { useMonthAndYear } from '../../components/hooks/useMonthAndYear';
// import { getYears } from '../../configuration/firebase/Methods/Methods';

export const ReporteUtilidadCasino = ({ casino = '', year }) => {
  const axios = require('axios');
  const [openAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const handleCloseAlert = () => setOpenAlert(false);
  const [dataChart, setDataChart] = useState();
  const [lastDay, setLastDay] = useState(undefined);
  let [fMonth, fYear] = useMonthAndYear(year);
  let [formattedDate1] = useDatePicker(lastDay);
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

  const [onlyYear, setOnlyYear] = useState();

  useEffect(() => {
    if (year != undefined) {
      setOnlyYear(year.getFullYear());
    } else {
      return;
    }
  }, [year]);

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0);
  }
  function getDatesLastDayByYear(year) {
    let results = [];
    for (let i = 0; i < 12; i++) {
      results[i] = getDaysInMonth(year, i + 1);
    }
    return results;
  }
  let fechas = getDatesLastDayByYear(onlyYear);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (year !== null) {
      let date, formatted, month, year;
      fechas.map((items) => {
        // eslint-disable-next-line no-unused-expressions
        (date = items.getDate()),
          (month = items.getMonth() + 1),
          (year = items.getFullYear());
        formatted = `${year}-${month}-${date}`;
        setDates((old) => [...old, formatted]);
      });
    }
  }, [year]);
  const [payload2, setPayload2] = useState(undefined);
  useEffect(() => {
    if (year !== null) {
      //

      axios
        .get(
          `https://billbalanceapif.azurewebsites.net/api/PawnShop/GetMovementsByDateRange?start=${year.getFullYear()}-01-01&end=${year.getFullYear()}-12-31`,
        )
        .then(function (response) {
          console.log(response.data);
          setPayload2(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // getYears(onlyYear, casino.name).then((payload) => {
      //   setPayload2(
      //     payload.filter((items) => {
      //       let mes = parseInt(items.fecha.split('-')[1]);
      //       return items.dia == new Date(items.año, mes, 0).getDate();
      //     }),
      //   );
      // });
    }
  }, [casino, year, dates]);

  useEffect(() => {
    if (payload2 !== undefined) {
      let obj;
      let lista = [];
      payload2.map((items) => {
        let mes = parseInt(items.fecha.split('-')[1]);
        obj = {
          name: months[mes - 1],
          total: parseInt(items.total),
          gasto: parseInt(items.gasto),
        };
        lista.push(obj);
      });
      setDataChart(lista);
    }
  }, [payload2]);

  return (
    <Container sx={{ pt: 5 }}>
      <Card
        style={{
          width: 900,
          height: 600,
          textAlign: 'center',
          position: 'absolute',
        }}
        sx={{ boxShadow: 9 }}
      >
        {payload2 !== undefined && payload2.length > 0 ? (
          <CardContent sx={{ p: 5 }}>
            <Typography sx={{ m: 3, mb: 4 }} variant='h4'>
              Utilidad Neta de Sucursal "{casino ? casino.name : ''}"
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                display: 'flex',
                flexDirection: 'center',
                justifyContent: 'center',
              }}
            >
              <Chart
                data={dataChart}
                width={700}
                height={450}
                dk1='total'
                dk2='gasto'
              />
            </Grid>
          </CardContent>
        ) : (
          <h1>NO EXISTE DATA REGISTRADA</h1>
        )}
      </Card>
    </Container>
  );
};
