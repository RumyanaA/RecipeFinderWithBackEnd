/* eslint-disable no-nested-ternary */
import { React, useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Spinner from 'react-bootstrap/esm/Spinner';
import {
  Button,
  SearchedRecipeCard,
  IngridientCard,
  Title,
  InputField,
  ErrorMessage,
} from '../../../../components';
import {
  fetchIngredients,
  fetchRecipesByIngredients,
} from '../../../../service';
import './ingredientSearch.scss';
import '../../../../sharedStyles.scss';

function IngredientSearch() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [selectedIngredientsName, setSelectedIngredientsName] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const [recipes, setRecipes] = useState([]);

  const [hasIngredientValue, setHasIngredientValue] = useState(false);

  const [hasRecipes, setHasRecipes] = useState(false);

  const [ingredientsLoading, setIngredientsLoading] = useState(false);

  const [recipesLoading, setRecipesLoading] = useState(false);

  const [keyword, setKeyword] = useState('');

  const [ingredientErrorMessage, setIngredientErrorMessage] = useState('');

  const [recipesErrorMessage, setRecipesErrorMessage] = useState('');

  const handleDebounce = useCallback(
    debounce(
      (value) => (Array.isArray(value)
        ? setSelectedIngredientsName([...value])
        : setKeyword(value)),
      1000,
    ),
    [],
  );

  const handleChange = (value) => {
    setHasIngredientValue(!!value);
    setIngredientsLoading(true);
    if (ingredientErrorMessage) {
      setIngredientErrorMessage('');
    }
    if (recipesErrorMessage) {
      setRecipesErrorMessage('');
    }
    handleDebounce(value);
  };

  useEffect(() => {
    fetchIngredients({ keyword })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(({ results }) => setIngredients(results))
      .catch((error) => setIngredientErrorMessage(error.message))
      .finally(() => setIngredientsLoading(false));
  }, [keyword]);

  const addIngridient = (item) => {
    setSelectedIngredients([...selectedIngredients, item]);
  };

  const removeIngridient = (item) => {
    const currentIngredients = selectedIngredients;

    const indexToRemove = currentIngredients.findIndex(
      (ingridient) => ingridient.id === item.id,
    );
    currentIngredients.splice(indexToRemove, 1);

    setSelectedIngredients([...currentIngredients]);
  };

  const searchRecipe = async () => {
    setHasRecipes(true);
    setRecipesLoading(true);
    const ingredientsName = selectedIngredients.map((item) => item.name);
    handleDebounce(ingredientsName);
  };

  useEffect(() => {
    fetchRecipesByIngredients({ ingredients: selectedIngredientsName })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((result) => setRecipes(result))
      .catch((error) => setRecipesErrorMessage(error.message))
      .finally(() => setRecipesLoading(false));
  }, [selectedIngredientsName]);

  return (
    <>
      <div className="searchInput-Button-container">
        <InputField
          placeholder="Search ingridients..."
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button onClick={searchRecipe} label="Search recipe" />
      </div>
      <Title title="All Ingridients" />
      <div className="ingridients-container">
        {!hasIngredientValue ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src="img/ingridients.jpg"
            />
          </div>
        ) : ingredientsLoading ? (
          <div className="spinner-div">
            <Spinner
              data-testid="ingridients-spinner"
              animation="grow"
              variant="primary"
            />
          </div>
        ) : ingredientErrorMessage ? (
          <ErrorMessage message={ingredientErrorMessage} />
        ) : (
          ingredients?.map((item, index) => (
            <IngridientCard
              testId={`ingridient-testid-${index}`}
              key={index}
              props={item}
              addIngridient={addIngridient}
              selectedIngridient={false}
            />
          ))
        )}
        {hasIngredientValue
        && !ingredients.length
        && !ingredientsLoading
        && !ingredientErrorMessage ? (
          <ErrorMessage
            testid="no-ingridients-found"
            message="No Ingridients Found"
          />
          ) : null}
      </div>
      <Title title="My Ingridients" />
      <div className="selected-ingridients-container">
        {selectedIngredients.length === 0 ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src="img/fridge.jpg"
            />
          </div>
        ) : (
          selectedIngredients?.map((item, index) => (
            <IngridientCard
              testId={`selectedIngridient-testid-${index}`}
              key={index}
              props={item}
              removeIngridient={removeIngridient}
              selectedIngridient
              divTestId={`div-X-testid-${index}`}
            />
          ))
        )}
      </div>
      <Title title="Found Recipes" />
      <div className="spinner-div">
        {recipesLoading && (
          <Spinner
            data-testid="recipes-spinner"
            animation="grow"
            variant="primary"
          />
        )}
      </div>
      <div className="recipe-cards-container">
        {!hasRecipes ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="recipes"
              src="img/recipes.jpg"
            />
          </div>
        ) : recipes?.length ? (
          recipes?.map((recipe, index) => (
            <SearchedRecipeCard
              testId={`recipe-testId-${index}`}
              key={index}
              props={recipe}
            />
          ))
        ) : (
          recipesErrorMessage && <ErrorMessage message={recipesErrorMessage} />
        )}
        {hasRecipes
        && !recipes?.length
        && !recipesLoading
        && !recipesErrorMessage ? (
          <ErrorMessage message="No Recipes Found" />
          ) : null}
      </div>
    </>
  );
}

export default IngredientSearch;
