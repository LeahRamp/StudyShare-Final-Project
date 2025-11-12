import React, { createContext, useContext, useState } from "react";
import { signInApi, signUpApi } from "../../services/api/auth";
import { saveTokens, clearTokens } from '../../services/tokenService';

interface User {
  id: number;
  email: string;
  display_name: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, display_name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>(null as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuth = async (apiCall: ()  => Promise<any>) => {
    setIsLoading(true);
    try {
      const { data } = await apiCall();
      setUser(data.user);
      await saveTokens(data.tokens.access, data.tokens.refresh);
    } catch (err) {
      throw err
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

  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)