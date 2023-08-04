package RecipeFinder.interfaces;
import RecipeFinder.enums.MealType;

import java.time.LocalDate;

public class MealDTO {

    private Long id;
    private LocalDate date;
    private RecipeWithDetailsDTO recipe;
    private MealType mealType;

    public MealDTO() {
    }

    public MealDTO(Long id, LocalDate date, RecipeWithDetailsDTO recipe, MealType mealType) {
        this.id = id;
        this.date = date;
        this.recipe = recipe;
        this.mealType = mealType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public RecipeWithDetailsDTO getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeWithDetailsDTO recipe) {
        this.recipe = recipe;
    }

    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }
}
