import { React, useState } from 'react';
import IngredientSearch from './search/ingredient/IngredientSearch';
import KeywordSearch from './search/keyword/KeywordSearch';
import NutritionsSearch from './search/nutritions/NutritionsSearch';
import { Header, Button } from '../../components';
import { tabs } from './constants';
import '../../sharedStyles.scss';
import './discover.scss';

const { keyword, ingredients, nutrition } = tabs;

function Discover() {
  const [selectedTab, setSelectedTab] = useState(keyword);

  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="nav-container">
          <Button
            testId="keyword-navigation"
            className={
              selectedTab === keyword
                ? 'nav-button-red'
                : 'nav-button'
            }
            onClick={() => setSelectedTab(keyword)}
            label="Search by keyword"
          />
          <Button
            testId="ingredients-navigation"
            className={
              selectedTab === ingredients
                ? 'nav-button-red'
                : 'nav-button'
            }
            onClick={() => setSelectedTab(ingredients)}
            label="Search by ingredients"
          />
          <Button
            testId="nutritions-navigation"
            className={
              selectedTab === nutrition
                ? 'nav-button-red'
                : 'nav-button'
            }
            onClick={() => setSelectedTab(nutrition)}
            label="Search by nutritions"
          />
        </div>
        {
          selectedTab === keyword
            ? <KeywordSearch />
            : null
        }
        {
          selectedTab === ingredients
            ? <IngredientSearch />
            : null
        }
        {
          selectedTab === nutrition
            ? <NutritionsSearch />
            : null
        }
      </div>
    </div>
  );
}

export default Discover;
