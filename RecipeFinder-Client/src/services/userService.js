export const register = (body) => {
  const requestBody = JSON.stringify(body);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: requestBody,
  };
  return fetch('http://localhost:8080/user/registration', requestOptions);
};

export const login = ({ email, password }) => fetch(`http://localhost:8080/user/login?email=${email}&password=${password}`);

export const updateUserFavouriteRecipes = (body, isAddedToFavourite) => {
  const requestBody = JSON.stringify(body);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: requestBody,
  };
  return isAddedToFavourite ? fetch('http://localhost:8080/user/add/favourite/recipe', requestOptions) : fetch('http://localhost:8080/user/remove/favourite/recipe', requestOptions);
};
