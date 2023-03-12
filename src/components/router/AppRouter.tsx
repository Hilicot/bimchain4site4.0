import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';
import FilesPage from '@app/pages/FilesPage';


const UserManagementPage = React.lazy(() => import('@app/pages/UserManagementPage'));
import GanttPage from '@app/pages/GanttPage'; // TODO make lazy loading
//const GanttPage = React.lazy(() => import('@app/pages/GanttPage'));
const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));

const Logout = React.lazy(() => import('./Logout'));

export const DASHBOARD_PATH = '/';

const Files = withLoading(FilesPage);
const UserManagement = withLoading(UserManagementPage);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

// TODO #3 remove additional files that are not used anymore

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={DASHBOARD_PATH} element={protectedLayout}>
          <Route index element={<Files />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="gantt" element={<GanttPage />} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
