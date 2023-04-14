import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
// components
import AuthPage from '../pages/AuthPage';

export default function AuthGuard({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <AuthPage />;
  }

  return <> {children} </>;
}
