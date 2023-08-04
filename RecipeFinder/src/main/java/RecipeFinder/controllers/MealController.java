package RecipeFinder.controllers;

import RecipeFinder.entities.Meal;
import RecipeFinder.interfaces.MealDTO;
import RecipeFinder.services.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin( origins = "http://localhost:3000")
@RestController
@RequestMapping("/meal")
public class MealController {
    private final MealService mealService;

    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping("add")
    public  List<MealDTO> addNewMeal(@RequestBody Meal meal) {
        return mealService.addMeal(meal);
    }

    @GetMapping("monthly")
    public  List<MealDTO>  getMonthlyMeals(@RequestParam Long userId){
        List<MealDTO> meals = mealService.getMonthlyMeals(userId);
            return meals;
    }
    @DeleteMapping("delete")
    public void deleteMeal(@RequestParam Long mealId){
        mealService.deleteMeal(mealId);
    }
}
