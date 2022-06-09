import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Modal,
} from '@mui/material';
import React from 'react';

export const EditTerminalModelModal = ({ open, closeAction, handleSubmit }) => {
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
          <CardHeader title='Editar modelo de terminal' />
          <Divider />
          <CardContent></CardContent>
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
