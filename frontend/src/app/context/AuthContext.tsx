import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserApi, signInApi, signUpApi } from "../../services/api/auth";
import { saveTokens, clearTokens } from '../../services/tokenService';
import { refreshTokenApi } from "../../services/api/client";

interface User {
  display_name: string;
  profile_description: string;
  profile_picture: string;
}

interface AuthContextValue {
  user: User | null;
  updateUser: () => Promise<void>;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, display_name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>(null as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshTokenApi();
        await updateUser();
      } catch (error) {
        console.log('fail to load', error);
      }
    }
    initAuth();
  }, []);

  const handleAuth = async (apiCall: ()  => Promise<any>) => {
    setIsLoading(true);
    try {
      const { data } = await apiCall();
      await saveTokens(data.tokens.access, data.tokens.refresh);
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    return await handleAuth(() => signInApi(email, password));
  };

  const signUp = async (email: string, password: string, display_name: string) => {
    return await handleAuth(() => signUpApi(display_name, email, password))
  };

  const signOut = async () => {
    setUser(null);
    await clearTokens();
  };

  const updateUser = async () => {
    const userData = await getUserApi();
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)