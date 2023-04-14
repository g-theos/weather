import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1,
    label: '1°C',
  },
  {
    value: 2,
    label: '2°C',
  },
  {
    value: 3,
    label: '3°C',
  },
  {
    value: 4,
    label: '4°C',
  },
  {
    value: 5,
    label: '5°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderMarks(props) {

function changeHandler(event,newValue) {
  props.onChangeSettings(newValue);
}

  return (
    <Box m='auto' sx={{ width: 300 }}>
      <Slider
        aria-label="Temeperature Treshold"
        //defaultValue={threshold}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={1}
        max={5}
        value={props.value}
        onChange={changeHandler}
      />
    </Box>
  );
}