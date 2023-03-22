/* eslint-disable no-console */
/* eslint-disable no-lonely-if */

import { useRef, useState, useEffect } from 'react';
import useDataModifier from './useModifier';

const useApi = ({ url }) => {
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [hasResult, setHasResult] = useState(true);

  const timeout = useRef();

  const [recipes, handleData] = useDataModifier();

  useEffect(() => {
    if (url) {
      setLoading(true);
      setHasResult(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        try {
          const result = await fetch(url);

          const resBody = await result.json();

          console.log(resBody);
          handleData(resBody);
        } catch (err) {
          setError(err.message || 'Unexpected Error');
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  }, [url]);

  useEffect(() => {
    if (recipes?.length > 0) {
      setHasResult(true);
    } else {
      setHasResult(false);
    }
  }, [recipes]);

  return {
    recipes,
    hasResult,
    error,
    loading,
  };
};

export default useApi;
