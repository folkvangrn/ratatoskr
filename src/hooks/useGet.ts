import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

type UseGetArgs = {
  query: string;
  skip?: boolean;
};

export const useGet = <T extends any>({ query, skip }: UseGetArgs) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async (refetchQuery?: string) => {
    if (skip) return;
    const GET_QUERY = refetchQuery || query;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(GET_QUERY, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      if (data?.status !== 200) {
        setData(data);
      } else {
        setError('Something went wrong');
      }
    } catch (e) {
      console.error(e);
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetchData: getData,
  };
};
