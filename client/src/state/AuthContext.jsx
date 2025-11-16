import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (payload) => {
    // payload: { firstName, lastName, email, phone }
    setUser({
      id: "u_1",
      avatar: "https://i.pravatar.cc/100?img=22",
      ...payload,
    });
    const next = new URLSearchParams(location.search).get("next");
    navigate(next || "/dashboard", { replace: true });
  };

  const loginAsDemo = () =>
    login({
      firstName: "John",
      lastName: "Traveler",
      email: "john@example.com",
      phone: "+94 77 123 4567",
    });

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, loginAsDemo, logout, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}