package RecipeFinder.entities;
import RecipeFinder.interfaces.ProductInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table
public class Recipe {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    @Column(columnDefinition="TEXT")
    private String instructions;
    @Column(columnDefinition="TEXT")
    private String image;
    private Integer fat;
    private Integer calories;
    private Integer carbs;
    private Integer protein;
    @Transient
    private Meal meal;
    @Transient
    private List<ProductInfo> extendedIngredients;
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "addedBy")
    @JsonInclude(NON_NULL)
    private Users addedBy;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "recipe")
    private Set<RecipeProduct> ingredients = new HashSet<>();

    @ManyToMany(mappedBy = "favouriteRecipes",  cascade=CascadeType.ALL )
    @JsonInclude(NON_NULL)
    Set<Users> user;

    public Recipe(Long id, String title, String instructions, String image, Integer fat, Integer calories, Integer carbs, Integer protein, Users addedBy, Set<RecipeProduct> ingredients, Set<Users> user) {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
        this.image = image;
        this.fat = fat;
        this.calories = calories;
        this.carbs = carbs;
        this.protein = protein;
        this.addedBy = addedBy;
        this.ingredients = ingredients;
        this.user = user;
    }


    public Recipe() {
    }

    public List<ProductInfo> getExtendedIngredients() {
        return extendedIngredients;
    }

    public void setExtendedIngredients(List<ProductInfo> extendedIngredients) {
        this.extendedIngredients = extendedIngredients;
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

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
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


    public Set<RecipeProduct> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Set<RecipeProduct> ingredients) {
        this.ingredients = ingredients;
    }

    public Set<Users> getUser() {
        return user;
    }

    public void setUser(Set<Users> user) {
        this.user = user;
    }

    public Users getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Users addedBy) {
        this.addedBy = addedBy;
    }
}
