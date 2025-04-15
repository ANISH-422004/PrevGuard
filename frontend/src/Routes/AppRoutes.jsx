import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../screens/home,/Home";
import Register from "../screens/Register/Register";
import Login from "../screens/Login/Login";
import OTP from "../screens/OTP/OTP";
import Dashboard from "../screens/Dashboard/Dashboard";
import Protected from "../HOC/Protected";
import Vault from "../screens/vault/Vault";
import FakeData from "../screens/fakeData/fakeData";
import BreachMonitor from "../screens/BreachMonitor/BreachMonitor";
import SharedApps from "../screens/SharedApps/SharedApps";
import ProfilePage from "../screens/profile/ProfilePage";
import VaultPasswordSetup from "../screens/vaultPasswordSetup/vaultPasswordSetup";
import UnlockVault from "../screens/unlockVault/UnlockVault";

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
      <Route
        path="/vault"
        element={
          <Protected>
            <Vault />
          </Protected>
        }
      />

      <Route
        path="/fake-data"
        element={
          <Protected>
            <FakeData />
          </Protected>
        }
      />

      <Route
        path="/breach-check"
        element={
          <Protected>
            <BreachMonitor />
          </Protected>
        }
      />

      <Route
        path="/shared-data"
        element={
          <Protected>
            <SharedApps />
          </Protected>
        }
      />

      <Route
        path="/profile"
        element={
          <Protected>
            <ProfilePage />
          </Protected>
        }
      />

      <Route
        path="/setupVaultPassword"
        element={
          <Protected>
            <VaultPasswordSetup />
          </Protected>
        }
      />

      <Route
        path="/vaultPassword"
        element={
          <Protected>
            <UnlockVault />
          </Protected>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
