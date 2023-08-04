package RecipeFinder.controllers;

import RecipeFinder.ExternalApiClasses.ExternalIngredientsResponse;
import RecipeFinder.entities.Product;
import RecipeFinder.entities.Recipe;
import RecipeFinder.entities.RecipeProduct;
import RecipeFinder.interfaces.ProductInfo;
import RecipeFinder.services.ExternalApiService;
import RecipeFinder.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Stream;

@CrossOrigin( origins = "http://localhost:3000")
@RestController
@RequestMapping()
public class ProductController {

    private final ProductService productService;
    private final ExternalApiService externalApiService;


    @Autowired
    public ProductController(ProductService productService,ExternalApiService externalApiService) {
        this.productService = productService;
        this.externalApiService = externalApiService;
    }

    @GetMapping("/product")
    public List<Product> getProducts(@RequestParam String keyword){
            String apiKey = externalApiService.getApiKey();
        Integer numOfExternalRecipes = 10;
            String url = "https://api.spoonacular.com/food/ingredients/search?apiKey=" +
                    apiKey + "&query=" + keyword+"&number="+numOfExternalRecipes;
            RestTemplate restTemplate = new RestTemplate();
            ExternalIngredientsResponse externalApiResponse = restTemplate.getForObject(url,ExternalIngredientsResponse.class);
            List<Product> externalProducts = externalApiService.transformProductResponse(externalApiResponse);
        return externalProducts;
    }

    @GetMapping("/ingredients")
    public List<ProductInfo> getIngredientsByRecipe(@RequestParam Long recipeId){

        return productService.getIngredientsByRecipe(recipeId);

    }
}
