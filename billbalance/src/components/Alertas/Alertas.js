import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const Alertas = ({
  Message,
  openAlert,
  Duration,
  handleCloseAlert,
  type,
}) => {
  return (
    <>
      <Snackbar
        key={Message}
        open={openAlert}
        autoHideDuration={Duration}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={type}>
          {Message}
        </Alert>
      </Snackbar>
    </>
  );
};
