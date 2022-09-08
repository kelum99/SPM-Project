import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EventOrder from './pages/EventOrder/EventOrder';
import ProfessionalOrder from './pages/ProfessionalOrder/ProfessionalOrder';
import ProfessionalCustomer from './pages/ProfessionalCustomer/ProfessionalCustomer';
import AmateurOrder from './pages/AmateurOrder/AmateurOrder';
import AddCustomer from './pages/ProfessionalCustomer/AddCustomer';
export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/eventOrder" element={<EventOrder />} />
        <Route path="/professionalOrder" element={<ProfessionalOrder />} />
        <Route path="/professionalCustomer" element={<ProfessionalCustomer />} />
        <Route path="/addCustomer" element={<AddCustomer/>} />
        <Route path="/amateurOrder" element={<AmateurOrder />} />
      </Routes>
    </>
  );
}
