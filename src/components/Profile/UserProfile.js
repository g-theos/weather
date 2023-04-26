import { Card, CardContent, Typography } from '@mui/material';
import ProfileForm from './ProfileForm';

const UserProfile = () => {
  return (
    <>
      <Card sx={{ maxWidth: 345, margin: '2rem' }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            Your User Profile
          </Typography>
          <ProfileForm />
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
