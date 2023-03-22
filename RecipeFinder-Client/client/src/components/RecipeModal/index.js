import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import parse from 'html-react-parser';
import './RecipeModal.scss';

function RecipeModal({ show, recipe, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
        <img
          className="recipe-img-modal"
          alt={recipe.title}
          src={recipe.image}
        />
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="modal-paragraph">Ingredients: </p>
          <div className="ingridients">
            {recipe.extendedIngredients?.map((ingridient, index) => (
              <div className="ingridient-div" key={index}>
                {' '}
                &#9670;
                {ingridient.original}
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
