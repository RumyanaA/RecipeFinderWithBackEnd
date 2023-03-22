/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

export const handlers = [

  rest.get('https://api.spoonacular.com/food/ingredients/search', (req, res, ctx) => {
    req.url.searchParams.get('query');
    req.url.searchParams.get('apiKey');
    if (req.url.searchParams.get('query') === 'invalidIngridientName') {
      return res(
        ctx.status(200),
        ctx.json({
          results: [],
        }),
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        number: 2,
        offset: 0,
        results: [
          {
            id: 10019297, name: 'apple jelly', image: 'apple-jelly.jpg',
          },
          {
            id: 19294, name: 'apple butter', image: 'apple-jelly.jpg',
          },
        ],
        totalResults: 2,
      }),
    );
  }),

  rest.get('https://api.spoonacular.com/food/jokes/random', (req, res, ctx) => {
    req.url.searchParams.get('apiKey');
    return res(
      ctx.status(200),
      ctx.json({
        text: 'mocked food joke',
      }),
    );
  }),

  rest.get('https://api.spoonacular.com/recipes/findByNutrients', (req, res, ctx) => {
    req.url.searchParams.get('maxCarbs');
    req.url.searchParams.get('maxProtein');
    req.url.searchParams.get('maxCalories');
    req.url.searchParams.get('maxFat');
    return res(
      ctx.status(200),
      ctx.json([
        {
          calories: 250,
          carbs: '27g',
          fat: '14g',
          id: 653270,
          image: 'https://spoonacular.com/recipeImages/653270-312x231.jpg',
          imageType: 'jpg',
          protein: '4g',
          title: 'Nori Seaweed Muffins',
        },
        {
          calories: 62,
          carbs: '16g',
          fat: '0g',
          id: 660261,
          image: 'https://spoonacular.com/recipeImages/660261-312x231.jpg',
          imageType: 'jpg',
          protein: '0g',
          title: 'Slow Cooked Applesauce',
        }, {
          calories: 81,
          carbs: '9g',
          fat: '4g',
          id: 665537,
          image: 'https://spoonacular.com/recipeImages/665537-312x231.jpg',
          imageType: 'jpg',
          protein: '1g',
          title: 'Yoghurt Honey Madeleines',
        }]),
    );
  }),

  rest.get('https://api.spoonacular.com/recipes/findByIngredients', (req, res, ctx) => {
    req.url.searchParams.get('ingridients');
    req.url.searchParams.get('apiKey');
    return res(
      ctx.status(200),
      ctx.json([
        {

          id: 715412, title: 'Kiwi Popsicles - Summer Popsicle Series', image: 'https://spoonacular.com/recipeImages/715412-312x231.jpg', imageType: 'jpg', usedIngredientCount: [],
        },
        {
          id: 644782, title: 'Gluten And Dairy Free Peanut Butter Cups', image: 'https://spoonacular.com/recipeImages/644782-312x231.jpg', imageType: 'jpg', usedIngredientCount: [],
        },

      ]),
    );
  })];
