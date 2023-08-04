package RecipeFinder.services;

import RecipeFinder.ExternalApiClasses.ExternalExtendedIngredient;
import RecipeFinder.ExternalApiClasses.ExternalRecipeDetails;
import RecipeFinder.entities.Meal;
import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.Users;
import RecipeFinder.interfaces.MealDTO;
import RecipeFinder.interfaces.ProductInfo;
import RecipeFinder.interfaces.RecipeWithDetailsDTO;
import RecipeFinder.repositories.MealRepository;
import RecipeFinder.repositories.RecipeRepository;
import RecipeFinder.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class MealService {
    private final ExternalApiService externalApiService;
    private final MealRepository mealRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public MealService(ExternalApiService externalApiService, MealRepository mealRepository, UserRepository userRepository, RecipeRepository recipeRepository, ProductService productService, UserService userService) {
        this.externalApiService = externalApiService;
        this.mealRepository = mealRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.productService = productService;
        this.userService = userService;
    }

    public  List<MealDTO> addMeal(Meal meal){
        Users user = userRepository.getReferenceById(meal.getUser().getId());
        meal.setUser(user);
        Recipe recipe = meal.getRecipe();
        if(recipe != null){
            Recipe recipeToSave = recipeRepository.getReferenceById(recipe.getId());
            meal.setRecipe(recipeToSave);
        }
        Meal savedMeal = mealRepository.save(meal);
        List<Meal> mealsToTransform = new ArrayList<>();
        mealsToTransform.add(savedMeal);
        List<MealDTO> transformedMeals = this.transformMealDTO(mealsToTransform);
        return transformedMeals;
    }

    private List<MealDTO> transformMealDTO (List<Meal> meals){
        List<MealDTO> transformedMeals = new ArrayList<>();
        for(Meal currentMeal: meals){
            Recipe recipe = currentMeal.getRecipe();
            if(recipe != null){
                List<ProductInfo> ingredients = productService.getIngredientsByRecipe(recipe.getId());
                recipe.setExtendedIngredients(ingredients);
                Set<Users> favouriteByUsers = recipe.getUser();
                boolean isFavouriteByCurrentUser = false;
                if(favouriteByUsers.size()>0){
                    Users currentUser = userService.getUserById(currentMeal.getUser().getId());
                    isFavouriteByCurrentUser= favouriteByUsers.contains(currentUser);

                }
                RecipeWithDetailsDTO recipeToAdd =  new RecipeWithDetailsDTO(recipe.getId(), recipe.getTitle(), recipe.getInstructions(), recipe.getImage(), isFavouriteByCurrentUser, recipe.getExtendedIngredients(), false);
                MealDTO mealToAdd = new MealDTO(currentMeal.getId(),currentMeal.getDate(),recipeToAdd,currentMeal.getMealType());
                transformedMeals.add(mealToAdd);
            }else{
                String apiKey = externalApiService.getApiKey();
                String url = "https://api.spoonacular.com/recipes/"+currentMeal.getExternalRecipeId()+"/information?includeNutrition=false"+"&apiKey="+apiKey;
                RestTemplate restTemplate = new RestTemplate();
                ExternalRecipeDetails externalRecipeDetails = restTemplate.getForObject(url,ExternalRecipeDetails.class);

                List<ExternalExtendedIngredient> extendedIngredients= externalRecipeDetails.getExtendedIngredients();
                List<ProductInfo> transformedIngredients = new ArrayList<>();
                for(ExternalExtendedIngredient extendedIngredient: extendedIngredients){
                    ProductInfo currentIngredient = new ProductInfo((long) extendedIngredient.getId(), extendedIngredient.getName(), extendedIngredient.getImage(),extendedIngredient.getUnit(), (int) extendedIngredient.getAmount());
                    transformedIngredients.add(currentIngredient);
                }
                RecipeWithDetailsDTO recipeToAdd =  new RecipeWithDetailsDTO(currentMeal.getExternalRecipeId(), externalRecipeDetails.getTitle(), externalRecipeDetails.getInstructions(), externalRecipeDetails.getImage(), false, transformedIngredients, true);
                MealDTO mealToAdd = new MealDTO(currentMeal.getId(),currentMeal.getDate(),recipeToAdd,currentMeal.getMealType());
                transformedMeals.add(mealToAdd);

            }
        }
        return transformedMeals;
    }
    public  List<MealDTO>  getMonthlyMeals(Long userId){
        LocalDate currentDate = LocalDate.now();
        LocalDate firstDayOfMonth = currentDate.withDayOfMonth( 1 );
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // Format the first day of the month
        LocalDate dateStart = LocalDate.parse(firstDayOfMonth.format(formatter));

        LocalDate lastDayOfMonth = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        // Format the last day of the month
        LocalDate dateEnd = LocalDate.parse(lastDayOfMonth.format(formatter));

        List<Meal> meals = mealRepository.findByUser_IdAndDateBetween(userId, dateStart, dateEnd);
        List<MealDTO> transformedMeals = this.transformMealDTO(meals);
        return transformedMeals;
    }

    public void deleteMeal(Long mealId){
        mealRepository.deleteById(mealId);
    }
}
