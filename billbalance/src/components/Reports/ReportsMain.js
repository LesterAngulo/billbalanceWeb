import DatePicker from '@mui/lab/DatePicker';
import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SelectComponent } from '../../components/Select/SelectComponent';
import { ReportSelect } from '../../views/Casinos/Reportes/Components/ReportSelect';
import { ReporteUtilidadCasino } from '../../views/Empeno/vistaReporteUtilidad';
import { useDatePicker } from '../hooks/useDatePicker';
import { useMonthAndYear } from '../hooks/useMonthAndYear';
import { SelectCasinoComponent } from '../Select/SelectCasinoComponent';
import { ReporteMensualIdoctor } from './Idoctor/ReporteMensualIdoctor';
// import { InvoiceReport } from './Invoices/InvoiceReport';
import { ReporteMaquinas } from './Maquinas/ReporteMaquinas';

export const ReportsMain = ({ Report = '', ButtonTitle = undefined }) => {
  const axios = require('axios');
  const [openModal, setOpenModal] = useState(false);
  const [components, setComponents] = useState(undefined);
  const [businessType, setBusinessType] = useState(undefined);
  const [salas, setSalas] = useState(undefined);
  const [sucursalesEmpeno, setSucursalesEmpeno] = useState(undefined);
  const [models, setModels] = useState();
  const [casino, setCasino] = useState(undefined);
  const [terminalModel, setTerminalModel] = useState(undefined);
  const [sucursal, setSucursal] = useState(undefined);
  const [showCasinoSelector, setShowCasinoSelector] = useState(false);
  const [showCasinoSelector2, setShowCasinoSelector2] = useState(false);
  const [showSelectSucursal, setShowSelectSucursal] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showYearMonthSelector, setShowYearMonthSelector] = useState(false);
  const [showTerminalModelSelector, setShowTerminalModelSelector] =
    useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [sucursales, setSucursales] = useState();
  let [fMonth, fYear] = useMonthAndYear(month);
  const [date, setDate] = useState();
  let [formattedDate] = useDatePicker(date);
  const [values, setValues] = useState({});
  const closeModal = () => setOpenModal(false);

  const Empresas = [
    { id: 0, name: 'Empeño' },
    { id: 1, name: 'iDoctor' },
    { id: 2, name: 'Maquinas' },
  ];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (fMonth !== undefined) {
      setDate(new Date(fYear, fMonth, 0));
    }
  }, [fMonth, fYear]);

  const handleReset = () => {
    setComponents(undefined);
    setShowCasinoSelector(false);
    setShowSelectSucursal(false);
    setShowYearSelector(false);
    setShowYearMonthSelector(false);
    setShowTerminalModelSelector(false);
    setShowCasinoSelector2(false);
  };
  useEffect(() => {
    handleReset();
    if (businessType !== undefined) {
      if (businessType === 0) {
        setShowCasinoSelector(true);
        setShowSelectSucursal(false);
        setShowYearSelector(true);
        setShowYearMonthSelector(true);
        setShowTerminalModelSelector(false);

        setComponents({
          casino: casino,
          year: year,
        });
      } else if (businessType === 1) {
        setShowCasinoSelector(false);
        setShowSelectSucursal(true);
        setShowYearSelector(true);
        setShowYearMonthSelector(true);
        setShowTerminalModelSelector(false);

        setComponents({
          sucursal: sucursal,
          year: year,
          Report: Report,
          month: month,
        });
      } else if (businessType === 2) {
        setShowCasinoSelector2(true);
        setShowYearSelector(true);
        setShowSelectSucursal(false);
        setShowYearMonthSelector(true);
        setShowTerminalModelSelector(true);
        if (terminalModel !== undefined) {
          setComponents({
            casino: casino.name,
            date: formattedDate,
            maquinas: terminalModel,
            year: year,
            Report: Report,
          });
        }
      }
    }
  }, [
    Report,
    casino,
    businessType,
    year,
    formattedDate,
    sucursal,
    terminalModel,
  ]);

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
        setSucursalesEmpeno(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
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
        setSalas(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
  }, []);

  useEffect(() => {
    if (casino !== undefined) {
      axios
        .get(
          'https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetSlotMachinesByCasino?',
          {
            params: {
              casino: casino.name,
            },
          },
        )
        .then(function (response) {
          let data = response.data.map((item) => {
            return {
              model: item.model,
              numero: item.numero,
            };
          });
          setModels(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [casino]);

  return (
    <>
      <Card sx={{ boxShadow: 6 }}>
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <ReportSelect
                options={Empresas}
                handleChange={setBusinessType}
                label='Tipo'
                withId='id'
                Report={Report}
                value={businessType ? businessType.id : undefined}
              />
            </Grid>

            {showCasinoSelector &&
              sucursalesEmpeno !== undefined &&
              sucursalesEmpeno.length > 0 && (
                <Grid item xs={3} sx={{ pl: 3 }}>
                  <SelectComponent
                    data={sucursalesEmpeno}
                    handleSelected={(e) => {
                      setCasino(e.target.value);
                    }}
                    label='Sucursal'
                    withId='name'
                    propName='Sucursal'
                    Width='full'
                  />
                </Grid>
              )}
            {showCasinoSelector2 && salas !== undefined && salas.length > 0 && (
              <Grid item xs={3} sx={{ pl: 3 }}>
                <SelectCasinoComponent
                  data={salas}
                  handleSelected={(e) => {
                    setCasino(e.target.value);
                  }}
                  label='Casino'
                  withId='name'
                  propName='casino'
                  Width='full'
                />
              </Grid>
            )}

            {showTerminalModelSelector &&
              models !== undefined &&
              models.length > 0 && (
                <Grid item xs={2} sx={{ pl: 3 }}>
                  <SelectComponent
                    data={models}
                    handleSelected={(e) => {
                      setTerminalModel(e.target.value.model);
                    }}
                    label='Modelo'
                    withId='model'
                    propName='model'
                    Width='full'
                  />
                </Grid>
              )}
            {showSelectSucursal &&
              sucursales !== undefined &&
              sucursales.length > 0 && (
                <Grid item xs={3} sx={{ pl: 3 }}>
                  <SelectComponent
                    data={sucursales}
                    handleSelected={(e) => {
                      setSucursal(e.target.value);
                    }}
                    label='Sucursal'
                    withId='name'
                    Width='full'
                  />
                </Grid>
              )}
            {showYearMonthSelector && Report === 'mensual' && (
              <Grid item xs={3} sx={{ pl: 3 }}>
                <DatePicker
                  views={['year', 'month']}
                  label='Mes y Año'
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
            )}
            {showYearSelector && Report === 'anual' && (
              <Grid item xs={3} sx={{ pl: 3 }}>
                <DatePicker
                  views={['year']}
                  label='Año'
                  value={year}
                  onChange={(newValue) => {
                    setYear(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Grid>
            )}
            {ButtonTitle !== undefined && (
              <Grid item xs={3} sx={{ pl: 3, pt: 1 }}>
                <Button children={ButtonTitle} variant='contained' />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      {casino && businessType === 0 && (
        <ReporteUtilidadCasino {...components} />
      )}
      {sucursal && businessType === 1 && (
        <ReporteMensualIdoctor {...components} />
      )}
      {businessType === 2 && <ReporteMaquinas {...components} />}
    </>
  );
};
