package RecipeFinder.entities;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RecipeProductId implements Serializable {

    private Long recipeId;

    private Long productId;

    public RecipeProductId() {
    }

    public RecipeProductId(Long recipeId, Long productId) {
        this.recipeId = recipeId;
        this.productId = productId;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeProductId that = (RecipeProductId) o;
        return Objects.equals(recipeId, that.recipeId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, productId);
    }

    // Constructors, equals and hashCode methods
}