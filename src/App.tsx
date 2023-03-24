import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthGuard from './components/base/auth-guard/auth-guard.component';
import Header from './components/base/header/header.component';
import NotificationProvider from './components/base/notification/notification-container/notification-container.component';
import UserProvider from './contexts/user.context';
import ElectionsPage from './pages/elections/elections.component';
import LoginPage from './pages/login/login.component';

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <UserProvider>
          <BrowserRouter>
            <Header></Header>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              {/* <Route path="/home" element={<HomePage />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/elections" element={<ElectionsPage />} />
              {/* <Route path="/machines" element={<AuthGuard><MachinesPage /></AuthGuard>} /> */}
              {/* <Route path="/manage-food" element={<AuthGuard><ManageFoodPage /></AuthGuard>} /> */}
              {/* <Route path="/management" element={<AuthGuard><Navigate to="/management/dashboard" /></AuthGuard>} /> */}
              {/* <Route path="/management/:section" element={<AuthGuard><ManagementPage /></AuthGuard>} /> */}
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
