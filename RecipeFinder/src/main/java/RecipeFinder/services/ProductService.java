package RecipeFinder.services;

import RecipeFinder.entities.Product;
import RecipeFinder.entities.RecipeProduct;
import RecipeFinder.interfaces.ProductInfo;
import RecipeFinder.repositories.ProductRepository;
import RecipeFinder.repositories.RecipeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final RecipeProductRepository recipeProductRepository;
    @Autowired
    public ProductService( ProductRepository productRepository, RecipeProductRepository recipeProductRepository) {
        this.productRepository = productRepository;
        this.recipeProductRepository = recipeProductRepository;
    }

    public List<Product> getProducts(String productTitle) {
        return productRepository.findByTitleContainsIgnoreCaseOrderByTitleDesc(productTitle);
    }

    public List<ProductInfo> getIngredientsByRecipe(Long recipeId) {

       return recipeProductRepository.findProductsByRecipeId(recipeId);
    }
}
