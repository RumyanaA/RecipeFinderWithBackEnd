package RecipeFinder.repositories;

import RecipeFinder.entities.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    @Query("select m from Meal m where m.user.id = ?1 and m.date between ?2 and ?3")
    List<Meal> findByUser_IdAndDateBetween(Long id, LocalDate dateStart, LocalDate dateEnd);


}
