import React, { useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Alert } from '@mui/material';
import useHttp from '../hooks/useHttp';

const AccuWeatherAutocomplete = (props) => {
  const [options, setOptions] = useState([]);
  //const [loading, setLoading] = useState(false);
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  const searchHandler = async (event, value) => {
    if (value) {
      const fetchAutocompleteData = (data) => {
        setOptions(data);
        console.log(data);
      };
      fetchData(
        {
          url: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${value}`,
        },
        fetchAutocompleteData
      );
    } else setOptions([]);
  };

  const changeHandler = (event, value) => {
    props.onAutocompleteChange(value);
    console.log(value);
  };

  const renderOptionHandler = (props, option) => (
    <div {...props} key={option.Key}>
      {option.LocalizedName}, {option.Country.LocalizedName},{' '}
      {option.AdministrativeArea.LocalizedName}
    </div>
  );

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Autocomplete
        sx={{ margin: '2rem' }}
        options={options || []}
        loading={isLoading}
        getOptionLabel={(option) => option.LocalizedName}
        renderOption={renderOptionHandler}
        isOptionEqualToValue={(option, value) => option.Key === value.Key}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onInputChange={searchHandler}
        onChange={changeHandler}
      />
    </>
  );
};

export default AccuWeatherAutocomplete;
