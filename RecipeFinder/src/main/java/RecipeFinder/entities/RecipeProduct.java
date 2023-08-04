package RecipeFinder.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "recipe_product")
public class RecipeProduct {

    @EmbeddedId
    private RecipeProductId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("recipeId")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("productId")
    private Product product;

    @Column
    private String unit;

    @Column
    private int number;

    public RecipeProduct() {
    }

    public RecipeProduct(Recipe recipe, Product product, String unit, int number) {

        this.recipe = recipe;
        this.product = product;
        this.unit = unit;
        this.number = number;
    }

    public RecipeProductId getId() {
        return id;
    }

    public void setId(RecipeProductId id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
    // Constructors, getters and setters
}
