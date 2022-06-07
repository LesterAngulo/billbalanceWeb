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
import { CardAlta } from '../../components/Altas/cardAlta';
import TableComponent from '../../components/Table/Table';
import { EditSucursalModal } from './components/EditSucursalModal';

export const Empeno = ({ roles }) => {
  if (roles !== 'superadmin' && roles !== 'contador') {
    return <Navigate to='/inicio' />;
  }
  const axios = require('axios');
  const [value, setValue] = useState({});
  const [casinoToEdit, setCasinoToEdit] = useState({});
  const [reload, setReload] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const handleCloseModal = () => setOpenModal(false);
  const [sucursales, setSucursales] = useState(undefined);

  const handleCloseAlert = () => setOpenAlert(false);

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
        setSucursales(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reload]);

  const handleChange = (event) => {
    setValue({ name: event.target.value, nameid: crypto.randomUUID() });
  };
  const headCells = [{ id: 1, field: 'name', headerName: 'Nombre' }];

  const handleEdit = (e) => {
    setCasinoToEdit(e);
    setOpenModal(true);
  };
  const handleDeleteSucursal = (Info) => {
    axios
      .post(
        'https://billbalanceapif.azurewebsites.net/api/Branch/DeleteBranch',
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
  const handleEditSala = (newInfo, oldInfo) => {
    axios
      .post('https://billbalanceapif.azurewebsites.net/api/Branch/EditBranch', {
        id: oldInfo.id,
        name: newInfo.name,
        type: 'Empeño',
      })
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
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Empeño</title>
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
              Empeño
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <CardAlta
                  type='empeño'
                  title='Alta de Sucursales'
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
                {sucursales && headCells && (
                  <Box sx={{ width: 500 }}>
                    <TableComponent
                      data={sucursales}
                      search={false}
                      view={false}
                      edit={true}
                      newColumns={headCells}
                      deleteElement={true}
                      handleDeleteElement={handleDeleteSucursal}
                      handleEdit={handleEdit}
                      cellToHide='id'
                      PaginationR={true}
                      dataPerPage={5}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {casinoToEdit && (
        <EditSucursalModal
          type='Salas'
          title='Editar Sucursal'
          open={openModal}
          handleEditSala={handleEditSala}
          closeAction={handleCloseModal}
          casinoValues={casinoToEdit}
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
