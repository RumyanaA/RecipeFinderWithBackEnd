package RecipeFinder.controllers;

import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.Users;
import RecipeFinder.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/recipe")
public class RecipeController {
    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("add")
    public Long addNewRecipe(@RequestBody Recipe recipe) {
        return recipeService.addNewRecipe(recipe);
    }

    @GetMapping("keyword")
    public List<Recipe> getRecipeByText(@RequestParam String keyword, Long userId) {
        return recipeService.getRecipesByText(keyword,userId);
    }
}
