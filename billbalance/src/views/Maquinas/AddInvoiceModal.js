import DatePicker from '@mui/lab/DatePicker';
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
import { BasicSelectComponent } from '../../components/Select/BasicSelectComponent';

export const AddInvoiceModal = ({
  handleChangeInvoice = undefined,
  open,
  closeAction,
  handleSubmit,
  sucursales = undefined,
  terminalsModelsData = undefined,
  casinoValue,
  setCasinoValue,
  terminalModelValue = undefined,
  setTerminalModelValue = undefined,
  date = undefined,
  setDate = undefined,
  handleChange,
  value,
}) => {
  const [status, setStatus] = useState(undefined);
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
  const StatusOptions = [
    { id: 0, name: 'Pagada' },
    { id: 1, name: 'Pagada' },
    { id: 2, name: 'Pagada' },
    { id: 3, name: 'Pagada' },
  ];
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
          <CardHeader title='Agregar facturación de maquina' />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BasicSelectComponent
                  label='Casino'
                  value={casinoValue}
                  options={sucursales}
                  handleChange={setCasinoValue}
                />
              </Grid>
              <Grid item xs={12}>
                <BasicSelectComponent
                  label='Seleccione modelo'
                  value={terminalModelValue}
                  options={terminalsModelsData}
                  handleChange={setTerminalModelValue}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label='Fecha'
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              {terminalModelValue !== undefined && (
                <Grid item xs={12}>
                  <BasicSelectComponent
                    options={StatusOptions}
                    handleChange={setStatus}
                    label='Estatus'
                    value={status}
                  />
                </Grid>
              )}
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
    </Modal>
  );
};
