/* eslint-disable import/prefer-default-export */
const getUserId = () => JSON.parse(localStorage.getItem('user'))?.id;

export const fetchRecipesByKeyword = ({ keyword }) => fetch(
  `http://localhost:8080/recipe/keyword?keyword=${keyword}&userId=${getUserId()}`,
);

export const fetchRecipesByNutrition = ({ carbs, protein, calories, fat }) => fetch(
  `http://localhost:8080/recipe/nutritions?carbs=${carbs}&protein=${protein}&fat=${fat}&calories=${calories}&userId=${getUserId()}`,
);

export const fetchIngredients = ({ keyword }) => fetch(
  `http://localhost:8080/product?keyword=${keyword}`,
);

export const fetchRecipesByIngredients = ({ ingredients }) => fetch(
  `http://localhost:8080/recipe/ingredients?ingredients=${ingredients}&userId=${getUserId()}`,
);

export const fetchRecipeDetails = ({ recipeId }) => fetch(
  `http://localhost:8080/recipe/details?recipeId=${recipeId}&userId=${getUserId()}`,
);

export const sendCustomRecipe = (body) => {
  const requestBody = JSON.stringify(body);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: requestBody,
  };
  return fetch('http://localhost:8080/recipe/add', requestOptions);
};

export const fetchProducts = ({ keyword }) => fetch(
  `http://localhost:8080/product?keyword=${keyword}`,
);

export const fetchFavouriteRecipes = () => fetch(`http://localhost:8080/recipe/favourite?userId=${getUserId()}`);
