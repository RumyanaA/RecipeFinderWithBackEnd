package RecipeFinder.repositories;

import RecipeFinder.entities.Recipe;
import RecipeFinder.interfaces.RecipeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("select r from Recipe r where upper(r.title) like upper(concat('%', ?1, '%')) and r.addedBy.id = ?2 ORDER BY random() limit 10")
    List<Recipe> findByTitleContainsIgnoreCaseAndAddedBy_Id(String title, Long id);

    @Query("""
            select r from Recipe r
            where r.carbs <= ?1 and r.protein <= ?2 and r.fat <= ?3 and r.calories <= ?4 and r.addedBy.id = ?5  ORDER BY random() limit 10""")
    List<Recipe> findByCarbsLessThanEqualAndProteinLessThanEqualAndFatLessThanEqualAndCaloriesLessThanEqualAndAddedBy_Id(Integer carbs, Integer protein, Integer fat, Integer calories, Long id);


}
