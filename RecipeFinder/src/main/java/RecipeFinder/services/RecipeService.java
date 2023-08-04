package RecipeFinder.services;

import RecipeFinder.entities.Product;
import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.RecipeProduct;
import RecipeFinder.entities.RecipeProductId;
import RecipeFinder.interfaces.ProductDTO;
import RecipeFinder.interfaces.RecipeDTO;
import RecipeFinder.interfaces.RecipeResponse;
import RecipeFinder.repositories.ProductRepository;
import RecipeFinder.repositories.RecipeProductRepository;
import RecipeFinder.repositories.RecipeRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final RecipeProductRepository recipeProductRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, ProductRepository productRepository, RecipeProductRepository recipeProductRepository) {
        this.recipeRepository = recipeRepository;
        this.productRepository=productRepository;
        this.recipeProductRepository = recipeProductRepository;
    }

    private List<Recipe> convertRecipeDTOToRecipe(List<RecipeResponse> recipes){
        List<Recipe> recipeList = new ArrayList<>();

        for(RecipeResponse recipeRes: recipes){
            Recipe recipeToReturn = new Recipe();
            recipeToReturn.setId(recipeRes.getId());
            recipeToReturn.setInstructions(recipeRes.getInstructions());
            recipeToReturn.setIngredients(recipeRes.getIngredients());
            recipeToReturn.setProtein(recipeRes.getProtein());
            recipeToReturn.setCalories(recipeRes.getCalories());
            recipeToReturn.setTitle(recipeRes.getTitle());
            recipeToReturn.setCarbs(recipeRes.getCarbs());
            recipeToReturn.setFat(recipeRes.getFat());
            recipeToReturn.setImage(recipeRes.getImage());
            recipeList.add(recipeToReturn);
        }
        return recipeList;
    }

    public Long addNewRecipe(RecipeDTO recipeDTO, List<ProductDTO> productDTOs){
        Recipe recipe = modelMapper.map(recipeDTO, Recipe.class);
        recipe = recipeRepository.save(recipe);

        for (ProductDTO productDTO : productDTOs) {
            Product product = productRepository.findByTitle(productDTO.getTitle());

            if (product == null) {
                product = modelMapper.map(productDTO, Product.class);
                product = productRepository.save(product);
            }
            RecipeProduct recipeProduct = new RecipeProduct();
            RecipeProductId id = new RecipeProductId(recipe.getId(), product.getId());
            recipeProduct.setId(id);
            recipeProduct.setRecipe(recipe);
            recipeProduct.setProduct(product);
            recipeProduct.setUnit(productDTO.getUnit());
            recipeProduct.setNumber(productDTO.getNumber());
            recipeProductRepository.save(recipeProduct);

        }
    return recipe.getId();

    }


    public List<Recipe> getRandomRecipes(Long addedBy){
        return recipeRepository.findByAdded_by_Id(addedBy);
    }

    public List<Recipe> getRecipesByText(String keyword, Long addedBy){
        List<RecipeResponse> currentRecipes = recipeRepository.findByTitleStartsWithAndAddedBy_IdOrUser_Id(keyword, addedBy);
        return this.convertRecipeDTOToRecipe(currentRecipes);
    }

    public List<Recipe> getRecipesByNutritions(Integer carbs, Integer protein, Integer fat, Integer calories, Long addedBy) {
        List<RecipeResponse> currentRecipes = recipeRepository.findByCarbsLessThanEqualAndProteinLessThanEqualAndFatLessThanEqualAndCaloriesLessThanEqualAndAddedBy_Id(carbs, protein,fat,calories, addedBy, addedBy);
        return this.convertRecipeDTOToRecipe(currentRecipes);
    }


    public List<Recipe> getRecipesByProducts(List<String> products, Long addedBy){
        List<RecipeResponse> currentRecipes = recipeRepository.findByAddedBy_IdAndIngredients_Id(addedBy, products);
        return this.convertRecipeDTOToRecipe(currentRecipes);
    }

    public List<Recipe> getUserFavouriteRecipes(Long userId){
        List<RecipeResponse> recipes =  recipeRepository.findByUser_Id(userId);
        return this.convertRecipeDTOToRecipe(recipes);
    }

    public Recipe getRecipeById(Long recipeId){
        return recipeRepository.findById(recipeId).orElse(null);
    }
}
