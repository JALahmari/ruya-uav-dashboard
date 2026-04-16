import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SystemProvider } from './contexts/SystemContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import FlightControl from './pages/FlightControl';
import Settings from './pages/Settings';
import Logs from './pages/Logs';

function App() {
  return (
    <AuthProvider>
      <SystemProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="flight-control" element={<FlightControl />} />
              <Route path="settings" element={
                <ProtectedRoute requiredRole="admin">
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="logs" element={
                <ProtectedRoute requiredRole="admin">
                  <Logs />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </SystemProvider>
    </AuthProvider>
  );
}

export default App;
