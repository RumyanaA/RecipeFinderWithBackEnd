package RecipeFinder.repositories;

import RecipeFinder.entities.Recipe;
import RecipeFinder.interfaces.RecipeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("SELECT r " +
            "FROM Recipe r " +
            "LEFT JOIN r.user user " +
            "WHERE r.title LIKE :title% " +
            "AND (user.id = :addedBy OR r.addedBy.id = :addedBy) " +
            "ORDER BY RANDOM()")
    List<RecipeResponse> findByTitleStartsWithAndAddedBy_IdOrUser_Id(@Param("title") String title,@Param("addedBy") Long addedBy);


    @Query("""
            select r from Recipe  r left join r.user user
            where r.carbs <= ?1 and r.protein <= ?2 and r.fat <= ?3 and r.calories <= ?4 and r.addedBy.id = ?5 or user.id = ?6  ORDER BY random() limit 10""")
    List<RecipeResponse> findByCarbsLessThanEqualAndProteinLessThanEqualAndFatLessThanEqualAndCaloriesLessThanEqualAndAddedBy_Id(Integer carbs, Integer protein, Integer fat, Integer calories, Long id, Long id1);

@Query("SELECT r " +
        "FROM Recipe r " +
        "LEFT JOIN r.user user " +
        "JOIN r.ingredients ri " +
        "JOIN ri.product p " +
        "WHERE p.title IN :titles " +
        "AND (user.id = :addedBy OR r.addedBy.id = :addedBy) " +
        "ORDER BY RANDOM()")
    List<RecipeResponse> findByAddedBy_IdAndIngredients_Id(@Param("addedBy") Long addedBy,
                                                           @Param("titles") List<String> titles);


    @Query("""
            select r from Recipe r 
            where r.addedBy.id = ?1
            ORDER BY random() limit 10""")
    List<Recipe> findByAdded_by_Id(Long id);

    List<RecipeResponse> findByUser_Id(Long id);

}
