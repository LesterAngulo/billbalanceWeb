import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { TabBar } from '../../components/TabBar/TabBar';
import { LogIn } from '../../views/auth/LogIn';
import { ProtectedRoute } from './ProtectedRoute';
export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <TabBar />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<LogIn />} />
      </Routes>
    </HashRouter>
  );
};
