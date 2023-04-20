import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, TextField } from '@mui/material';
import { ACCUWEATHER_API_KEY } from '../global-config';
import { styled } from '@mui/material/styles';
import { formatDate } from './Utils/FormatDate';
import { FIREBASE_DATABASE_URL } from '../global-config';
import { useDispatch, useSelector } from 'react-redux';
import { setThreshold } from '../store/settingsActions';
import AccuWeatherAutocomplete from './AccuWeatherAutocomplete';

function Weather() {
  const [location, setLocation] = useState('');
  const [locationKey, setLocationKey] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [lastViewedTime, setLastViewedTime] = useState(null);
  const WeatherIcon = styled('img')({
    width: 100,
    //height: 100,
  });
  const userId = useSelector((state) => state.auth.userId);
  const threshold = useSelector((state) => state.settings.threshold); // customizable threshold

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(FIREBASE_DATABASE_URL + userId + '.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setThreshold(data.TempThreshold));
      })
      .catch((error) => console.log(error));
  }, []);

  const onAutocompleteChangeHandler = (value) => {
    if (value) {
      setLocationKey(value.Key);
      setLocation(`${value.LocalizedName}, ${value.Country.LocalizedName}, 
      ${value.AdministrativeArea.LocalizedName}`)
    } else {
      setLocationKey(null);
      setLocation('');
    }
  };

  useEffect(() => {
    /* // Fetch location key when component mounts or location changes

    fetch(
      `https://dataservice.accuweather.com/locations/v1/search?apikey=${ACCUWEATHER_API_KEY}&q=${location}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const key = data[0].Key;
          setLocationKey(key);
        } else {
          setLocationKey(null);
        }
      })
      .catch((error) => console.log(error)); */

    // Fetch weather data when location key is available
    if (locationKey !== null) {
      fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&metric=true`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLastViewedTime(Date.now());
          //console.log(new Date(lastViewedTime));
        })
        .catch((error) => console.log(error));
    }
  }, [locationKey]);

  useEffect(() => {
    // Check weather condition after a delay
    const delay = 60 * 60 * 1000; // 60 minute delay
    const interval = setInterval(() => {
      if (lastViewedTime !== null && locationKey !== null) {
        fetch(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&metric=true`
        )
          .then((response) => response.json())
          .then((data) => {
            const forecasts = data.DailyForecasts;
            const initialForecasts = weatherData.DailyForecasts;

            console.log(threshold);
            console.log(forecasts[0].Date);
            console.log(new Date(lastViewedTime));

            for (let i = 0; i < forecasts.length; i++) {
              for (let j = 0; j < initialForecasts.length; j++) {
                if (forecasts[i].EpochDate === initialForecasts[j].EpochDate) {
                  if (
                    Math.abs(
                      forecasts[i].Temperature.Minimum.Value -
                        initialForecasts[j].Temperature.Minimum.Value
                    ) > threshold
                  ) {
                    // Send notification
                    const title = 'Weather Alert';
                    const options = {
                      body: `Minimum temperature on ${formatDate(
                        forecasts[i].Date
                      )} has altered since ${new Date(lastViewedTime)} to ${
                        forecasts[i].Temperature.Minimum.Value
                      }°C`,
                    };
                    //new Notification(title, options);
                    alert(title + ' ' + options.body);
                  }
                  if (
                    Math.abs(
                      forecasts[i].Temperature.Maximum.Value -
                        initialForecasts[j].Temperature.Maximum.Value
                    ) > threshold
                  ) {
                    // Send notification
                    const title = 'Weather Alert';
                    const options = {
                      body: `Maximum temperature on ${formatDate(
                        forecasts[i].Date
                      )} has altered since ${new Date(lastViewedTime)} to ${
                        forecasts[i].Temperature.Maximum.Value
                      }°C`,
                    };
                    //new Notification(title, options);
                    alert(title + ' ' + options.body);
                  }
                  if (
                    forecasts[i].Day.IconPhrase !==
                    initialForecasts[j].Day.IconPhrase
                  ) {
                    // Send notification
                    const title = 'Weather Alert';
                    const options = {
                      body: `Weather conditions on ${formatDate(
                        forecasts[i].Date
                      )} has altered since ${new Date(lastViewedTime)} to ${
                        forecasts[i].Day.IconPhrase
                      }`,
                    };
                    //new Notification(title, options);
                    alert(title + ' ' + options.body);
                  }
                }
              }
            }
          })
          .catch((error) => console.log(error));
      }
    }, delay);

    // Clean up interval when component unmounts
    return () => clearInterval(interval); //Possibly need to make changes when worker functionality is enabled
  }, [lastViewedTime, locationKey, threshold, weatherData.DailyForecasts]);

  /* const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }; */

  return (
    <Card sx={{ maxWidth: 345, margin: '2rem' }}>
      <CardContent>
        <AccuWeatherAutocomplete margin={2}
          onAutocompleteChange={onAutocompleteChangeHandler}
        />
       {location && (<Typography variant="h5" component="div" align="center" m={2}>
          Weather for {location}
        </Typography>)}
       {/*   <TextField
          label="Location"
          variant="standard"
          value={location}
          onChange={handleLocationChange}
          margin="normal"
          fullWidth
        /> */}
        {location && weatherData.Headline && (
          <div>
            <Typography variant="body2" color="text.secondary" align='center'>
              {weatherData.Headline.Text}
            </Typography>
            {/*  <Typography variant="body1" color="text.primary" margin={2}>
              Temperature:{' '}
              {weatherData.DailyForecasts[0].Temperature.Maximum.Value}°
              {weatherData.DailyForecasts[0].Temperature.Maximum.Unit}
            </Typography>
            <Typography variant="body1" color="text.primary" margin={2}>
              Condition: {weatherData.DailyForecasts[0].Day.IconPhrase}
            </Typography> */}
          </div>
        )}
        <Typography
          variant="h5"
          color="text.primary"
          align="center"
          marginTop={4}
        >
          5 Day Forecast:
        </Typography>
        {location && weatherData.DailyForecasts &&
          weatherData.DailyForecasts.map((forecast, index) => {
            return (
              <Card key={index} sx={{ margin: 3 }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary" margin={2}>
                    {formatDate(forecast.Date)}
                  </Typography>

                  <WeatherIcon
                    src={`https://developer.accuweather.com/sites/default/files/${
                      forecast.Day.Icon < 10 ? '0' : ''
                    }${forecast.Day.Icon}-s.png`}
                    alt={forecast.Day.IconPhrase}
                  />

                  <Typography variant="body1" color="text.primary" margin={1}>
                    Max: {forecast.Temperature.Maximum.Value}°
                    {forecast.Temperature.Maximum.Unit} - Min:{' '}
                    {forecast.Temperature.Minimum.Value}°
                    {forecast.Temperature.Minimum.Unit}
                  </Typography>
                  <Typography variant="body1" color="text.primary" margin={1}>
                    {forecast.Day.IconPhrase}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </CardContent>
    </Card>
  );
}
export default Weather;
