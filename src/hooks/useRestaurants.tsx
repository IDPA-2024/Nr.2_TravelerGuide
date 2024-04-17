"use client";
import { useEffect, useState } from "react";

export type RestaurantsData = Array<any>;

export const useRestaurants = () => {
  const [data, setData] = useState<RestaurantsData>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await fetch("/api/restaurant", {
        method: "PUT",
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  return {
    data,
    setData,
    loading,
    error,
  };
};
