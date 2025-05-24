import { User } from "@/app/types";

// Local Storage Keys
const CURRENT_USER_KEY = 'current_user';
const CURRENT_USER_TOKEN = 'current_user';


export const getCurrentUser = (): User | null => {
  const userJSON = localStorage.getItem(CURRENT_USER_KEY);
  return userJSON ? JSON.parse(userJSON) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const setUserToken = (token: string) => {
  localStorage.setItem(CURRENT_USER_TOKEN, token);
};

export const getUserToken = (): User | null => {
  const tokenJSON = localStorage.getItem(CURRENT_USER_TOKEN);
  return tokenJSON ? JSON.parse(tokenJSON) : null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
