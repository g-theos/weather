import React, { useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { ACCUWEATHER_API_KEY } from '../global-config';

const AccuWeatherAutocomplete = (props) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}&q=Athens`
      );
      const data = await response.json();
      setOptions(data);
      console.log(data);
      setLoading(false);
    }
    fetchData();
  }, []); */

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

  const changeHandler = (event, value) =>  {
    props.onAutocompleteChange(value);
    console.log(value)
  }

  const renderOptionHandler = (props, option) => (
    <div {...props} key={option.Key}>
      {option.LocalizedName}, {option.Country.LocalizedName},{' '}
      {option.AdministrativeArea.LocalizedName}
    </div>
  );

  return (
    <Autocomplete sx={{margin: '2rem'}}
      options={options || []}
      loading={loading}
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
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onInputChange={searchHandler}
      onChange={changeHandler}
    />
  );
};

/* export default function AccuWeatherAutocomplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}&q=Athens`
      );
      const data = await response.json();

      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const renderOptionHandler = (props,option) => (
    <div {...props} key={option.id}>
      {option.LocalizedName}
      , {option.Country.LocalizedName}
    </div>
  );

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.LocalizedName === value.LocalizedName
      }
      getOptionLabel={(option) => option.LocalizedName}
      options={options}
      loading={loading}
      renderOption={renderOptionHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
} */

export default AccuWeatherAutocomplete;
