/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
import { useRef, useState, useEffect } from 'react';
import useDataModifier from './useModifier';

const useApiIngridients = ({ ingridientsUrl }) => {
  const [error, setError] = useState('');

  const [ingridientsLoading, setIngridientsLoading] = useState(false);

  const [hasIngridientsResult, setHasIngridientsResult] = useState(true);

  const timeout = useRef();

  const [ingridients, handleData] = useDataModifier();

  useEffect(() => {
    if (ingridientsUrl) {
      setIngridientsLoading(true);
      setHasIngridientsResult(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        try {
          const result = await fetch(ingridientsUrl);

          const resBody = await result.json();
          handleData(resBody);
        } catch (err) {
          setError(err.message || 'Unexpected Error');
        } finally {
          setIngridientsLoading(false);
        }
      }, 1000);
    }
  }, [ingridientsUrl]);

  useEffect(() => {
    if (ingridients?.length > 0) {
      setHasIngridientsResult(true);
    } else {
      setHasIngridientsResult(false);
    }
  }, [ingridients]);

  return {
    ingridients,
    hasIngridientsResult,
    error,
    ingridientsLoading,
  };
};

export default useApiIngridients;
