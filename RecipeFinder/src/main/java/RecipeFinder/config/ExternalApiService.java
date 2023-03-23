package RecipeFinder.config;

import RecipeFinder.ExternalApiCLasses.ExternalApiResponse;
import RecipeFinder.ExternalApiCLasses.Result;
import RecipeFinder.entities.Recipe;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalApiService {
    private static final String apiKey = "f18bfba18484488fb3297993e495b7fd";

    public String getApiKey(){
        return apiKey;
    }

    public List<Recipe> transformResponse(ExternalApiResponse apiResponse){
        List<Recipe> transformedResponse = new ArrayList<>();
        List<Result> result = apiResponse.getResult();
            for(Result currentResult: result){
                Recipe currentRecipe = new Recipe();
                currentRecipe.setId(currentResult.getId());
                currentRecipe.setTitle(currentResult.getTitle());
                currentRecipe.setImage(currentResult.getImage());
                transformedResponse.add(currentRecipe);
            }
            return transformedResponse;
    }
}
