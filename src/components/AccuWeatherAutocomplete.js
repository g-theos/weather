import React, { useState,useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { ACCUWEATHER_API_KEY } from '../global-config';

const AccuWeatherAutocomplete = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHandler = async (event, value) => {
    setLoading(true);
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}&q=${value}`
    );
    const data = await response.json();
    setOptions(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(options);
  }, [options]);

  const renderOptionHandler = (option) => (
    <div>
      {option.LocalizedName}, {option.Country.LocalizedName}
    </div>
  );

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.LocalizedName}
      renderOption={renderOptionHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search City"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onInputChange={searchHandler}
    />
  );
};

export default AccuWeatherAutocomplete;
