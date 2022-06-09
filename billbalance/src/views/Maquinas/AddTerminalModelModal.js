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
import { SelectComponent } from '../../components/Select/SelectComponent';

export const AddTerminalModelModal = ({
  handleChangeName = undefined,
  value,
  open,
  closeAction,
  handleSubmit,
  casinosData,
  casinoValue,
  setCasinoValue,
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
    <Modal open={open} onClose={closeAction}>
      <Box sx={style}>
        <form
          autoComplete='off'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Card sx={{ maxWidth: 800 }}>
            <CardHeader title='Agregar nuevo modelo de maquina' />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {handleChangeName != undefined && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Nombre'
                      name='serial_number'
                      required
                      onChange={(e) => {
                        handleChangeName(e.target.value);
                      }}
                      value={value}
                      variant='outlined'
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <SelectComponent
                    label='Seleccione casino'
                    value={casinoValue}
                    options={casinosData}
                    handleChange={setCasinoValue}
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
                children='Agregar'
                color='primary'
                variant='contained'
                type='submit'
              />
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};
