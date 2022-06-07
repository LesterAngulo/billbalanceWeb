import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
export default function InputAdornmentComponent(props) {
  const {
    label,
    values,
    onChange,
    type,
    tipo,
    placeHolder,
    width,
    required = false,
    disabled = false,
    normal = true,
  } = props;

  return (
    <FormControl required={required} sx={{ width: width }}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        disabled={disabled}
        value={values[type] !== undefined ? values[type] : ''}
        onChange={onChange}
        startAdornment={
          normal === true ? (
            <InputAdornment position='start'>$</InputAdornment>
          ) : (
            ''
          )
        }
        label='Amount'
        type={tipo}
        placeholder={placeHolder}
      />
    </FormControl>
  );
}
