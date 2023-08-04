package RecipeFinder.repositories;

import RecipeFinder.entities.RecipeProduct;
import RecipeFinder.interfaces.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeProductRepository extends JpaRepository<RecipeProduct, Long> {

    @Query("SELECT new RecipeFinder.interfaces.ProductInfo(p.id, p.title, p.image, rp.unit, rp.number) FROM RecipeProduct rp JOIN rp.product p WHERE rp.recipe.id = ?1")
    List<ProductInfo> findProductsByRecipeId(Long id);



}
