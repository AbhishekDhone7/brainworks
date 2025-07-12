import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
    isAdmin: false,
  });

  const fetchAuth = async (type = "auto") => {
    setAuth((prev) => ({ ...prev, loading: true }));

    try {
      if (type === "user" || type === "auto") {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/valid_user/me`,
          { withCredentials: true }
        );
        return setAuth({
          loading: false,
          isAuthenticated: true,
          user: res.data.user,
          isAdmin: false,
        });
      }
    } catch {}

    try {
      if (type === "admin" || type === "auto") {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/valid_admin/me`,
          { withCredentials: true }
        );
        return setAuth({
          loading: false,
          isAuthenticated: true,
          user: res.data.admin,
          isAdmin: true,
        });
      }
    } catch {}

    // fallback (unauthorized)
    setAuth({
      loading: false,
      isAuthenticated: false,
      user: null,
      isAdmin: false,
    });
  };

  useEffect(() => {
    fetchAuth("auto");
  }, []);

  const login = (userData, isAdmin = false) => {
    setAuth({
      loading: false,
      isAuthenticated: true,
      user: userData,
      isAdmin,
    });
  };

  const logout = () => {
    // Clear cookies
    document.cookie = "usertoken=; Max-Age=0; path=/";
    document.cookie = "admintoken=; Max-Age=0; path=/";

    // Clear state
    setAuth({
      loading: false,
      isAuthenticated: false,
      user: null,
      isAdmin: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, fetchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
