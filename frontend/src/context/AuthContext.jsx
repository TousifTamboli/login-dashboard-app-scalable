import { useState, useEffect } from "react";
import API from "../api/axios";
import { AuthContext } from "./sessionContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check session on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/api/user/profile");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
