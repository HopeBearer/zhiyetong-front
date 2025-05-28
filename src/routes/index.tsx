import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import TestPage from '../pages/TestPage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import { isLoggedIn } from '../services/auth';
import ChoosePage from '../pages/ChoosePage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/test/:grade"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/choose"
          element={
            <PrivateRoute>
              <ChoosePage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
} 