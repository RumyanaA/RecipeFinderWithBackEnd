package RecipeFinder.interfaces;

import java.util.List;

public class UserFavouriteRecipe extends NewRecipeRequest {
    private Long userId;
    private Long recipeId;

    public UserFavouriteRecipe(RecipeDTO recipe, List<ProductDTO> productDTOs) {
        super(recipe, productDTOs);
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }
}
