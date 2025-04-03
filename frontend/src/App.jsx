import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar/NavBar";
import Protected from "./HOC/Protected";

const App = () => {
  return (
    <div>
      <NavBar />

      <AppRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
