package RecipeFinder.controllers;

import RecipeFinder.ExternalApiClasses.*;
import RecipeFinder.entities.Users;
import RecipeFinder.interfaces.*;
import RecipeFinder.services.ExternalApiService;
import RecipeFinder.entities.Recipe;
import RecipeFinder.services.ProductService;
import RecipeFinder.services.RecipeService;
import RecipeFinder.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Stream;


@CrossOrigin( origins = "http://localhost:3000")
@RestController
@RequestMapping("/recipe")
public class RecipeController {
    private final RecipeService recipeService;
    private final UserService userService;
    private final ExternalApiService externalApiService;
    private final ProductService productService;

    @Autowired
    public RecipeController(RecipeService recipeService,UserService userService,ExternalApiService externalApiService, ProductService productService) {
        this.recipeService = recipeService;
        this.externalApiService = externalApiService;
        this.userService = userService;
        this.productService = productService;

    }


    @PostMapping("add")
    public Long addNewRecipe(@RequestBody NewRecipeRequest recipeRequest) {
        return recipeService.addNewRecipe(recipeRequest.getRecipe(), recipeRequest.getProductDTOs());
    }


    @GetMapping("/random")
    public List<Recipe> getTenRandomRecipes(@RequestParam Long addedBy){
        List<Recipe> userSavedRecipes = recipeService.getRandomRecipes(addedBy);
        return userSavedRecipes;
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
    public List<Recipe> getRecipesByIngredients(@RequestParam List<String>ingredients, Long userId){
        List<Recipe> userSavedRecipes = recipeService.getRecipesByProducts(ingredients, userId);
        if(userSavedRecipes.size() < 10){
            String apiKey = externalApiService.getApiKey();
            Integer numOfExternalRecipes = 10 - userSavedRecipes.size();
            String url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="+ingredients+"&apiKey="+apiKey+"&number="+numOfExternalRecipes;
            RestTemplate restTemplate = new RestTemplate();
            ExternalRecipesByIngredientsResponse[] externalApiResponse = restTemplate.getForObject(url, ExternalRecipesByIngredientsResponse[].class);
            List<Recipe> externalRecipes = externalApiService.transformRecipesByIngredientsResponse(Arrays.stream(externalApiResponse).toList());
            List<Recipe> combinedListOfRecipes = Stream.concat(userSavedRecipes.stream(), externalRecipes.stream()).toList();
            return combinedListOfRecipes;
        }else{
            return userSavedRecipes;
        }
    }

    @GetMapping("/favourite")
    public List<Recipe> getUserFavouriteRecipe(@RequestParam Long userId){
        return recipeService.getUserFavouriteRecipes(userId);
    }

    @GetMapping("/details")
    public RecipeWithDetailsDTO getRecipeDetails(@RequestParam Long recipeId, Long userId){
        Recipe recipe = recipeService.getRecipeById(recipeId);
        if(recipe != null){
            List<ProductInfo> ingredients = productService.getIngredientsByRecipe(recipeId);
            recipe.setExtendedIngredients(ingredients);
            Set<Users> favouriteByUsers = recipe.getUser();
            boolean isFavouriteByCurrentUser = false;
            if(favouriteByUsers.size()>0){
                Users currentUser = userService.getUserById(userId);
                isFavouriteByCurrentUser= favouriteByUsers.contains(currentUser);

            }
            return new RecipeWithDetailsDTO(recipe.getId(), recipe.getTitle(), recipe.getInstructions(), recipe.getImage(), isFavouriteByCurrentUser, recipe.getExtendedIngredients(), false);
        }else{
            String apiKey = externalApiService.getApiKey();
            String url = "https://api.spoonacular.com/recipes/"+recipeId+"/information?includeNutrition=false"+"&apiKey="+apiKey;
            RestTemplate restTemplate = new RestTemplate();
            ExternalRecipeDetails externalRecipeDetails = restTemplate.getForObject(url,ExternalRecipeDetails.class);

            List<ExternalExtendedIngredient> extendedIngredients= externalRecipeDetails.getExtendedIngredients();
            List<ProductInfo> transformedIngredients = new ArrayList<>();
            for(ExternalExtendedIngredient extendedIngredient: extendedIngredients){
                ProductInfo currentIngredient = new ProductInfo((long) extendedIngredient.getId(), extendedIngredient.getName(), extendedIngredient.getImage(),extendedIngredient.getUnit(), (int) extendedIngredient.getAmount());
                transformedIngredients.add(currentIngredient);
            }

            return new RecipeWithDetailsDTO(externalRecipeDetails.getId(), externalRecipeDetails.getTitle(), externalRecipeDetails.getInstructions(), externalRecipeDetails.getImage(), false, transformedIngredients, true);

        }


    }

}

