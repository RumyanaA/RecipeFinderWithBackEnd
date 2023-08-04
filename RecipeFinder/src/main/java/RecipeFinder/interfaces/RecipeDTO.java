package RecipeFinder.interfaces;

import RecipeFinder.entities.Users;

import java.util.Set;

public class RecipeDTO {

    private String title;

    private String instructions;
    private String image;
    private Integer fat;
    private Integer calories;
    private Integer carbs;
    private Integer protein;

    private Users addedBy;
    private Set<Long> userIds;

    public RecipeDTO() {
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

    public Users getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Users addedBy) {
        this.addedBy = addedBy;
    }

    public Set<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(Set<Long> userIds) {
        this.userIds = userIds;
    }
}
