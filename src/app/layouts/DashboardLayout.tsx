// src/app/layouts/DashboardLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, MobileSidebar } from "../components/Sidebar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Sidebar Mobile (aparece apenas em telas pequenas) */}
      <MobileSidebar />

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar simples */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-end">
          {/* Você pode adicionar notificações, perfil, etc aqui */}
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet /> {/* Aqui vai renderizar Dashboard, Cards, etc */}
        </main>
      </div>
    </div>
  );
}