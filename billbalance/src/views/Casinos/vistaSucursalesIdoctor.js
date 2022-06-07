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
import {
  deleteSalasSucursales,
  editSucursal,
  getSucursalesIDoctor,
} from '../../configuration/firebase/Methods/Methods';
import { EditSucursalModalComponent } from '../Idoctor/Components/EditSucursalModalComponent';
import { CardAltaCasino } from './cardAltaCasino';
export const SucursalesIdoctor = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'soporte') {
    return <Navigate to='/inicio' />;
  }
  const [value, setValue] = useState({});
  const [sucursalToEdit, setSucursalToEdit] = useState({});
  const [reload, setReload] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleChange = (event) => {
    setValue({ name: event.target.value, nameid: crypto.randomUUID() });
  };
  const [salas, setSalas] = useState(undefined);

  useEffect(() => {
    getSucursalesIDoctor().then((data) => {
      data = data.map((item) => {
        return {
          name: item.name,
          nameid: item.nameid,
        };
      });
      setSalas(data);
    });
  }, [reload]);

  const headCells = [{ id: 1, field: 'name', headerName: 'Nombre' }];

  const handleEdit = (e) => {
    setSucursalToEdit(e);
    setOpenModal(true);
  };
  const handleEditSala = (newInfo, oldInfo) => {
    editSucursal(newInfo, oldInfo, 'SucursalesIDoctor').then((payload) => {
      if (payload === true) {
        setOpenAlert(true);
        setType('success');
        setMessage('Elemento editado correctamente');
        handleCloseModal();
        setReload((oldR) => oldR + 1);
      }
    });
  };
  const handleDeleteSucursal = (Info) => {
    deleteSalasSucursales(Info, 'SucursalesIDoctor').then((payload) => {
      if (payload === true) {
        setOpenAlert(true);
        setType('success');
        setMessage('Elemento eliminado correctamente');
        setReload((oldR) => oldR + 1);
      }
    });
  };
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion - Idoctor</title>
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
              IDoctor
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <CardAltaCasino
                  type='sucursal'
                  value={value}
                  handleChange={handleChange}
                  setValue={setValue}
                  setReload={setReload}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {salas && headCells && (
                  <Box sx={{ width: 500 }}>
                    <TableComponent
                      data={salas}
                      search={false}
                      view={false}
                      edit={true}
                      newColumns={headCells}
                      deleteElement={true}
                      handleDeleteElement={handleDeleteSucursal}
                      handleEdit={handleEdit}
                      pagination={true}
                      dataPerPage={5}
                      cellToHide='nameid'
                      tableTitle='Salas'
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {sucursalToEdit && (
        <EditSucursalModalComponent
          type='Sucursales'
          title='Editar sucursal'
          open={openModal}
          closeAction={handleCloseModal}
          handleSubmit={handleEditSala}
          casinoValues={sucursalToEdit}
          setReload={setReload}
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
