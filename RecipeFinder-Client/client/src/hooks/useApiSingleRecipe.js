/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';

const useApiSingleRecipe = (url) => {
  const [recipe, setRecipes] = useState({});

  const [error, setError] = useState('');

  useEffect(() => {
    if (url) {
      (async () => {
        try {
          const result = await fetch(url);

          const resBody = await result.json();
          setRecipes(resBody);
        } catch (err) {
          setError(err.message || 'Unexpected Error');
        }
      })();
    }
  }, [url]);

  return [
    recipe,
    error,
  ];
};

export default useApiSingleRecipe;
