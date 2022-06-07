/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { Alertas } from '../../components/Alertas/Alertas';
import TableComponent from '../../components/Table/Table';
import { AddMachines } from './AddMachines';
import { EditMaquinasModal } from './EditMaquinasModal';

export const AltaMaquinas = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [value, setValue] = useState({});
  const [maquinaToEdit, setMaquinasToEdit] = useState({});
  const [reload, setReload] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleChange = (prop) => (event) => {
    setValue({
      ...value,
      [prop]: event.target.value,
    });
  };
  const handleCloseAlert = () => setOpenAlert(false);

  const [machines, setMachines] = useState(undefined);

  useEffect(() => {
    if (Object.entries(value).length > 0) {
      axios
        .get(
          `https://billbalanceapif.azurewebsites.net/api/SlotMachine/GetSlotMachinesByCasino`,
          { params: { casino: value.casino } },
        )
        .then(function (response) {
          console.log(response.data);
          let data = response.data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              model: item.model,
              numero: item.numero,
              porcentajeParticipacion: item.porcentajeParticipacion,
            };
          });
          setMachines(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [value, reload]);

  const headCells = [
    { id: 1, field: 'name', headerName: 'Nombre' },
    { id: 1, field: 'model', headerName: 'Modelo' },
    { id: 1, field: 'numero', headerName: 'Número' },
    { id: 1, field: 'porcentajeParticipacion', headerName: 'Participación' },
  ];

  const handleEdit = (e) => {
    setOpenModal(true);
    setMaquinasToEdit(e);
  };
  const handleEditTerminal = (newInfo, oldInfo) => {
    console.log('1', oldInfo);
    axios
      .post(
        'https://billbalanceapif.azurewebsites.net/api/SlotMachine/EditSlotMachine',
        {
          casino: value.casino,
          id: oldInfo.id,
          model: newInfo.model,
          name: newInfo.name,
          numero: newInfo.numero,
          porcentajeParticipacion: parseInt(newInfo.porcentajeParticipacion),
        },
      )
      .then(function (response) {
        if (response.status === 200) {
          handleCloseModal();
          setOpenAlert(true);
          setMessage(response.data.message);
          setType('success');
          setReload((oldR) => oldR + 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // editTerminal(newInfo, oldInfo, 'Machines').then((payload) => {
    //   if (payload === true) {
    //     setOpenAlert(true);
    //     setType('success');
    //     setMessage('Elemento editado correctamente');
    //     setReload((oldR) => oldR + 1);
    //   }
    // });
  };

  const handleDeleteMachine = (Info) => {
    axios
      .post(
        'https://billbalanceapif.azurewebsites.net/api/SlotMachine/DeleteSlotMachine',
        {
          id: Info.id,
        },
      )
      .then(function (response) {
        if (response.status === 200) {
          handleCloseModal();
          setOpenAlert(true);
          setMessage(response.data.message);
          setType('success');
          setReload((oldR) => oldR + 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(maquinaToEdit);
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - Casinos</title>
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
          <CardContent sx={{ p: 5 }}>
            <Typography sx={{ mt: 0, mb: 4 }} variant='h4'>
              Alta de maquinas
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <AddMachines
                  value={value}
                  handleChange={handleChange}
                  setValue={setValue}
                  setReload={setReload}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {machines && headCells && (
                  <Box sx={{ width: 900 }}>
                    <TableComponent
                      cellToHide='nameid'
                      data={machines}
                      edit={true}
                      search={false}
                      view={false}
                      pagination={true}
                      dataPerPage={5}
                      newColumns={headCells}
                      deleteElement={true}
                      handleDeleteElement={handleDeleteMachine}
                      tableTitle='Máquinas'
                      handleEdit={handleEdit}
                      percentage='participacion'
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {maquinaToEdit && (
        <EditMaquinasModal
          setValue={setValue}
          open={openModal}
          closeAction={handleCloseModal}
          editTerminal={handleEditTerminal}
          maquinaValues={maquinaToEdit}
        />
      )}
      {openAlert && (
        <Alertas
          Message={message}
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          type={type}
        />
      )}
    </div>
  );
};
