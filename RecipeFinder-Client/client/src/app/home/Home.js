import { React, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Header, RecipeCard, NavigationCard, Button, Title } from '../../components';
import { fetchRandomFoodJoke, fetchRandomRecipes } from '../../service';
import { menuCards } from './constants';
import '../../sharedStyles.scss';

function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  const [foodJoke, setFoodJoke] = useState('');

  const populateRandomRecipes = () => {
    fetchRandomRecipes({ number: 4 })
      .then((response) => response.json())
      .then(({ recipes }) => setRandomRecipes(recipes));
  };

  useEffect(() => {
    fetchRandomFoodJoke()
      .then((response) => response.json())
      .then(({ text }) => setFoodJoke(text));
  }, []);

  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="nav-cards">
          {menuCards?.map((card, index) => (
            <NavigationCard
              testId={card.testId}
              key={index}
              title={card.title}
              description={card.description}
              routerLink={card.routerLink}
            />
          ))}
        </div>
        <div>
          <h6 data-testid="random-food-joke-label">Random food joke: </h6>
          <p data-testid="food-joke">{parse(foodJoke)}</p>
        </div>
        <Title title="Daily Recipes" />
        <div className="button-container">
          {' '}
          <Button onClick={populateRandomRecipes} label={`${randomRecipes.length > 0 ? 'update' : 'show'} random recipes`} />
          {' '}
        </div>

        <div className="recipe-cards-container">
          {randomRecipes?.map((recipe, index) => <RecipeCard key={index} props={recipe} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
