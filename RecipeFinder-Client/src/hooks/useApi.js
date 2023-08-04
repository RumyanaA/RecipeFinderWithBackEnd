/* eslint-disable no-console */
/* eslint-disable no-lonely-if */

import { useRef, useState, useEffect } from 'react';
import useDataModifier from './useModifier';
import { fetchRecipesByKeyword } from '../services/recipeService';

const useApi = ({ keyword }) => {
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [hasResult, setHasResult] = useState(true);

  const timeout = useRef();

  const [recipes, handleData] = useDataModifier();

  useEffect(() => {
    if (keyword) {
      setLoading(true);
      setHasResult(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        fetchRecipesByKeyword({ keyword })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Something went wrong');
          })
          .then((res) => handleData(res))
          .catch((err) => setError(err.message || 'Unexpected Error'))
          .finally(() => setLoading(false));
      }, 1000);
    }
  }, [keyword]);

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
