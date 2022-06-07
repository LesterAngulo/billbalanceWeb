import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export const EditMaquinasModal = ({
  open,
  closeAction,
  editTerminal,
  maquinaValues,
}) => {
  console.log(maquinaValues);
  const [terminalToEdit, setTerminalToEdit] = useState(undefined);
  console.log(terminalToEdit);
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

  const handleEditTerminal = () => {
    console.log(terminalToEdit);
    console.log(maquinaValues);
    editTerminal(terminalToEdit, maquinaValues);
    /* setCasinoToEdit({ ...casinoToEdit });
    editTerminal(casinoToEdit, maquinaValues); */
  };

  useEffect(() => {
    setTerminalToEdit(maquinaValues);
  }, [maquinaValues]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setTerminalToEdit(undefined);
        closeAction();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <form
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          handleEditTerminal();
        }}
      >
        <Card sx={{ ...style, maxWidth: 800 }}>
          <CardHeader title='Editar maquina' />
          <Divider />
          <CardContent>
            <Grid container spacing={1.5} justifyContent='center'>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Nombre'
                  name='nombre'
                  required
                  onChange={(e) => {
                    setTerminalToEdit({
                      ...terminalToEdit,
                      name: e.target.value,
                    });
                  }}
                  value={
                    terminalToEdit ? terminalToEdit.name : maquinaValues.name
                  }
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Modelo'
                  name='model'
                  required
                  onChange={(e) => {
                    setTerminalToEdit({
                      ...terminalToEdit,
                      model: e.target.value,
                    });
                  }}
                  value={
                    terminalToEdit ? terminalToEdit.model : maquinaValues.model
                  }
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Numero de máquinas'
                  name='nomaquinas'
                  required
                  onChange={(e) => {
                    setTerminalToEdit({
                      ...terminalToEdit,
                      numero: e.target.value,
                    });
                  }}
                  value={
                    terminalToEdit
                      ? terminalToEdit.numero
                      : maquinaValues.numero
                  }
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1 }} variant='outlined'>
                  <OutlinedInput
                    fullWidth
                    value={
                      terminalToEdit
                        ? terminalToEdit.porcentajeParticipacion
                        : maquinaValues.porcentajeParticipacion
                    }
                    onChange={(e) => {
                      setTerminalToEdit({
                        ...terminalToEdit,
                        porcentajeParticipacion: e.target.value,
                      });
                    }}
                    endAdornment={
                      <InputAdornment position='end'>%</InputAdornment>
                    }
                    required
                    name='porcentajeParticipacion'
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                  <FormHelperText>Participación</FormHelperText>
                </FormControl>
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
