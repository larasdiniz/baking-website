// src/app/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Cards } from "./pages/Cards";
import { Transactions } from "./pages/Transactions";
import { Analytics } from "./pages/Analytics";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { RequestNewCard } from "./pages/RequestNewCard";
import { RequestSuccess } from "./pages/RequestSuccess";
import { ReplaceCard } from "./pages/ReplaceCard";
import { ReplaceSuccess } from "./pages/ReplaceSuccess";
import { CardDetails } from "./pages/CardDetails";

// Componente para rotas protegidas
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas com MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rotas protegidas com DashboardLayout */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cards" element={<Cards />} />
        <Route path="cards/request-new" element={<RequestNewCard />} />
        <Route path="cards/request-success" element={<RequestSuccess />} />
        <Route path="cards/replace" element={<ReplaceCard />} />
        <Route path="cards/replace-success" element={<ReplaceSuccess />} />
        <Route path="cards/:cardId" element={<CardDetails />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}