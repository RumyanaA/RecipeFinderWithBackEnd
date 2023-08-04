package RecipeFinder.ExternalApiClasses;

public class RecipeWithNutritionsApiResponse {
    private Long id;
    private String title;
    private String image;
    private String imageType;
    private Integer calories;
    private String protein;
    private String fat;
    private String carbs;

    public RecipeWithNutritionsApiResponse() {
    }

    public RecipeWithNutritionsApiResponse(Long id, String title, String image, String imageType, Integer calories, String protein, String fat, String carbs) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.imageType = imageType;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public String getProtein() {
        return protein;
    }

    public void setProtein(String protein) {
        this.protein = protein;
    }

    public String getFat() {
        return fat;
    }

    public void setFat(String fat) {
        this.fat = fat;
    }

    public String getCarbs() {
        return carbs;
    }

    public void setCarbs(String carbs) {
        this.carbs = carbs;
    }
}
