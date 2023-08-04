package RecipeFinder.interfaces;
import RecipeFinder.entities.RecipeProduct;

import java.util.Set;

public interface RecipeResponse {
     Long getId();
     String getTitle();
     String getInstructions();
     String getImage();
     Integer getFat();
     Integer getCalories();
     Integer getCarbs();
     Integer getProtein();
     Set<RecipeProduct> getIngredients();
}
