package RecipeFinder.ExternalApiClasses;

import java.util.List;
import java.util.Map;

public class ExternalRecipeDetails {
    private Long id;
    private String title;
    private String image;
    private String imageType;
    private int servings;
    private int readyInMinutes;
    private String license;
    private String sourceName;
    private String sourceUrl;
    private String spoonacularSourceUrl;
    private int aggregateLikes;
    private double healthScore;
    private double spoonacularScore;
    private double pricePerServing;
    private List<Map<String, Object>> analyzedInstructions;
    private boolean cheap;
    private String creditsText;
    private List<String> cuisines;
    private boolean dairyFree;
    private List<String> diets;
    private String gaps;
    private boolean glutenFree;
    private String instructions;
    private boolean ketogenic;
    private boolean lowFodmap;
    private List<String> occasions;
    private boolean sustainable;
    private boolean vegan;
    private boolean vegetarian;
    private boolean veryHealthy;
    private boolean veryPopular;
    private boolean whole30;
    private int weightWatcherSmartPoints;
    private List<String> dishTypes;
    private List<ExternalExtendedIngredient> extendedIngredients;

    public ExternalRecipeDetails() {
    }

    public ExternalRecipeDetails(Long id, String title, String image, String imageType, int servings, int readyInMinutes, String license, String sourceName, String sourceUrl, String spoonacularSourceUrl, int aggregateLikes, double healthScore, double spoonacularScore, double pricePerServing, List<Map<String, Object>> analyzedInstructions, boolean cheap, String creditsText, List<String> cuisines, boolean dairyFree, List<String> diets, String gaps, boolean glutenFree, String instructions, boolean ketogenic, boolean lowFodmap, List<String> occasions, boolean sustainable, boolean vegan, boolean vegetarian, boolean veryHealthy, boolean veryPopular, boolean whole30, int weightWatcherSmartPoints, List<String> dishTypes, List<ExternalExtendedIngredient> extendedIngredients) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.imageType = imageType;
        this.servings = servings;
        this.readyInMinutes = readyInMinutes;
        this.license = license;
        this.sourceName = sourceName;
        this.sourceUrl = sourceUrl;
        this.spoonacularSourceUrl = spoonacularSourceUrl;
        this.aggregateLikes = aggregateLikes;
        this.healthScore = healthScore;
        this.spoonacularScore = spoonacularScore;
        this.pricePerServing = pricePerServing;
        this.analyzedInstructions = analyzedInstructions;
        this.cheap = cheap;
        this.creditsText = creditsText;
        this.cuisines = cuisines;
        this.dairyFree = dairyFree;
        this.diets = diets;
        this.gaps = gaps;
        this.glutenFree = glutenFree;
        this.instructions = instructions;
        this.ketogenic = ketogenic;
        this.lowFodmap = lowFodmap;
        this.occasions = occasions;
        this.sustainable = sustainable;
        this.vegan = vegan;
        this.vegetarian = vegetarian;
        this.veryHealthy = veryHealthy;
        this.veryPopular = veryPopular;
        this.whole30 = whole30;
        this.weightWatcherSmartPoints = weightWatcherSmartPoints;
        this.dishTypes = dishTypes;
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

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public int getReadyInMinutes() {
        return readyInMinutes;
    }

    public void setReadyInMinutes(int readyInMinutes) {
        this.readyInMinutes = readyInMinutes;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public String getSpoonacularSourceUrl() {
        return spoonacularSourceUrl;
    }

    public void setSpoonacularSourceUrl(String spoonacularSourceUrl) {
        this.spoonacularSourceUrl = spoonacularSourceUrl;
    }

    public int getAggregateLikes() {
        return aggregateLikes;
    }

    public void setAggregateLikes(int aggregateLikes) {
        this.aggregateLikes = aggregateLikes;
    }

    public double getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(double healthScore) {
        this.healthScore = healthScore;
    }

    public double getSpoonacularScore() {
        return spoonacularScore;
    }

    public void setSpoonacularScore(double spoonacularScore) {
        this.spoonacularScore = spoonacularScore;
    }

    public double getPricePerServing() {
        return pricePerServing;
    }

    public void setPricePerServing(double pricePerServing) {
        this.pricePerServing = pricePerServing;
    }

    public List<Map<String, Object>> getAnalyzedInstructions() {
        return analyzedInstructions;
    }

    public void setAnalyzedInstructions(List<Map<String, Object>> analyzedInstructions) {
        this.analyzedInstructions = analyzedInstructions;
    }

    public boolean isCheap() {
        return cheap;
    }

    public void setCheap(boolean cheap) {
        this.cheap = cheap;
    }

    public String getCreditsText() {
        return creditsText;
    }

    public void setCreditsText(String creditsText) {
        this.creditsText = creditsText;
    }

    public List<String> getCuisines() {
        return cuisines;
    }

    public void setCuisines(List<String> cuisines) {
        this.cuisines = cuisines;
    }

    public boolean isDairyFree() {
        return dairyFree;
    }

    public void setDairyFree(boolean dairyFree) {
        this.dairyFree = dairyFree;
    }

    public List<String> getDiets() {
        return diets;
    }

    public void setDiets(List<String> diets) {
        this.diets = diets;
    }

    public String getGaps() {
        return gaps;
    }

    public void setGaps(String gaps) {
        this.gaps = gaps;
    }

    public boolean isGlutenFree() {
        return glutenFree;
    }

    public void setGlutenFree(boolean glutenFree) {
        this.glutenFree = glutenFree;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public boolean isKetogenic() {
        return ketogenic;
    }

    public void setKetogenic(boolean ketogenic) {
        this.ketogenic = ketogenic;
    }

    public boolean isLowFodmap() {
        return lowFodmap;
    }

    public void setLowFodmap(boolean lowFodmap) {
        this.lowFodmap = lowFodmap;
    }

    public List<String> getOccasions() {
        return occasions;
    }

    public void setOccasions(List<String> occasions) {
        this.occasions = occasions;
    }

    public boolean isSustainable() {
        return sustainable;
    }

    public void setSustainable(boolean sustainable) {
        this.sustainable = sustainable;
    }

    public boolean isVegan() {
        return vegan;
    }

    public void setVegan(boolean vegan) {
        this.vegan = vegan;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public boolean isVeryHealthy() {
        return veryHealthy;
    }

    public void setVeryHealthy(boolean veryHealthy) {
        this.veryHealthy = veryHealthy;
    }

    public boolean isVeryPopular() {
        return veryPopular;
    }

    public void setVeryPopular(boolean veryPopular) {
        this.veryPopular = veryPopular;
    }

    public boolean isWhole30() {
        return whole30;
    }

    public void setWhole30(boolean whole30) {
        this.whole30 = whole30;
    }

    public int getWeightWatcherSmartPoints() {
        return weightWatcherSmartPoints;
    }

    public void setWeightWatcherSmartPoints(int weightWatcherSmartPoints) {
        this.weightWatcherSmartPoints = weightWatcherSmartPoints;
    }

    public List<String> getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(List<String> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public List<ExternalExtendedIngredient> getExtendedIngredients() {
        return extendedIngredients;
    }

    public void setExtendedIngredients(List<ExternalExtendedIngredient> extendedIngredients) {
        this.extendedIngredients = extendedIngredients;
    }
}
