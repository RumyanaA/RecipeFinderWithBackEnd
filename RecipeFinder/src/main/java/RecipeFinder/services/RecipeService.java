package RecipeFinder.services;

import RecipeFinder.entities.Recipe;
import RecipeFinder.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public Long addNewRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
        return recipe.getId();
    }

    public List<Recipe> getRecipesByText(String keyword, Long userId){
        return recipeRepository.findByTitleContainsIgnoreCaseAndUser_IdOrderByTitleAsc(keyword, userId);
        // if List.size() less than 10, fetch from External API
    }
}
