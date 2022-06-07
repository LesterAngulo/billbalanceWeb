/* eslint-disable react-hooks/rules-of-hooks */
/* import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; */
import { Box, Divider, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ReportsMain } from './ReportsMain';

export const Reportes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [terminalModelName, setTerminalModelName] = useState(undefined);
  const [terminalModelId, setTerminalModelId] = useState(undefined);
  const [invoice, setInvoice] = useState(undefined);
  const [casinoId, setCasinoId] = useState(undefined);
  const [modalTitle, setModalTitle] = useState(undefined);
  const [modalType, setModalType] = useState(undefined);
  const [components, setComponents] = useState(undefined);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-m${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  useEffect(() => {
    if (value === 0) {
      setComponents({
        Report: 'mensual',
      });
    } else if (value === 1) {
      setComponents({
        Report: 'anual',
      });
    }
  }, [value]);

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Reportes</title>
      </Helmet>
      <Divider />
      <div>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
        >
          <Tab label='Mensual' />
          <Tab label='Anual' />
        </Tabs>
        <TabPanel value={value} index={0} />
        <TabPanel value={value} index={1} />
      </div>
      <ReportsMain {...components} />
    </div>
  );
};
