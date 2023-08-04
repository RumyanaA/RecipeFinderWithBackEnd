package RecipeFinder.services;

import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.Users;
import RecipeFinder.interfaces.ProductDTO;
import RecipeFinder.interfaces.RecipeDTO;
import RecipeFinder.interfaces.UserLoginData;
import RecipeFinder.repositories.RecipeRepository;
import RecipeFinder.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RecipeRepository recipeRepository, RecipeService recipeService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.recipeService = recipeService;
        this.bCryptPasswordEncoder=bCryptPasswordEncoder;
    }

    public UserLoginData addNewUser(Users user) {
        // handle exception when email exists
        if (userRepository.existsByEmail(user.getEmail())) {
            // Throw exception when email already exists
            throw new IllegalArgumentException("Email already exists");
        }
        user.setPassword(bCryptPasswordEncoder
                .encode(user.getPassword()));
        userRepository.save(user);
       return userRepository.findOneByEmail(user.getEmail());
    }

    public UserLoginData getUser(String email, String password) {
        Users user = userRepository.findByEmail(email);
        if(user == null){
            // handle exception when user doesn't exists
            throw new UsernameNotFoundException("User not found");
        }else {
            if(bCryptPasswordEncoder.matches(password, user.getPassword())){
                return userRepository.findOneByEmail(email);
            }else{
                throw new UsernameNotFoundException("User not found");
            }
        }
    }

    public Users getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    public Long addFavouriteRecipe(Long userId,Long recipeId, RecipeDTO recipe, List<ProductDTO> ingredients) {
        Users user = userRepository.findById(userId).get();
        Optional <Recipe> recipeOptional= recipeRepository.findById(recipeId);

    if(recipeOptional.isEmpty()){
        Long newRecipeId = recipeService.addNewRecipe(recipe, ingredients);
         recipeOptional = recipeRepository.findById(newRecipeId);
    }
        Set<Recipe> recipes = user.getFavouriteRecipes();
        recipes.add(recipeOptional.get());
        user.setFavouriteRecipes(recipes);
        userRepository.saveAndFlush(user);
        return recipeOptional.get().getId();
    }

    public void removeFavouriteRecipe(Long userId, Long recipeId) {
        Users user = userRepository.findById(userId).get();
        Recipe recipe = recipeRepository.findById(recipeId).get();
        Set<Recipe> recipes = user.getFavouriteRecipes();
        recipes.remove(recipe);
        user.setFavouriteRecipes(recipes);
        userRepository.saveAndFlush(user);
    }
}