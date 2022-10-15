import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EventOrder from './pages/EventOrder/EventOrder';
import ProfessionalOrder from './pages/ProfessionalOrder/ProfessionalOrder';
import ProfessionalCustomer from './pages/ProfessionalCustomer/ProfessionalCustomer';
import AmateurOrder from './pages/AmateurOrder/AmateurOrder';
import AddCustomer from './pages/ProfessionalCustomer/AddCustomer';
import UpdateCustomer from './pages/ProfessionalCustomer/UpdateCustomer';
import AddAmateurOrder from './pages/AmateurOrder/AddAmateurOrder';
import ProfileCutomer from './pages/ProfessionalCustomer/ProfileCutomer';
export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/eventOrder" element={<EventOrder />} />
        <Route path="/professionalOrder" element={<ProfessionalOrder />} />
        <Route path="/professionalCustomer" element={<ProfessionalCustomer />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/professionalCustomer/updateCustomer/:id" element={<UpdateCustomer />} />
        <Route path="/amateurOrder" element={<AmateurOrder />} />
        <Route path="/addAmateurOrder" element={<AddAmateurOrder />} />
        <Route path="/editAmateurOrder/:id" element={<AddAmateurOrder />} />
        <Route path="/customerProfile/:id" element={<ProfileCutomer />} />
      </Routes>
    </>
  );
}
