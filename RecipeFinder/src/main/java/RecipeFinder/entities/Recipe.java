package RecipeFinder.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Recipe {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String directions;
    private String image;
    private Integer fat;
    private Integer calories;
    private Integer carbs;
    private Integer protein;
    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private Users addedBy;

    @ManyToMany
    @JoinTable(
            name = "recipe_product",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    Set<Product> ingredients;

    @ManyToMany(mappedBy = "favouriteRecipes")
    Set<Users> user;

    public Recipe(Long id, String title, String directions, String image, Integer fat, Integer calories, Integer carbs, Integer protein) {
        this.id = id;
        this.title = title;
        this.directions = directions;
        this.image = image;
        this.fat = fat;
        this.calories = calories;
        this.carbs = carbs;
        this.protein = protein;
    }

    public Recipe() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getCarbs() {
        return carbs;
    }

    public void setCarbs(Integer carbs) {
        this.carbs = carbs;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }
}
