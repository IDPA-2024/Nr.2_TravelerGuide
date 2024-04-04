"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  email: string;
  passwordHash: string;
  name: string;
  image: string;
  verified: boolean;
  comments: Array<string>;
} | null;

export type userContextType = {
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
};

export type userProviderProps = { children: React.ReactNode };

const userContextDefaultValues: userContextType = {
  setUser: () => {},
  user: null,
};

export const UserContext = createContext<userContextType>(
  userContextDefaultValues
);

export function useUserContext() {
  return useContext(UserContext);
}
const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  const value = {
    setUser,
    user,
  };
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};

export default UserProvider;
