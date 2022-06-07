import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const SelectFacturacion = ({
  label,
  value,
  options,
  disable,
  handleChange,
  withId,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disable}
        value={[value]}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        label={label}
      >
        {options.map((punto) => (
          <MenuItem key={punto.id} value={punto[withId]}>
            {punto.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
