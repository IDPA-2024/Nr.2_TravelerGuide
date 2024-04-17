"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type tokenContextType = {
  setToken: Dispatch<SetStateAction<string | null>>;
  token: string | null;
};

export type tokenProviderProps = { children: React.ReactNode };

const tokenContextDefaultValues: tokenContextType = {
  setToken: () => {},
  token: null,
};

export const TokenContext = createContext<tokenContextType>(
  tokenContextDefaultValues
);

export function useTokenContext() {
  return useContext(TokenContext);
}
const TokenProvider = ({ children }: tokenProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }
  }, [token]);

  const value = {
    setToken,
    token,
  };
  return (
    <>
      <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    </>
  );
};

export default TokenProvider;
