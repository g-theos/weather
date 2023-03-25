import React, { useState, useEffect } from 'react';
//import { useTheme } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';

function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [lastViewedTime, setLastViewedTime] = useState(null);

  useEffect(() => {
    // Fetch weather data when component mounts
    fetch('https://dataservice.accuweather.com/forecasts/v1/daily/5day/182536?apikey=8e35R3jrbHwahNGlNy73QFIv0rTUWre7&metric=true')
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        setLastViewedTime(Date.now());
      })
      .catch(error => console.log(error));

    // Check weather condition after a delay
    const delay = 60 * 1000; // 1 minute delay
    const interval = setInterval(() => {
      if (lastViewedTime !== null) {
        fetch('https://dataservice.accuweather.com/currentconditions/v1/182536?apikey=8e35R3jrbHwahNGlNy73QFIv0rTUWre7')
          .then(response => response.json())
          .then(data => {
            const currentCondition = data[0].WeatherText;
            const maxCondition = weatherData.DailyForecasts[0].Day.IconPhrase;
            const threshold = 2; // customizable threshold
            const conditionDifference = (currentCondition !== maxCondition);

            if (conditionDifference) {
              // Send notification
              const title = 'Weather Alert';
              const options = {
                body: `Current weather condition is ${currentCondition}, which differs from the maximum condition by ${conditionDifference}`
              };
              new Notification(title, options);
            }
          })
          .catch(error => console.log(error));
      }
    }, delay);

    // Clean up interval when component unmounts
    return () => clearInterval(interval);
  }, [lastViewedTime]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Weather for Athens, Greece
        </Typography>
        {weatherData.Headline && (
          <div>
            <Typography variant="body2" color="text.secondary">
              {weatherData.Headline.Text}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Temperature: {weatherData.DailyForecasts[0].Temperature.Maximum.Value}°{weatherData.DailyForecasts[0].Temperature.Maximum.Unit}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Condition: {weatherData.DailyForecasts[0].Day.IconPhrase}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Weather;