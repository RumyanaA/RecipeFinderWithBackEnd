package RecipeFinder.services;

import RecipeFinder.entities.Product;
import RecipeFinder.entities.Recipe;
import RecipeFinder.repositories.ProductRepository;
import RecipeFinder.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, ProductRepository productRepository) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
    }

    public Long addNewRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
        return recipe.getId();
    }

    public List<Recipe> getRecipesByText(String keyword, Long userId){
        return recipeRepository.findByTitleContainsIgnoreCaseAndAddedBy_Id(keyword, userId);
    }

    public List<Recipe> getRecipesByNutritions(Integer carbs, Integer protein, Integer fat, Integer calories, Long addedBy) {
        return recipeRepository.findByCarbsLessThanEqualAndProteinLessThanEqualAndFatLessThanEqualAndCaloriesLessThanEqualAndAddedBy_Id(carbs, protein,fat,calories, addedBy);
    }

    public List<Product> getProducts(String productTitle) {
        return productRepository.findByTitleContainsIgnoreCaseOrderByTitleDesc(productTitle);
    }
}
