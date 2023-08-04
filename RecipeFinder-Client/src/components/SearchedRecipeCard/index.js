import { React, useState } from 'react';
import RecipeModal from '../RecipeModal';
import { fetchRecipeDetails } from '../../services/recipeService';
import defaultImage from '../../Consts';

function SearchedRecipeCard({ testId, props, id, removeIndex = null }) {
  const [show, setShow] = useState(false);

  const [detailedRecipe, setDetailedRecipe] = useState();

  const [recipeId, setRecipeId] = useState(null);

  const handleClose = (newRecipeId = null, isRemoved = false) => {
    if (newRecipeId !== null) {
      setRecipeId(newRecipeId);
    }
    if (typeof removeIndex === 'function' && isRemoved) {
      removeIndex(id);
    }
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleRecipeSelect = () => {
    const recipeIdToSend = recipeId || props.id;
    fetchRecipeDetails({ recipeId: recipeIdToSend })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) => {
        setDetailedRecipe(data);
        handleShow();
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div data-testid={testId} onClick={handleRecipeSelect} className="recipe-wrapper">
        <img className="recipe-img" alt="recipe" src={props.image ? props.image : defaultImage} />
        <div className="recipe-title">
          {' '}
          {props.title}
          <span className="recipe-tooltip">{props.title}</span>
        </div>
      </div>
      {show && <RecipeModal show={show} recipe={detailedRecipe} handleClose={handleClose} />}
    </>
  );
}

export default SearchedRecipeCard;
