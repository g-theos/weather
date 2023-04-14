import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RootLayout from './pages/Root';

function App() {
const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <RootLayout>
      <Routes>
        <Route path="/">
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        <Route path='*'>
          <Navigate to='/' />
        </Route>
      </Routes>
    </RootLayout>
  );
}

export default App;