/* eslint-disable no-param-reassign */
import { React, useEffect, useState } from 'react';
import RecipeModal from '../RecipeModal';
import './RecipeCard.scss';

function RecipeCard({ props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  useEffect(() => {
    // api array has repeated ingridients
    const ingridients = props.extendedIngredients;

    const uniqueIngridients = [
      ...new Map(ingridients.map((item) => [item.id, item])).values(),
    ];
    props.extendedIngredients = uniqueIngridients;
  });
  const altText = 'recipe';
  return (
    <>
      <div onClick={handleShow} className="recipe-wrapper">

        <img
          className="recipe-img"
          alt={altText.toString()}
          src={props.image}
        />
        <div className="recipe-title">
          {' '}
          {props.title}
          <span className="recipe-tooltip">{props.title}</span>
        </div>
        <p>
          {props.extendedIngredients.length}
          {' '}
          Ingredients |
          {' '}
          {props.readyInMinutes}
          {' '}
          min
        </p>
      </div>
      <RecipeModal show={show} recipe={props} handleClose={handleClose} />
    </>
  );
}

export default RecipeCard;
