package RecipeFinder.services;

import RecipeFinder.ExternalApiClasses.*;
import RecipeFinder.entities.Product;
import RecipeFinder.entities.Recipe;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ExternalApiService {
    private static final String apiKey = "2a5063ca93b046489d3923f17426e210";

    public String getApiKey(){
        return apiKey;
    }

    public List<Recipe> transformRecipeResponse(ExternalRecipesResponse apiResponse){
        List<Recipe> transformedResponse = new ArrayList<>();
        List<ExternalRecipe> result = apiResponse.getResults();
            for(ExternalRecipe currentResult: result){
                Recipe currentRecipe = new Recipe();
                currentRecipe.setId(currentResult.getId());
                currentRecipe.setTitle(currentResult.getTitle());
                currentRecipe.setImage(currentResult.getImage());
                transformedResponse.add(currentRecipe);
            }
            return transformedResponse;
    }

    public List<Product> transformProductResponse(ExternalIngredientsResponse apiResponse){
        List<Product> transformedResponse = new ArrayList<>();
        List<ExternalIngredient> result = apiResponse.getResults();
        for(ExternalIngredient currentIngredient: result){
            Product currentProduct = new Product();
            currentProduct.setId(currentIngredient.getId());
            currentProduct.setTitle(currentIngredient.getName());
            currentProduct.setImage(currentIngredient.getImage());
            transformedResponse.add(currentProduct);
        }
        return transformedResponse;
    }

    private Integer convertNutritionStringToInt(String nutrition){
        return Integer.parseInt(nutrition.substring(0, nutrition.length() - 1));
    }

    public List<Recipe> removeUnitFromNutritions(List<RecipeWithNutritionsApiResponse> recipeWithNutritionsApiResponse){
        List<Recipe> transformedResponse = new ArrayList<>();
        for(RecipeWithNutritionsApiResponse externalRecipe: recipeWithNutritionsApiResponse){
            Recipe currentRecipe = new Recipe();
            currentRecipe.setId(externalRecipe.getId());
            currentRecipe.setTitle(externalRecipe.getTitle());
            currentRecipe.setImage(externalRecipe.getImage());
            currentRecipe.setCalories(externalRecipe.getCalories());
            currentRecipe.setCarbs(this.convertNutritionStringToInt(externalRecipe.getCarbs()));
            currentRecipe.setFat(this.convertNutritionStringToInt(externalRecipe.getFat()));
            currentRecipe.setProtein(this.convertNutritionStringToInt(externalRecipe.getProtein()));
            transformedResponse.add(currentRecipe);
        }
        return transformedResponse;

    }

    private Set<Product> transformRecipeIngredients(List<ExternalMissedOrUnusedIngredient> ingredients){
        Set<Product> transformedResponse = new HashSet<>();
        for(ExternalMissedOrUnusedIngredient ingredient: ingredients){
            Product currentProduct = new Product();
            currentProduct.setId(ingredient.getId());
            currentProduct.setImage(ingredient.getImage());
            currentProduct.setTitle(ingredient.getName());
            transformedResponse.add(currentProduct);
        }
        return transformedResponse;

    }

    public List<Recipe> transformRecipesByIngredientsResponse(List<ExternalRecipesByIngredientsResponse> apiResponse){
        List<Recipe> transformedResponse = new ArrayList<>();
        for(ExternalRecipesByIngredientsResponse currentResult: apiResponse){
            Recipe currentRecipe = new Recipe();
            currentRecipe.setId(currentResult.getId());
            currentRecipe.setTitle(currentResult.getTitle());
            currentRecipe.setImage(currentResult.getImage());
            List<ExternalMissedOrUnusedIngredient> recipeUsedIngredients = currentResult.getUsedIngredients();
//            currentRecipe.setIngredients(this.transformRecipeIngredients(recipeUsedIngredients));
            transformedResponse.add(currentRecipe);
        }
        return transformedResponse;
    }
}
