/* eslint-disable react-hooks/rules-of-hooks */
import DatePicker from '@mui/lab/DatePicker';
import {
  Card,
  CardContent,
  Container,
  // Grid,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { useDatePicker } from '../../components/hooks/useDatePicker';
import { SelectComponent } from '../../components/Select/SelectComponent';
import { AddInvoiceModal } from '../Maquinas/AddInvoiceModal';
import { AddTerminalModelModal } from '../Maquinas/AddTerminalModelModal';
import { EditTerminalModelModal } from '../Maquinas/EditTerminalModelModal';
import { CardAltaMaquina } from './cardAltaMaquina';

export const Maquinas = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [openModal, setOpenModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openAddTerminalModelModal, setOpenAddTerminalModelModal] =
    useState(false);

  const [terminalModelToEdit, setTerminalModelToEdit] = useState(undefined);
  const [terminalModelName, setTerminalModelName] = useState(undefined);
  const [terminalModelId, setTerminalModelId] = useState(undefined);
  const [invoice, setInvoice] = useState(undefined);
  const [casinoId, setCasinoId] = useState(undefined);
  const [casino, setCasino] = useState(undefined);
  const [modelo, setModelo] = useState(undefined);
  const [reload, setReload] = useState(0);
  const [models, setModels] = useState();
  const [fechaInicial, setFechaInicial] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  let [formattedDate1] = useDatePicker(fechaInicial);
  let [formattedDate2] = useDatePicker(fechaFinal);
  const [salas, setSalas] = useState();

  const closeModal = () => setOpenModal(false);
  const closeInvoiceModal = () => setOpenInvoiceModal(false);
  const closeAddTerminalModelModal = () => setOpenAddTerminalModelModal(false);

  const handleAddModel = () => {};

  const handleAddInvoice = () => {};

  const terminalModels = [
    { id: 0, name: '0X Machine', casino: 'Mazatlan' },
    { id: 1, name: '1X Machine', casino: 'Guamuchil' },
    { id: 2, name: '2X Machine', casino: 'Guamuchil' },
    { id: 3, name: '002 Terminal', casino: 'Nogales' },
    { id: 4, name: '003 Terminal', casino: 'Nogales' },
  ];

  const headCells = [
    {
      id: 'id',
      numeric: 'center',
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'name',
      numeric: true,
      disablePadding: false,
      label: 'Nombre',
    },
    {
      id: 'casino',
      numeric: true,
      disablePadding: false,
      label: 'Casino',
    },
  ];

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
  }, [reload]);

  useEffect(() => {
    if (casino !== undefined) {
      axios
        .get(
          'https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetSlotMachinesByCasino',
          {
            params: {
              casino: casino.name,
            },
          },
        )
        .then(function (response) {
          let data = response.data.map((items) => {
            return {
              model: items.model,
              numero: items.numero,
              participacion: items.porcentajeParticipacion,
            };
          });
          setModels(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [casino]);

  const handleSelect = (e) => {
    setCasino(e.target.value);
  };
  const handleSelectModelo = (e) => {
    setModelo(e.target.value);
  };
  console.log(models);
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - Maquinas</title>
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
            width: 1600,
            textAlign: 'center',
            position: 'absolute',
            justifyContent: 'center',
          }}
          sx={{ boxShadow: 9 }}
        >
          {salas !== undefined && salas.length > 0 ? (
            <CardContent sx={{ p: 5 }}>
              <Typography sx={{ mt: 0, mb: 4 }} variant='h4'>
                Máquinas
              </Typography>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                  <SelectComponent
                    data={salas}
                    handleSelected={handleSelect}
                    label='Sala'
                    withId='name'
                    propName='casino'
                    Width={300}
                  />
                </Grid>

                {casino !== undefined && models && (
                  <>
                    {models.length > 0 ? (
                      <>
                        <Grid item xs={12}>
                          <SelectComponent
                            data={models}
                            handleSelected={handleSelectModelo}
                            label='Modelo'
                            withId='model'
                            propName='model'
                            Width={300}
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <DatePicker
                            label='Fecha inicial'
                            value={fechaInicial}
                            onChange={(newValue) => {
                              setFechaInicial(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <DatePicker
                            label='Fecha Final'
                            value={fechaFinal}
                            onChange={(newValue) => {
                              setFechaFinal(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                      </>
                    ) : (
                      <h3>NO HAY MAQUINAS ENCONTRADAS</h3>
                    )}
                  </>
                )}
              </Grid>
              {models !== undefined && (
                <CardAltaMaquina
                  casino={casino}
                  modelo={modelo}
                  fechaInicial={formattedDate1}
                  fechaFinal={formattedDate2}
                  setFechaInicial={setFechaInicial}
                  setFechaFinal={setFechaFinal}
                />
              )}
            </CardContent>
          ) : (
            <>
              <h1>No hay data para mostrar</h1>
              <h5>Favor de registrar sucursales en la pestaña de Casinos</h5>
            </>
          )}
        </Card>
      </Container>
      <AddTerminalModelModal
        open={openAddTerminalModelModal}
        closeAction={closeAddTerminalModelModal}
        handleSubmit={handleAddModel}
        handleChangeName={setTerminalModelName}
        casinoValue={casinoId}
        setCasinoValue={setCasinoId}
        value={terminalModelName}
        casinosData={salas}
      />
      <AddInvoiceModal
        open={openInvoiceModal}
        closeAction={closeInvoiceModal}
        setTerminalModelValue={setTerminalModelId}
        handleSubmit={handleAddInvoice}
        handleChangeInvoice={setInvoice}
        casinosData={salas}
        value={terminalModelName}
        terminalsModelsData={terminalModels}
        setCasinoValue={setCasinoId}
      />
      {terminalModelToEdit && (
        <EditTerminalModelModal
          open={openModal}
          closeAction={closeModal}
          terminalModelValues={terminalModelToEdit}
        />
      )}
    </div>
  );
};
