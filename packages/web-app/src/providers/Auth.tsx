import moment from "moment";
import React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { cache } from "swr";

import useApi from "../hooks/useApi";

export type AuthContextType = {
  user: api.User | undefined;
  loading: boolean;
  login(jwt: string): Promise<void>;
  logout(): void;
  setUser(user: api.User): void;
};

export const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<api.User | undefined>(undefined);

  const fetchUser = useCallback(async () => {
    const jwt = window.localStorage.getItem("token");
    if (jwt) {
      const user = decodeJWT(jwt);
      if (moment.unix(user.exp).isBefore(moment())) {
        console.log("jwt has expired");
        logout();
      } else {
        const fetchUser = await api.fetchAuthUser();
        setUser(fetchUser);
      }
    }
    setLoading(false);
  }, [api]);

  const login = async (jwt: string) => {
    window.localStorage.setItem("token", jwt);
    const user = await api.fetchAuthUser();
    setUser(user);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser(undefined);
    cache.clear();
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  api.setCustomOnError((error: api.ErrorResponse) => {
    if (error.statusCode && error.reason) {
      const e: api.ErrorResponse = error;
      if (e.statusCode === 401) {
        logout();
      }
    }
  });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const decodeJWT = (jwt: string): api.DecodedAuthToken => {
  return JSON.parse(atob(jwt.split(".")[1]));
};
