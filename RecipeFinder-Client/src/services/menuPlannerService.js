/* eslint-disable import/prefer-default-export */
const getUserId = () => JSON.parse(localStorage.getItem('user'))?.id;

export const setMeal = (body) => {
  const requestBody = JSON.stringify(body);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: requestBody,
  };
  return fetch('http://localhost:8080/meal/add', requestOptions);
};

export const fetchMonthlyRecipes = () => fetch(
  `http://localhost:8080/meal/monthly?userId=${getUserId()}`,
);

export const deleteMeal = (mealId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`http://localhost:8080/meal/delete?mealId=${mealId}`, requestOptions);
};
