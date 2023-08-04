package RecipeFinder.interfaces;


import java.util.List;

public class RecipeWithDetailsDTO {
    private Long id;
    private String title;
    private String instructions;
    private String image;
    private boolean isUserFavourite;
    private List<ProductInfo> extendedIngredients;
    private boolean isExternal;

    public RecipeWithDetailsDTO(Long id, String title, String instructions, String image, boolean isUserFavourite, List<ProductInfo> extendedIngredients, boolean isExternal) {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
        this.image = image;
        this.isUserFavourite = isUserFavourite;
        this.extendedIngredients = extendedIngredients;
        this.isExternal = isExternal;
    }

    public boolean isExternal() {
        return isExternal;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getInstructions() {
        return instructions;
    }

    public String getImage() {
        return image;
    }

    public List<ProductInfo> getExtendedIngredients() {
        return extendedIngredients;
    }

    public boolean isUserFavourite() {
        return isUserFavourite;
    }

}
