import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../screens/home,/Home";
import Register from "../screens/Register/Register";
import Login from "../screens/Login/Login";
import OTP from "../screens/OTP/OTP";
import Protected from "../HOC/Protected";
import Vault from "../screens/vault/Vault";
import BreachMonitor from "../screens/BreachMonitor/BreachMonitor";
import SharedApps from "../screens/SharedApps/SharedApps";
import ProfilePage from "../screens/profile/ProfilePage";
import VaultPasswordSetup from "../screens/vaultPasswordSetup/vaultPasswordSetup";
import UnlockVault from "../screens/unlockVault/UnlockVault";
import BlogPage from "../screens/BlogPage/BlogPage";
import PasswordBreachCheck from "../screens/PasswordBreachCheck/PasswordBreachCheck";
import Fakedata from "../screens/fakeData/FakeData";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTP />} />
      <Route
        path="/password-strength-checker"
        element={
          <Protected>
              <PasswordBreachCheck/>
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
            <Fakedata />
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


        <Route
          path="/privacy-tips"
          element={
            <Protected>
              <BlogPage/>
            </Protected>
          }
        />

    </Routes>
  );
};

export default AppRoutes;
