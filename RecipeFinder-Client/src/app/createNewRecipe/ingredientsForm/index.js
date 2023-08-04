import React, { useState } from 'react';
import { Button, ErrorMessage, Input } from '../../../components';
import { units } from '../constants';
import './ingredientsForm.scss';
import Dropdown from '../../../components/Dropdown';
import SearchProductAndSelect from '../../../components/SearchProductAndSelect';

function IngredientsForm({ getSelectedIngredients, ingredients }) {
  const [ingredientDetail, setIngredientDetail] = useState({
    number: 0,
    unit: units[0],
    title: '',
    image: '',

  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectedProduct = (product) => {
    setIngredientDetail((prevState) => ({
      ...prevState,
      title: product.title,
      image: product.image,
    }));
  };

  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    setIngredientDetail((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleSelectUnit = (selectedUnit) => {
    setIngredientDetail((prevState) => ({
      ...prevState,
      unit: selectedUnit,
    }));
  };

  const addIngredient = () => {
    const currentIngredient = { ...ingredientDetail };
    if (!currentIngredient.number) {
      setErrorMessage('Amount must be specified');
      return;
    }
    if (!currentIngredient.title) {
      setErrorMessage('A recipe ingredient was not selected');
      return;
    }
    if (errorMessage) {
      setErrorMessage('');
    }
    getSelectedIngredients(currentIngredient);
    setIngredientDetail({
      number: 0,
      unit: units[0],
      title: '',
      image: '',
    });
  };

  const handleOnFocus = () => {
    if (ingredientDetail.number === 0) {
      setIngredientDetail((prevState) => ({
        ...prevState,
        number: '',
      }));
    }
  };

  const { number, title } = { ...ingredientDetail };
  return (
    <div className="ingredients-container">

      <div className="ingredient-form">
        <div className="number-input">
          <Input
            onChange={handleAmountChange}
            type="number"
            name="number"
            onFocus={handleOnFocus}
            value={number}
            label="Amount"
          />
        </div>
        <div className="dropdown-and-label">
          <label>Unit</label>
          <Dropdown
            options={units}
            onSelect={handleSelectUnit}
            selectedOption={ingredientDetail.unit}
          />
        </div>
        <div>
          <SearchProductAndSelect onProductSelect={handleSelectedProduct} title={title} />
        </div>
        <Button
          type="button"
          label="Add"
          onClick={addIngredient}
        />

      </div>
      <ErrorMessage testid="ingredient-form-error" message={errorMessage} />
      <img className="image-ingredients" src="img/ingredientsImg.png" alt="ingredients" />
      <h5 className="recipe-ingredients-header">Recipe Ingredients</h5>
      <div className="selected-ingredients-container">
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{`${ingredient.number} ${ingredient.unit} ${ingredient.title}`}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
export default IngredientsForm;
