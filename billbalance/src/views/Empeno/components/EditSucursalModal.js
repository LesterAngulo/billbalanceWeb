import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Alertas } from '../../../components/Alertas/Alertas';

export const EditSucursalModal = ({
  open,
  closeAction,
  casinoValues,
  title,
  setReload,
  type,
  handleEditSala,
}) => {
  const [casinoToEdit, setCasinoToEdit] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);

  const handleCloseAlert = () => setOpenAlert(false);

  const handleEditCasino = () => {
    setCasinoToEdit({ ...casinoToEdit });
    handleEditSala(casinoToEdit, casinoValues);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setCasinoToEdit(undefined);
          closeAction();
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form
          autoComplete='off'
          onSubmit={(e) => {
            e.preventDefault();
            handleEditCasino();
          }}
        >
          <Card sx={{ ...style, maxWidth: 800 }}>
            <CardHeader title={title} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label='Nombre'
                    name='nombre'
                    required
                    onChange={(e) => {
                      setCasinoToEdit({
                        ...casinoToEdit,
                        name: e.target.value,
                      });
                    }}
                    value={casinoToEdit ? casinoToEdit.name : casinoValues.name}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button
                children='Editar'
                color='primary'
                variant='contained'
                type='submit'
              />
            </Box>
          </Card>
        </form>
      </Modal>
      <Alertas
        Message={alertMessage}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        type={alertType}
      />
    </>
  );
};
