package RecipeFinder.repositories;

import RecipeFinder.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByTitleContainsIgnoreCaseAndUser_IdOrderByTitleAsc(String title, Long id);

}
