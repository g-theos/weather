import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authActions';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Title variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Weather
            </Link>
          </Title>
          <Button color="inherit">
            {!isLoggedIn && (
              <Link
                to="/auth"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Login
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to="/profile"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Profile
              </Link>
            )}
          </Button>
          <Button color="inherit">
            {isLoggedIn && (
              <Link
                to="/settings"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Settings
              </Link>
            )}
          </Button>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default MainNavigation;
