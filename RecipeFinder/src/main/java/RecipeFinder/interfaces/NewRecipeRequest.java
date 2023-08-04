package RecipeFinder.interfaces;

import java.util.List;

public class NewRecipeRequest {

    private RecipeDTO recipe;
    private List<ProductDTO> productDTOs;

    public NewRecipeRequest(RecipeDTO recipe, List<ProductDTO> productDTOs) {
        this.recipe = recipe;
        this.productDTOs = productDTOs;
    }

    public RecipeDTO getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeDTO recipe) {
        this.recipe = recipe;
    }

    public List<ProductDTO> getProductDTOs() {
        return productDTOs;
    }

    public void setProductDTOs(List<ProductDTO> productDTOs) {
        this.productDTOs = productDTOs;
    }
}
