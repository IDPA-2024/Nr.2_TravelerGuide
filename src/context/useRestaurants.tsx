"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type restaurantsContextType = {
  setRestaurants: Dispatch<SetStateAction<string | null>>;
  restaurants: string | null;
};

export type restaurantsProviderProps = { children: React.ReactNode };

const restaurantsContextDefaultValues: restaurantsContextType = {
  setRestaurants: () => {},
  restaurants: null,
};

export const RestaurantsContext = createContext<restaurantsContextType>(
  restaurantsContextDefaultValues
);

export function useRestaurantsContext() {
  return useContext(RestaurantsContext);
}
const RestaurantsProvider = ({ children }: restaurantsProviderProps) => {
  const [restaurants, setRestaurants] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurants) {
      return;
    }
  }, [restaurants]);

  const value = {
    setRestaurants,
    restaurants,
  };
  return (
    <>
      <RestaurantsContext.Provider value={value}>
        {children}
      </RestaurantsContext.Provider>
    </>
  );
};

export default RestaurantsProvider;
