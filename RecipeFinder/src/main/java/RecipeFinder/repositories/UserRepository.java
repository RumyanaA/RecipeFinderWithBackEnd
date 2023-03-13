package RecipeFinder.repositories;


import RecipeFinder.entities.Users;
import RecipeFinder.interfaces.UserLoginData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    UserLoginData findOneByEmailAndPassword(String email, String password);
}
