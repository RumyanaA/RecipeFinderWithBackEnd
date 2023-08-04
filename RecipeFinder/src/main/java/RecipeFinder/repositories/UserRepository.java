package RecipeFinder.repositories;


import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.Users;
import RecipeFinder.interfaces.UserLoginData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);



    UserLoginData findOneByEmail(String email);

    @Transactional
    @Modifying
    @Query("update Users u set u.favouriteRecipes = ?1 where u.id = ?2")
    int updateFavouriteRecipesById(Recipe favouriteRecipes, Long id);


    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM Users u WHERE u.email = ?1")
    boolean existsByEmail(String email);
}
