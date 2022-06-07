import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const ReportSelect = ({
  label,
  value,
  options,
  disable,
  handleChange,
  withId,
  Report,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disable}
        value={value}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        label={label}
      >
        {options.map((punto) => {
          const disabled = () => {
            if (Report === 'mensual') {
              if (punto.id === 0 || punto.id === 1) {
                return true;
              }
            }
          };
          return (
            <MenuItem
              disabled={disabled()}
              key={punto.id}
              value={punto[withId]}
            >
              {punto.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
