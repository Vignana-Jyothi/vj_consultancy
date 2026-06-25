import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProjects from './pages/MyProjects/MyProjects';
import AddProject from './pages/AddProject/AddProject';
import BrowseProjects from './pages/BrowseProject/BrowseProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/browse-projects" element={<BrowseProjects />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
