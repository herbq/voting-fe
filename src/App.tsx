import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/base/header/header.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/machines" element={<AuthGuard><MachinesPage /></AuthGuard>} /> */}
          {/* <Route path="/manage-food" element={<AuthGuard><ManageFoodPage /></AuthGuard>} /> */}
          {/* <Route path="/management" element={<AuthGuard><Navigate to="/management/dashboard" /></AuthGuard>} /> */}
          {/* <Route path="/management/:section" element={<AuthGuard><ManagementPage /></AuthGuard>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
