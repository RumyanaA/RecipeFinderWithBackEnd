/* eslint-disable no-nested-ternary */
import { React, useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Spinner from 'react-bootstrap/Spinner';
import { Input, SearchedRecipeCard, Title, ErrorMessage } from '../../../../components';
import { fetchRandomRecipes } from '../../../../service';
import './keywordSearch.scss';
import { fetchRecipesByKeyword } from '../../../../services/recipeService';

function KeywordSearch() {
  const [keyword, setKeyword] = useState('');

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback(
    debounce(
      ({ target: { value } }) => {
        setKeyword(value);
        if (errorMessage) {
          setErrorMessage('');
        }
      },
      1000,
    ),
    [],
  );

  useEffect(() => {
    setLoading(true);
    if (keyword) {
      fetchRecipesByKeyword({ keyword })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then((res) => setRecipes(res))
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setLoading(false));
    } else {
      fetchRandomRecipes()
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then(({ recipes: fetchedRecipes }) => fetchedRecipes && setRecipes(fetchedRecipes))
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setLoading(false));
    }
  }, [keyword]);

  return (
    <>
      <div className="search-container">
        <Input
          placeholder="Search recipes by keyword..."
          onChange={handleChange}
        />
      </div>
      <Title title="Found Recipes" />
      {
        loading
          ? (
            <div className="spinner-div">
              <Spinner animation="grow" variant="primary" />
            </div>
          )
          : (
            <div className="recipe-cards-container">
              {errorMessage ? (
                <ErrorMessage message={errorMessage} />
              )
                : recipes.length
                  ? recipes?.map(
                    (recipe, index) => (
                      <SearchedRecipeCard
                        testId={`searched-recipe-card-${index}`}
                        key={index}
                        id={index}
                        props={recipe}
                      />
                    ),
                  )
                  : <ErrorMessage message="No recipes found" />}
            </div>
          )
      }
    </>
  );
}

export default KeywordSearch;
