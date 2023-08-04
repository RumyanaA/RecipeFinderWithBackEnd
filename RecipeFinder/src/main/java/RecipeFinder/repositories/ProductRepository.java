package RecipeFinder.repositories;

import RecipeFinder.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTitleContainsIgnoreCaseOrderByTitleDesc(String title);

    Set<Product> findByTitleIn(Collection<String> titles);


    Product findByTitle(String title);

}
