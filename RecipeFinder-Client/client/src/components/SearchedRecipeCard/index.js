import { React, useState } from 'react';
import RecipeModal from '../RecipeModal';
import apiKey from '../../config';

function SearchedRecipeCard({ testId, props }) {
  const [currentRecipe, setCurrentRecipe] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const fetchRecipe = async () => {
    await fetch(
      `https://api.spoonacular.com/recipes/${props.id}/information?apiKey=${apiKey}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentRecipe(data);
      });
  };

  const handleClick = async () => {
    await fetchRecipe();
    handleShow();
  };

  return (
    <>
      <div data-testid={testId} onClick={handleClick} className="recipe-wrapper">
        <img className="recipe-img" alt="recipe" src={props.image} />
        <div className="recipe-title">
          {' '}
          {props.title}
          <span className="recipe-tooltip">{props.title}</span>
        </div>
      </div>
      {show && <RecipeModal show={show} recipe={currentRecipe} handleClose={handleClose} />}
    </>
  );
}

export default SearchedRecipeCard;
