import "./App.css";
import { createContext, useState, useEffect } from "react";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import AppRoutes from "./AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { AppProvider } from "./context/AppProvider.jsx";
import useAppContext from "./hooks/useAppContext.jsx";

function App() {
  const { showAlert, setShowAlert, alertMode, alertDesc } = useAppContext();

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="flex-col min-h-screen h-screen justify-between">
            <Navbar />
            <div className="min-h-full">
              {alertMode &&
                alertMode !== "" &&
                alertDesc &&
                alertDesc !== "" && (
                  <div className="toast toast-top toast-end">
                    <div
                      className={`alert ${
                        alertMode === "error" ? "alert-info" : "alert-success"
                      }`}
                    >
                      <span>{alertDesc}</span>
                    </div>
                  </div>
                )}
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
