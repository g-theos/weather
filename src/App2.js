import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import RootLayout from './pages/Root';
import { useSelector } from 'react-redux';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <RootLayout>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <AuthPage />}
        />
        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
      </Routes>
    </RootLayout>
  );
};

export default App;