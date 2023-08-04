import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  return (
    userId ? <Outlet /> : <Navigate to="/login" />
  );
}

export default PrivateRoutes;
