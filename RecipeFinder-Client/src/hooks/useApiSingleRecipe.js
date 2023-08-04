/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { fetchRecipeDetails } from '../services/recipeService';

const useApiSingleRecipe = (recipeId) => {
  const [recipe, setRecipes] = useState({});

  const [error, setError] = useState('');

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetails({ recipeId })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then((data) => {
          setRecipes(data);
        })
        .catch((err) => setError(err.message || 'Unexpected Error'));
    }
  }, [recipeId]);

  return [
    recipe,
    error,
  ];
};

export default useApiSingleRecipe;
