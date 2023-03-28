package RecipeFinder.controllers;

import RecipeFinder.ExternalApiClasses.ExternalRecipesResponse;
import RecipeFinder.ExternalApiClasses.ExternalIngredientsResponse;
import RecipeFinder.ExternalApiClasses.RecipeWithNutritionsApiResponse;
import RecipeFinder.entities.Product;
import RecipeFinder.services.ExternalApiService;
import RecipeFinder.entities.Recipe;
import RecipeFinder.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    private final RecipeService recipeService;
    private final ExternalApiService externalApiService;

    @Autowired
    public RecipeController(RecipeService recipeService,ExternalApiService externalApiService) {
        this.recipeService = recipeService;
        this.externalApiService = externalApiService;
    }


    @PostMapping("add")
    public Long addNewRecipe(@RequestBody Recipe recipe) {
        return recipeService.addNewRecipe(recipe);
    }

    @GetMapping("/keyword")
    public List<Recipe> getRecipeByText(@RequestParam String keyword, Long userId) {
        List<Recipe> userSavedRecipes =  recipeService.getRecipesByText(keyword,userId);
        if(userSavedRecipes.size() < 10){
            String apiKey = externalApiService.getApiKey();
            Integer numOfExternalRecipes = 10 - userSavedRecipes.size();
            String url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
                     apiKey + "&query=" + keyword+"&number="+numOfExternalRecipes;
            RestTemplate restTemplate = new RestTemplate();
            ExternalRecipesResponse externalApiResponse = restTemplate.getForObject(url, ExternalRecipesResponse.class);
            List<Recipe> externalRecipes = externalApiService.transformRecipeResponse(externalApiResponse);
            List<Recipe> combinedListOfRecipes = Stream.concat(userSavedRecipes.stream(), externalRecipes.stream()).toList();
            return combinedListOfRecipes;
        }else{
            return userSavedRecipes;
        }

    }

    @GetMapping("/nutritions")
    public List<Recipe> getRecipeByNutritions(@RequestParam Integer carbs, Integer protein, Integer fat, Integer calories, Long userId) {
        List<Recipe> userSavedRecipes =  recipeService.getRecipesByNutritions(carbs, protein, fat, calories, userId);
        if(userSavedRecipes.size() < 10){
            String apiKey = externalApiService.getApiKey();
            Integer numOfExternalRecipes = 10 - userSavedRecipes.size();
            String url = "https://api.spoonacular.com/recipes/findByNutrients?maxCarbs="+carbs+"&maxProtein="+
                    protein+"&maxCalories="+calories+"&maxFat="+fat+"&apiKey="+apiKey+"&number="+numOfExternalRecipes;
            RestTemplate restTemplate = new RestTemplate();
            RecipeWithNutritionsApiResponse[] externalApiResponse = restTemplate.getForObject(url,RecipeWithNutritionsApiResponse[].class);
            List<Recipe> externalRecipes=externalApiService.removeUnitFromNutritions(Arrays.stream(externalApiResponse).toList());
            List<Recipe> combinedListOfRecipes = Stream.concat(userSavedRecipes.stream(), externalRecipes.stream()).toList();
            return combinedListOfRecipes;
        }else{
            return userSavedRecipes;
        }
    }

    @GetMapping("/ingredients")
    public List<Product> getProducts(@RequestParam String keyword){
        List<Product> productsFromDB = recipeService.getProducts(keyword);
        if(productsFromDB.size()<10){
            String apiKey = externalApiService.getApiKey();
            Integer numOfExternalRecipes = 10 - productsFromDB.size();
            String url = "https://api.spoonacular.com/food/ingredients/search?apiKey=" +
                    apiKey + "&query=" + keyword+"&number="+numOfExternalRecipes;
            RestTemplate restTemplate = new RestTemplate();
            ExternalIngredientsResponse externalApiResponse = restTemplate.getForObject(url,ExternalIngredientsResponse.class);
            List<Product> externalProducts = externalApiService.transformProductResponse(externalApiResponse);
            List<Product> combinedListOfProducts = Stream.concat(productsFromDB.stream(), externalProducts.stream()).toList();
            return combinedListOfProducts;
        }else{
            return productsFromDB;
        }
    }
}

