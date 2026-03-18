// src/app/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "standard" | "premium" | "metal";
  cardStatus: "pending" | "active" | "blocked";
  balance: number;
  cardNumber?: string;
  cardExpiry?: string;
  cardColor?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mockados com mais vida e cor laranja
const mockUser: User = {
  id: "1",
  name: "João Silva",
  email: "joao@email.com",
  plan: "premium",
  cardStatus: "active",
  balance: 15420.50,
  cardNumber: "4289",
  cardExpiry: "12/26",
  cardColor: "from-orange-500 to-orange-600"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log("Login com:", email, password);
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}