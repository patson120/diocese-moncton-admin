'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout as logoutUser, setCurrentUser } from '../localStorage';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { User } from '@/app/types';
import { apiClient } from '../axios';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => null,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        Cookies.set('user', JSON.stringify(currentUser), { expires: 7 });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string): Promise<User | null> => {
    try {
      let loggedInUser: User | null = null;
      const formdata = new FormData();
      formdata.append("email", username);
      formdata.append("password", password);
      const response: any = await apiClient.post('/api/auth/login', formdata, {
        'Content-Type': 'multipart/form-data'
      });
      if(response.id){
        loggedInUser = response as User
        setUser(loggedInUser);
        setCurrentUser(loggedInUser)
        Cookies.set('user', JSON.stringify(loggedInUser), { expires: 7 });
        // toast.success('Connexion réussie');
        return loggedInUser;
      }
      toast.error('Identifiants invalides');
      return null;
    } catch (error: any) {
      toast.error(`Erreur lors de la connexion: Vérifiez vos identifiants puis reessayer`);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    router.push('/login');
    toast.success('Déconnexion réussie');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};