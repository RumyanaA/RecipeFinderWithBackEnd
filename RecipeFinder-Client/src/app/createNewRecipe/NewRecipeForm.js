import React, { useRef, useState } from 'react';
import { Button, Header, Input } from '../../components';
import '../../sharedStyles.scss';
import './newRecipeForm.scss';
import TextArea from '../../components/TextArea';
import { recipeNutritionsFields } from './constants';
import IngredientsForm from './ingredientsForm';
import { sendCustomRecipe } from '../../services/recipeService';

function NewRecipeForm() {
  const [recipeDetails, setRecipeDetails] = useState({
    title: '',
    instructions: '',
    image: '',
    fat: 55,
    carbs: 55,
    protein: 50,
    calories: 400,

  });

  const [isNutritionsDisabled, setIsNutritionsDisabled] = useState(false);

  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const inputRef = useRef(null);

  const [preview, setPreview] = useState('');

  const { title, instructions, image, fat, carbs, protein, calories } = recipeDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setRecipeDetails((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
      console.log(JSON.stringify(recipeDetails));
    };
  };

  const getSelectedIngredients = (currentIngredient) => {
    setRecipeIngredients((prevState) => ([...prevState, currentIngredient]));
  };

  const resetState = () => {
    setRecipeDetails({
      title: '',
      instructions: '',
      image: '',
      fat: 55,
      carbs: 55,
      protein: 50,
      calories: 400,

    });
    setPreview('');
    inputRef.current.value = null;
    setRecipeIngredients([]);
    setIsNutritionsDisabled(false);
  };

  const saveNewRecipe = () => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    const recipeDTO = {
      recipe: {
        addedBy: {
          id: userId,
        },
        title,
        instructions,
        image,
        fat: isNutritionsDisabled ? null : fat,
        carbs: isNutritionsDisabled ? null : carbs,
        protein: isNutritionsDisabled ? null : protein,
        calories: isNutritionsDisabled ? null : calories,
      },
      productDTOs: recipeIngredients,
    };

    sendCustomRecipe(recipeDTO)
      .then((response) => {
        if (response.ok) {
          resetState();
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <h4 className="custom-recipe-title">Custom Recipe Form</h4>
        <div className="form-container">
          <div className="inputs-container">
            <div>
              <Input
                onChange={handleChange}
                type="text"
                name="title"
                value={title}
                label="Recipe Title"
              />
            </div>
            <div className="file-input-container">
              <label htmlFor="image">Recipe Image</label>
              <input
                ref={inputRef}
                onChange={handleImageUpload}
                id="image"
                type="file"
                name="image"
              />

            </div>
            { preview ? <img className="recipe-image-preview" alt="recipe" src={preview} /> : null}
            <div className="textarea-container">
              <TextArea
                value={instructions}
                name="instructions"
                onChange={handleChange}
                label="Recipe Instructions"
                rows={5}
                cols={30}
              />
            </div>

            <div>

              <h5>Recipe Nutritions</h5>
              <div className="checkbox-and-label-container">
                <label>Exclude Nutritions from the Recipe</label>
                <input className="checkbox-input" type="checkbox" checked={isNutritionsDisabled} onChange={() => setIsNutritionsDisabled(!isNutritionsDisabled)} />
              </div>
              {recipeNutritionsFields.map((nutrition, index) => (
                <div key={index}>
                  <Input
                    onChange={handleChange}
                    disabled={isNutritionsDisabled}
                    type="range"
                    name={nutrition.name}
                    value={recipeDetails[nutrition.name]}
                    min={nutrition.min}
                    max={nutrition.max}
                    label={`${nutrition.label}:  ${nutrition.name === 'calories'
                      ? `${recipeDetails[nutrition.name]}kcal`
                      : `${recipeDetails[nutrition.name]}g`}`}
                  />

                </div>
              ))}
            </div>
          </div>
          <IngredientsForm
            getSelectedIngredients={getSelectedIngredients}
            ingredients={recipeIngredients}
          />
        </div>
        <div className="save-btn-container">
          <Button
            type="button"
            label="Save"
            onClick={saveNewRecipe}
          />
        </div>
      </div>
    </>
  );
}

export default NewRecipeForm;
