package RecipeFinder.entities;

import RecipeFinder.enums.MealType;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(uniqueConstraints = {
@UniqueConstraint(columnNames = {"date", "mealType", "recipe_id"}),
@UniqueConstraint(columnNames = {"date", "mealType", "external_recipe_id"})
})
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "external_recipe_id")
    private Long externalRecipeId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private Recipe recipe;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    public Meal() {
    }

    public Meal(Long id, LocalDate date, Long externalRecipeId, Recipe recipe, Users user, MealType mealType) {
        this.id = id;
        this.date = date;
        this.externalRecipeId = externalRecipeId;
        this.recipe = recipe;
        this.user = user;
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

    public Long getExternalRecipeId() {
        return externalRecipeId;
    }

    public void setExternalRecipeId(Long externalRecipeId) {
        this.externalRecipeId = externalRecipeId;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }
}
