/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import parse from 'html-react-parser';
import './RecipeModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../Consts';
import { updateUserFavouriteRecipes } from '../../services/userService';

function RecipeModal({ show, recipe, handleClose }) {
  const [isUserFavourite, setIsUserFavourite] = useState(recipe.userFavourite);

  const [recipeId, setRecipeId] = useState(recipe.id);

  const handleStarIconClick = (isAddedToFavourite) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    let requestData;

    if (isAddedToFavourite) {
      const recipeClone = (({ userFavourite, extendedIngredients, ...rest }) => rest)(recipe);

      requestData = {
        userId,
        recipeId: recipe.id,
        recipe: recipeClone,
        productDTOs: recipe.extendedIngredients,
      };
    } else {
      requestData = {
        userId,
        recipeId: recipe.id,
      };
    }

    updateUserFavouriteRecipes(requestData, isAddedToFavourite)
      .then((response) => {
        if (response.ok) {
          setIsUserFavourite(isAddedToFavourite);
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((res) => {
        setRecipeId(res);
      })
      .catch((error) => console.log(error.message));
  };

  const handleModalClose = () => {
    handleClose(recipeId, !isUserFavourite);
  };
  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
        <img
          className="recipe-img-modal"
          alt={recipe.title}
          src={recipe.image ? recipe.image : defaultImage}
        />
      </Modal.Header>
      <Modal.Body>
        <div>
          <div onClick={() => handleStarIconClick(!isUserFavourite)} className="ingredients-and-favourite-icon">
            {isUserFavourite ? (
              <FontAwesomeIcon
                icon={faStar}
                size="xl"
                style={{
                  color: '#e0e316',
                  width: '30px',
                  cursor: 'pointer',
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faStar}
                size="xl"
                style={{
                  width: '30px',
                  cursor: 'pointer',
                }}
              />
            )}
            <p className="modal-paragraph">Ingredients: </p>
          </div>
          <div className="ingridients">
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <div className="ingridient-div" key={index}>
                {' '}
                &#9670;
                {`${ingredient.number || ingredient.amount || ''} ${ingredient.unit} ${ingredient.title || ingredient.name || ''}`}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="modal-paragraph">Directions:</p>
          {recipe.instructions ? parse(recipe.instructions)
            : <span>No available instructions</span>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
