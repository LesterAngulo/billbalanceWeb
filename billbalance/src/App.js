import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react';
import { AppRouter } from './components/Routes/AppRouter';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppRouter />
      </LocalizationProvider>
    </>
  );
}

export default App;
