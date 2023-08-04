import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './app/login/Login';
import Home from './app/home/Home';
import Discover from './app/discover/Discover';
import MenuPlanner from './app/menuPlanner/MenuPlanner';
import NewRecipeForm from './app/createNewRecipe/NewRecipeForm';
import Favouriterecipes from './app/favouriteRecipes/FavouriteRecipes';
import Registration from './app/registration/Registration';
import PrivateRoutes from './utils';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/home"
            exact
            element={<Home />}
          />
          <Route
            path="/discover"
            exact
            element={<Discover />}
          />
          <Route
            path="/menu-planner"
            exact
            element={<MenuPlanner />}
          />
          <Route
            path="/custom-recipe"
            exact
            element={<NewRecipeForm />}
          />
          <Route
            path="/favourite-recipes"
            exact
            element={<Favouriterecipes />}
          />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/"
          exact
          element={<Login />}
        />
        <Route
          path="/login"
          exact
          element={<Login />}
        />
        <Route
          path="/register"
          exact
          element={<Registration />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
