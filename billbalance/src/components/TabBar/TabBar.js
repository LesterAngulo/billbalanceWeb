import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CasinoIcon from '@mui/icons-material/Casino';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import StoreIcon from '@mui/icons-material/Store';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TocIcon from '@mui/icons-material/Toc';
import {
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Casinos } from '../../views/Casinos/vistaCasinos';
import { MovimientosIdoctor } from '../../views/Casinos/vistaIdoctor';
import { Maquinas } from '../../views/Casinos/vistaMaquinas';
import { Empeno } from '../../views/Empeno/vistaEmpeño';
import { Indicadores } from '../../views/Empeno/vistaIndicadores';
import { MovimientosDiarios } from '../../views/Empeno/vistaMovimientosDiarios';
import { VistaTablaMovimientosDiarios } from '../../views/Empeno/vistaTablaMovimientosDiarios';
import { VistaTablaMovimientosDiariosEmpeno } from '../../views/Empeno/VistaTablaMovimientosDiariosEmpeno';
import { SucursalesIdoctor } from '../../views/Idoctor/vistaSucursalesIdoctor';
import { AltaMaquinas } from '../../views/Machines/VistaAltaMaquinas';
import { Reportes } from '../Reports/vistaReportes';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const TabBar = () => {
  const navigate = useNavigate();
  let roles = localStorage.getItem('role');
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
    setOpen2(false);
    setOpen3(false);
  };
  const handleClick2 = () => {
    setOpen1(false);

    setOpen2(!open2);
    setOpen3(false);
  };
  const handleClick3 = () => {
    setOpen1(false);

    setOpen2(false);
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen1(false);

    setOpen2(false);
    setOpen3(false);
    setOpen4(!open4);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    axios
      .post('https://billbalanceapif.azurewebsites.net/api/User/Login', {
        userName: '',
        password: '',
        as: '',
      })
      .then(function (response) {
        navigate('/login');
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' content='Nested component' />
        <title>Sistema de Gestion</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar
            sx={{
              background:
                'linear-gradient(52deg, rgb(0,199,190) 0%, rgb(102,212,207) 70%, rgb(64,200,224) 100%)',
            }}
          >
            <Grid
              container
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
            >
              <Grid item>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant='h6' noWrap component='div'>
                  Sistema de Gestion
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
            >
              <Grid item>
                <Button
                  sx={{ backgroundColor: '#EDBB64' }}
                  onClick={handleLogOut}
                  variant='contained'
                  color='error'
                >
                  <LogoutIcon />
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List disablePadding={true}>
            {(roles === 'superadmin' || roles === 'contador') && (
              <>
                {/* empeño */}
                <ListItemButton
                  style={{ padding: 0 }}
                  selected={selectedIndex === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ListItemButton
                    onClick={(event) => {
                      // event.stopPropagation();
                      navigate('empeno');
                      handleListItemClick(event, 0);
                    }}
                  >
                    <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant='h6'>Empeño</Typography>}
                    />
                  </ListItemButton>
                  <IconButton
                    onClick={handleClick1}
                    disableRipple
                    sx={{
                      backgroundColor: 'transparent',
                      '&.MuiButtonBase-root:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                    children={open1 ? <ExpandLess /> : <ExpandMore />}
                  />
                </ListItemButton>

                <Collapse in={open1} timeout='auto' unmountOnExit>
                  {/* movimientos diarios empeño*/}
                  <div>
                    <ListItemButton
                      selected={selectedIndex === 1}
                      onClick={(event) => {
                        handleListItemClick(event, 1);
                        navigate('movimientosdiarios');
                      }}
                    >
                      <ListItemIcon
                        sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                      >
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                        }}
                        primary={<Typography>Movimientos Diarios</Typography>}
                      />
                    </ListItemButton>
                  </div>
                  {/* tabla movimientos diarios empeño*/}
                  <div>
                    <ListItemButton
                      selected={selectedIndex === 21}
                      onClick={(event) => {
                        handleListItemClick(event, 21);
                        navigate('tablamovimientosdiariosempeno');
                      }}
                    >
                      <ListItemIcon
                        sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                      >
                        <TocIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                        }}
                        primary={<Typography>Tabla Movimientos</Typography>}
                      />
                    </ListItemButton>
                  </div>
                  {/* Indicadores*/}
                  <div>
                    <ListItemButton
                      selected={selectedIndex === 2}
                      onClick={(event) => {
                        handleListItemClick(event, 2);
                        navigate('indicadores');
                      }}
                    >
                      <ListItemIcon
                        sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                      >
                        <TocIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                        }}
                        primary={<Typography>Indicadores</Typography>}
                      />
                    </ListItemButton>
                  </div>
                </Collapse>
                <Divider />
              </>
            )}

            {(roles === 'superadmin' || roles === 'soporte') && (
              <>
                {/* Casinos */}
                <ListItemButton
                  style={{ padding: 0 }}
                  selected={selectedIndex === 3}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ListItemButton
                    onClick={(event) => {
                      navigate('casinos');

                      handleListItemClick(event, 3);
                    }}
                  >
                    <ListItemIcon>
                      <CasinoIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant='h6'>Casinos</Typography>}
                    />
                  </ListItemButton>
                  <IconButton
                    onClick={handleClick2}
                    disableRipple
                    sx={{
                      backgroundColor: 'transparent',
                      '&.MuiButtonBase-root:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                    children={open2 ? <ExpandLess /> : <ExpandMore />}
                  />
                </ListItemButton>

                <Collapse in={open2} timeout='auto' unmountOnExit>
                  {/* Maquinas */}
                  <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => {
                      handleListItemClick(event, 4);
                      navigate('maquinas');
                    }}
                  >
                    <ListItemIcon
                      sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                    >
                      <PointOfSaleIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                      primary={<Typography>Movimiento Máquina</Typography>}
                    />
                  </ListItemButton>
                  {/* TablaMaquinas */}
                  <ListItemButton
                    selected={selectedIndex === 20}
                    onClick={(event) => {
                      handleListItemClick(event, 20);
                      navigate('tablamaquinas');
                    }}
                  >
                    <ListItemIcon
                      sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                    >
                      <TocIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                      primary={<Typography>Tabla Máquinas</Typography>}
                    />
                  </ListItemButton>
                  {/* alta maquinas */}
                  <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={(event) => {
                      handleListItemClick(event, 5);
                      navigate('altaMaquinas');
                    }}
                  >
                    <ListItemIcon
                      sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                    >
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                      primary={<Typography>Alta Maquinas</Typography>}
                    />
                  </ListItemButton>
                </Collapse>
                <Divider />

                {/* Idoctor */}
                <ListItemButton
                  style={{ padding: 0 }}
                  selected={selectedIndex === 7}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ListItemButton
                    onClick={(event) => {
                      // event.stopPropagation();
                      navigate('idoctor');
                      handleListItemClick(event, 7);
                    }}
                  >
                    <ListItemIcon>
                      <SmartphoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant='h6'>IDoctor</Typography>}
                    />
                  </ListItemButton>
                  <IconButton
                    onClick={handleClick4}
                    disableRipple
                    sx={{
                      backgroundColor: 'transparent',
                      '&.MuiButtonBase-root:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                    children={open4 ? <ExpandLess /> : <ExpandMore />}
                  />
                </ListItemButton>

                <Collapse in={open4} timeout='auto' unmountOnExit>
                  {/* movimientos idoctor */}
                  <ListItemButton
                    selected={selectedIndex === 8}
                    onClick={(event) => {
                      handleListItemClick(event, 8);
                      navigate('movimientosidoctor');
                    }}
                  >
                    <ListItemIcon
                      sx={{ flexDirection: 'row-reverse', pr: '18px' }}
                    >
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                      primary={<Typography>Movimientos Diarios</Typography>}
                    />
                  </ListItemButton>
                </Collapse>
                <Divider />

                {/* reportes */}
                {(roles === 'superadmin' || roles === 'soporte') && (
                  <>
                    <ListItemButton
                      style={{ padding: 0 }}
                      selected={selectedIndex === 9}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('reportes');
                      }}
                    >
                      <ListItemButton
                        onClick={(event) => {
                          // event.stopPropagation();
                          handleListItemClick(event, 9);
                        }}
                      >
                        <ListItemIcon>
                          <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant='h6' sx={{ marginRight: 5 }}>
                              Reportes
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItemButton>
                    <Divider />
                  </>
                )}
              </>
            )}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            {/* <Route path='/*' element={<Inicio />} /> */}
            <Route
              path='/movimientosdiarios'
              element={<MovimientosDiarios roles={roles} />}
            />
            <Route
              path='/tablamovimientosdiariosempeno'
              element={<VistaTablaMovimientosDiariosEmpeno roles={roles} />}
            />
            {/* <Route
              path='/estadoresultados'
              element={<MovimientosGet roles={roles} />}
            /> */}
            <Route
              path='/indicadores'
              element={<Indicadores roles={roles} />}
            />
            <Route path='/casinos' element={<Casinos roles={roles} />} />
            <Route path='/empeno' element={<Empeno roles={roles} />} />
            <Route
              path='/idoctor'
              element={<SucursalesIdoctor roles={roles} />}
            />
            <Route
              path='/movimientosidoctor'
              element={<MovimientosIdoctor roles={roles} />}
            />
            <Route path='/maquinas' element={<Maquinas roles={roles} />} />
            <Route
              path='/altaMaquinas'
              element={<AltaMaquinas roles={roles} />}
            />
            <Route
              path='/tablamaquinas'
              element={<VistaTablaMovimientosDiarios roles={roles} />}
            />
            <Route path='/reportes' element={<Reportes />} />
          </Routes>
        </Main>
      </Box>
    </div>
  );
};
