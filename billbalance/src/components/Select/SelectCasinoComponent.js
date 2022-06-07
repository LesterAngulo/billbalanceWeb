import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export const SelectCasinoComponent = ({
  data,
  propName,
  handleSelected,
  defaultValue = '',
  label = '',
  withId,
  byID = false,
  Width = 400,
  disabled = false,
  val = undefined,
  showId = false,
  reset = undefined,
  required = false,
}) => {
  const [Dato, setDato] = useState(null);
  const value = (item) => {
    if (byID) return item.id;
    return item;
  };
  function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  let DatosProcesados = removeDuplicates(data, withId);
  useEffect(() => {
    if (data.length === 1) {
      handleSelected({
        target: { value: data[0], name: propName, id: data[0].id },
      });
      setDato(data[0].id);
    }
  }, []);

  const handleChange = (e) => {
    setDato(e.target.value);
    e.target.name = propName;
    handleSelected(e);
  };

  return (
    <FormControl
      fullWidth={Width === 'full' ? true : false}
      focused={
        label === 'Casino' && val === undefined && data.length > 0
          ? true
          : false
      }
      style={{ minWidth: Width === 'full' ? false : Width }}
    >
      {data.length > 0 ? (
        <>
          <InputLabel>{label}</InputLabel>
          <Select
            style={{ height: 55 }}
            variant='outlined'
            value={
              val === undefined && reset === true ? null : Dato ?? defaultValue
            }
            onChange={handleChange}
            disabled={disabled}
          >
            {DatosProcesados.map((item) => {
              return (
                <MenuItem key={item.id} value={value(item)}>
                  {showId ? item.id + ' ' : undefined}
                  {item[withId] === null ? 'sin nombre' : '' + item[withId]}
                </MenuItem>
              );
            })}
          </Select>
        </>
      ) : data.length > 0 && data[0].hasOwnProperty('name') ? (
        <TextField label={label} defaultValue={data[0].name} disabled={true} />
      ) : (
        <TextField label={label} disabled={true} />
      )}
    </FormControl>
  );
};
