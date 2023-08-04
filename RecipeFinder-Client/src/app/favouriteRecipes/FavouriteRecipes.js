/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { fetchFavouriteRecipes } from '../../services/recipeService';
import { ErrorMessage, Header, SearchedRecipeCard } from '../../components';
import './favouriteRecipes.scss';

function Favouriterecipes() {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  const [recipesErrorMessage, setRecipesErrorMessage] = useState('');

  const [recipesLoading, setRecipesLoading] = useState(true);
  useEffect(() => {
    fetchFavouriteRecipes()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((result) => {
        setFavouriteRecipes(result);
        if (!result.length) {
          throw new Error('No Favourite Recipes Found');
        }
      })
      .catch((error) => setRecipesErrorMessage(error.message))
      .finally(() => setTimeout(() => setRecipesLoading(false), [2000]));
  }, []);

  const handleRemoval = (index) => {
    const currentRecipes = [...favouriteRecipes];
    currentRecipes.splice(index, 1);
    setFavouriteRecipes([...currentRecipes]);
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <h4 className="fav-recipes-header">Favourite Recipes</h4>
        <div className="fav-recipes-container">
          {recipesLoading ? (
            <div className="spinner-div">
              <Spinner
                data-testid="fav-recipes-spinner"
                animation="grow"
                variant="primary"
              />
            </div>
          )
            : recipesErrorMessage
              ? <ErrorMessage message={recipesErrorMessage} />
              : (
                <div className="fav-recipes">
                  {' '}
                  {favouriteRecipes.map((recipe, index) => (
                    <SearchedRecipeCard
                      testId={`searched-recipe-card-${index}`}
                      key={index}
                      id={index}
                      props={recipe}
                      removeIndex={handleRemoval}
                    />
                  ))}
                </div>
              )}
        </div>
      </div>

    </>
  );
}

export default Favouriterecipes;
