package RecipeFinder.controllers;

import RecipeFinder.ExternalApiCLasses.ExternalApiResponse;
import RecipeFinder.config.ExternalApiService;
import RecipeFinder.entities.Recipe;
import RecipeFinder.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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
            ExternalApiResponse externalapiResponse = restTemplate.getForObject(url,ExternalApiResponse.class);
            List<Recipe> externalRecipes = externalApiService.transformResponse(externalapiResponse);
            List<Recipe> combinedListOfRecipes = Stream.concat(userSavedRecipes.stream(), externalRecipes.stream()).toList();
            System.out.println(combinedListOfRecipes.toString());
            return combinedListOfRecipes;

//            return userSavedRecipes;
        }else{
            return userSavedRecipes;
        }

    }
}
