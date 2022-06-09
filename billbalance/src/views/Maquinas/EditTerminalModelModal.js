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
import React from 'react';

export const EditTerminalModelModal = ({
  open,
  closeAction,
  handleSubmit,
  terminalModelValues,
}) => {
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
    <Modal
      open={open}
      onClose={closeAction}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <form
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Card sx={{ ...style, maxWidth: 800 }}>
          <CardHeader title='Editar modelo de maquina' />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  disabled
                  fullWidth
                  label='Id'
                  name='id'
                  required
                  onChange={(e) => {}}
                  value={terminalModelValues.id}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label='Nombre'
                  name='nombre'
                  required
                  onChange={(e) => {}}
                  value={terminalModelValues.name}
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
  );
};
