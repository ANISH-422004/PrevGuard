import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../screens/home,/Home";
import Register from "../screens/Register/Register";
import Login from "../screens/Login/Login";
import OTP from "../screens/OTP/OTP";
import Dashboard from "../screens/Dashboard/Dashboard";
import Protected from "../HOC/Protected";
import Vault from "../screens/vault/Vault";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTP />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route path="/vault"
        element={
          <Protected>
            <Vault />
          </Protected>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
