import { Provider } from 'react-redux';
import store from './store/store';
import AuthPage from './pages/AuthPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RootLayout from './pages/Root';
import ProfilePage from './pages/ProfilePage';
import AuthGuard from './guards/AuthGuard';
import SettingsPage from './pages/SettingsPage';
//import Weather from './components/WeatherMUI3';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        ),
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'profile',
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
