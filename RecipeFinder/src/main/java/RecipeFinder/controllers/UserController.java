package RecipeFinder.controllers;

import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.Users;
import RecipeFinder.interfaces.ProductDTO;
import RecipeFinder.interfaces.RecipeDTO;
import RecipeFinder.interfaces.UserFavouriteRecipe;
import RecipeFinder.interfaces.UserLoginData;
import RecipeFinder.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin( origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("registration")
    public  ResponseEntity<?> addNewUser(@RequestBody Users user) {
        try {
            UserLoginData userLoginData = userService.addNewUser(user);
            return ResponseEntity.ok(userLoginData);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

    }

    @GetMapping("login")
    public ResponseEntity<?> getUser(@RequestParam String email, String password) {
        try {
            UserLoginData userLoginData = userService.getUser(email, password);
            return ResponseEntity.ok(userLoginData);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("add/favourite/recipe")
    public Long addFavouriteRecipe(@RequestBody UserFavouriteRecipe reqData){
        Long userId = reqData.getUserId();
        Long recipeId = reqData.getRecipeId();
        RecipeDTO recipe= reqData.getRecipe();
        List<ProductDTO> ingredients= reqData.getProductDTOs();

        return userService.addFavouriteRecipe(userId,recipeId, recipe, ingredients);
    }
    @PostMapping("remove/favourite/recipe")
    public void removeFavouriteRecipe(@RequestBody UserFavouriteRecipe reqData){
        Long userId = reqData.getUserId();
        Long recipeId = reqData.getRecipeId();
        userService.removeFavouriteRecipe(userId,recipeId);
    }
}
