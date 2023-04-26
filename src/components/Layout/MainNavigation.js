import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authActions';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import TemporaryDrawer from './MainDrawer';
import { useState, useEffect } from 'react';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [tempDrawer, setTempDrawer] = useState(false);

  const iconButtonHandler = () => {
    if (isLoggedIn) {
      setTempDrawer((tempDrawer) => !tempDrawer);
    }
  };

  const logoutHandler = (value) => {
    dispatch(logout());
  };

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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
            onClick={iconButtonHandler}
          >
            <MenuIcon />
            {tempDrawer && isLoggedIn && (
              <TemporaryDrawer logoutHandler={logoutHandler} />
            )}
          </IconButton>
          <Title variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Weather
            </Link>
          </Title>
          {windowSize > 480 && (
            <>
              <Button color="inherit">
                {/* {!isLoggedIn && (
              <Link
                to="/auth"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Login
              </Link>
            )} */}
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default MainNavigation;
