package RecipeFinder.ExternalApiClasses;

import java.util.List;

public class ExternalRecipesByIngredientsResponse extends ExternalRecipe{
    private Integer likes;
    private Integer missedIngredientCount;
    private List<ExternalMissedOrUnusedIngredient> missedIngredients;
    private List<ExternalMissedOrUnusedIngredient> unusedIngredients;
    private Integer usedIngredientCount;
    private List<ExternalMissedOrUnusedIngredient> usedIngredients;

    public ExternalRecipesByIngredientsResponse() {
    }

    public ExternalRecipesByIngredientsResponse(Long id, String title, String image, String imageType, Integer likes,Integer missedIngredientCount, List<ExternalMissedOrUnusedIngredient> missedIngredients, List<ExternalMissedOrUnusedIngredient> unusedIngredients, Integer usedIngredientCount, List<ExternalMissedOrUnusedIngredient> usedIngredients) {
        super(id, title, image, imageType);
        this.likes = likes;
        this.missedIngredientCount = missedIngredientCount;
        this.missedIngredients = missedIngredients;
        this.unusedIngredients = unusedIngredients;
        this.usedIngredientCount = usedIngredientCount;
        this.usedIngredients = usedIngredients;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getMissedIngredientCount() {
        return missedIngredientCount;
    }

    public void setMissedIngredientCount(Integer missedIngredientCount) {
        this.missedIngredientCount = missedIngredientCount;
    }

    public List<ExternalMissedOrUnusedIngredient> getMissedIngredients() {
        return missedIngredients;
    }

    public void setMissedIngredients(List<ExternalMissedOrUnusedIngredient> missedIngredients) {
        this.missedIngredients = missedIngredients;
    }

    public List<ExternalMissedOrUnusedIngredient> getUnusedIngredients() {
        return unusedIngredients;
    }

    public void setUnusedIngredients(List<ExternalMissedOrUnusedIngredient> unusedIngredients) {
        this.unusedIngredients = unusedIngredients;
    }

    public Integer getUsedIngredientCount() {
        return usedIngredientCount;
    }

    public void setUsedIngredientCount(Integer usedIngredientCount) {
        this.usedIngredientCount = usedIngredientCount;
    }

    public List<ExternalMissedOrUnusedIngredient> getUsedIngredients() {
        return usedIngredients;
    }

    public void setUsedIngredients(List<ExternalMissedOrUnusedIngredient> usedIngredients) {
        this.usedIngredients = usedIngredients;
    }
}
