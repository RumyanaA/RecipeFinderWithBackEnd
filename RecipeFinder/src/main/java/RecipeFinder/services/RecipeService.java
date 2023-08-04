package RecipeFinder.services;

import RecipeFinder.entities.Product;
import RecipeFinder.entities.Recipe;
import RecipeFinder.repositories.ProductRepository;
import RecipeFinder.repositories.RecipeRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, ProductRepository productRepository) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
    }

    public List<Recipe> getUserFavouriteRecipes(Long userId){
        List<RecipeResponse> recipes =  recipeRepository.findByUser_Id(userId);
        return this.convertRecipeDTOToRecipe(recipes);
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
