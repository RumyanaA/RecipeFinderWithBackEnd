import React from 'react';
import './IngridientCard.scss';

function IngridientCard({
  testId,
  props,
  addIngridient,
  removeIngridient,
  selectedIngridient,
  divTestId,
}) {
  return (
    <div
      data-testid={testId}
      className="ingridient-info"
      onClick={!selectedIngridient ? () => addIngridient(props) : null}
    >
      {selectedIngridient && (
        <div data-testid={divTestId} onClick={() => removeIngridient(props)}>
          x
        </div>
      )}
      <img
        className="ingridient-img"
        alt={props.name}
        src={`https://spoonacular.com/cdn/ingredients_100x100/${props.image}`}
      />
      <h6 className="item-name">{props.name}</h6>
    </div>
  );
}
export default IngridientCard;
