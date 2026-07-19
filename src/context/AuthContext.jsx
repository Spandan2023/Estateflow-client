import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  const updateUser = (updatedUser) => {
  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);
};

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile(savedToken);

        setToken(savedToken);
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: Boolean(token && user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}