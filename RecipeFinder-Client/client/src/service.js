/* eslint-disable import/prefer-default-export */

import apiKey from './config';

export const fetchRandomRecipes = ({ number = 10 } = {}) => fetch(
  `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${number}`,
);

export const fetchRandomFoodJoke = () => fetch(
  `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`,
);

export const fetchRecipesByKeyword = ({ keyword }) => fetch(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}`,
);

export const fetchRecipesByNutrition = ({ carbs, protein, calories, fat }) => fetch(
  `https://api.spoonacular.com/recipes/findByNutrients?maxCarbs=${carbs}&maxProtein=${protein}&maxCalories=${calories}&maxFat=${fat}&apiKey=${apiKey}`,
);

export const fetchIngredients = ({ keyword }) => fetch(
  `https://api.spoonacular.com/food/ingredients/search?query=${keyword}&apiKey=${apiKey}`,
);

export const fetchRecipesByIngredients = ({ ingredients }) => fetch(
  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`,
);
