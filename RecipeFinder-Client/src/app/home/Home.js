import { React, useState } from 'react';
import { Header, RecipeCard, NavigationCard, Button, Title } from '../../components';
import { fetchRandomRecipes } from '../../service';
import { menuCards } from './constants';
import '../../sharedStyles.scss';

function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  const populateRandomRecipes = () => {
    fetchRandomRecipes({ number: 4 })
      .then((response) => response.json())
      .then(({ recipes }) => setRandomRecipes(recipes));
  };

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
        <Title title="Daily Recipes" />
        <div className="button-container">
          {' '}
          <Button onClick={populateRandomRecipes} label={`${randomRecipes.length > 0 ? 'update' : 'show'} recipes`} />
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
