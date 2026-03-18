// src/app/components/Sidebar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { 
  LayoutDashboard, CreditCard, Wallet, Settings, 
  LogOut, User, BarChart3, Menu, X, Home
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/dashboard/cards", icon: <CreditCard size={20} />, label: "Cards" },
    { path: "/dashboard/transactions", icon: <Wallet size={20} />, label: "Transactions" },
    { path: "/dashboard/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
    { path: "/dashboard/profile", icon: <User size={20} />, label: "Profile" },
    { path: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <aside className={`${mobile ? 'w-72' : 'w-72 hidden md:block'} bg-card border-r border-border p-6 h-full`}>
      {/* Logo - só o ícone laranja */}
      <Link to="/" onClick={onClose}>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Wallet size={20} />
          </div>
          <span className="text-xl font-black text-foreground">NovaBank</span>
        </div>
      </Link>

      {/* User info */}
      <div className="mb-8 p-4 bg-accent/30 rounded-xl">
        <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
        <p className="font-black text-foreground">{user?.name}</p>
        <p className="text-xs text-muted-foreground mt-2 capitalize">{user?.plan} plan</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} onClick={onClose}>
            <motion.div
              whileHover={{ x: 5 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span className={location.pathname === item.path ? "text-primary-foreground" : "text-orange-500"}>
                {item.icon}
              </span>
              <span className="font-bold">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>


      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full mt-8 font-bold"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

// Componente para mobile (com overlay)
export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir no mobile */}
      <button
        className="md:hidden fixed top-20 left-4 z-40 p-3 bg-card border border-border rounded-xl shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay e sidebar mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Overlay escuro */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute left-0 top-0 bottom-0"
          >
            <Sidebar mobile onClose={() => setIsOpen(false)} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}