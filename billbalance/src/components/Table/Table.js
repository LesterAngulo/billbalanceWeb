import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from '../../components/hooks/useForm';
import { getBy } from '../../components/selectors/getCustomerByName';

const TableComponent = ({
  history,
  data,
  name,
  search = true,
  view = true,
  deleteElement,
  newColumns,
  edit = false,
  handleEditId,
  handleEdit,
  handleDeleteElement,
  padre,
  pagination = true,
  dataPerPage = 10,
  type,
  translatedName,
  cellToHide = null,
}) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(dataPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const location = useLocation();

  const searchElement = new URLSearchParams(location.search);

  const q = searchElement.toString().substring(2);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    setFiltered(true);
    history.push(`?q=${searchText}`);
    setPage(0);
  };

  const customersFiltered = useMemo(() => getBy(q, rows), [q, rows]);

  useEffect(() => {
    if (data.length > 0) {
      setRows(data);
      if (newColumns !== undefined && newColumns.length > 0) {
        setColumns(newColumns);
      } else return setColumns(Object.keys(data[0]));
    }
  }, [data, newColumns]);

  return (
    <div>
      {data.length > 0 && (
        <Container maxWidth={false} sx={{ pt: 3 }}>
          {search && (
            <Box>
              <Card>
                <CardContent>
                  <form onSubmit={handleSearch}>
                    <div
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      <TextField
                        type='text'
                        placeholder={'Buscar...'}
                        name='searchText'
                        autoComplete='off'
                        value={searchText}
                        onChange={handleInputChange}
                      />
                      <Button type='submit' variant='contained'>
                        Buscar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Box>
          )}
          <Box sx={{ boxShadow: 6 }}>
            <Card>
              {/* <PerfectScrollbar> */}
                <Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map(({ id, field, headerName }) => {
                          if (cellToHide === field) return null;
                          return (
                            <TableCell align='right' key={id}>
                              {headerName}
                            </TableCell>
                          );
                        })}
                        {view && <TableCell> </TableCell>}
                        {edit && <TableCell> </TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(!filtered ? rows : customersFiltered)
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((items, id) => (
                          <TableRow hover key={id}>
                            {Object.entries(items).map(
                              ([key, value], index) => {
                                if (cellToHide === key)
                                  return (
                                    <TableCell
                                      sx={{ width: '0%' }}
                                      key={index}
                                      value={value}
                                    ></TableCell>
                                  );
                                return (
                                  <TableCell key={index}>{value}</TableCell>
                                );
                              },
                            )}
                            {view && (
                              <TableCell>
                                <Link
                                  to={`/${name}/${items.id}`}
                                  style={{ textDecoration: 'none' }}
                                >
                                  <Button variant='contained'>Mostrar</Button>
                                </Link>
                              </TableCell>
                            )}
                            {edit && (
                              <TableCell>
                                <Button
                                  variant='contained'
                                  onClick={() => {
                                    handleEdit(items);
                                  }}
                                >
                                  Editar
                                </Button>
                              </TableCell>
                            )}
                            {deleteElement === true && (
                              <TableCell>
                                <Button
                                  variant='contained'
                                  color='error'
                                  onClick={() => {
                                    handleDeleteElement(items);
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              {/* </PerfectScrollbar> */}
              {pagination && (
                <div>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={!filtered ? rows.length : customersFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              )}
            </Card>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default TableComponent;
