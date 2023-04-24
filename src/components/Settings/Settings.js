import { Card, CardContent, Typography, Alert, CircularProgress } from '@mui/material';
import DiscreteSliderMarks from './DiscreteSliderMarks';
import { useDispatch, useSelector } from 'react-redux';
import { setThreshold } from '../../store/settingsActions';
import useHttp from '../../hooks/use-http';

const Settings = () => {
  const dispatch = useDispatch();
  const threshold = useSelector((state) => state.settings.threshold);
  const userId = useSelector((state) => state.auth.userId);
  const { isLoading, error, sendRequest: fetchSettings } = useHttp();

  const changeSettingsHandler = (value) => {
    const setThresholdValue = () => dispatch(setThreshold(value));
    fetchSettings(
      {
        url: process.env.REACT_APP_FIREBASE_DATABASE_URL + userId + '.json',
        method: 'PATCH',
        body: { TempThreshold: value },
        headers: { 'Content-Type': 'application/json' },
      },
      setThresholdValue
    );
  };

  return (
    <Card sx={{ width: 345, margin: '2rem' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1" color="text.primary" marginBottom={4}>
          Set the temperature threshold
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading && <CircularProgress color="inherit" size={20} />}
        <DiscreteSliderMarks
          value={threshold}
          onChangeSettings={changeSettingsHandler}
        />
      </CardContent>
    </Card>
  );
};

export default Settings;
