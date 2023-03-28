package RecipeFinder.ExternalApiClasses;

import java.util.List;

public class ExternalRecipesResponse extends BaseExternalApiResponse {
    private List<ExternalRecipe> results;

    public ExternalRecipesResponse() {
    }

    public ExternalRecipesResponse(Integer offset, Integer number, Integer totalResults, List<ExternalRecipe> results) {
        super(offset, number, totalResults);
        this.results = results;
    }

    public List<ExternalRecipe> getResults() {
        return results;
    }

    public void setResults(List<ExternalRecipe> results) {
        this.results = results;
    }
}
