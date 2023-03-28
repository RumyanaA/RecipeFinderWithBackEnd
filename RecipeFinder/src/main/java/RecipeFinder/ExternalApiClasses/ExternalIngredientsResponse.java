package RecipeFinder.ExternalApiClasses;

import java.util.List;

public class ExternalIngredientsResponse extends BaseExternalApiResponse{
private List<ExternalIngredient> results;

    public ExternalIngredientsResponse() {

    }

    public ExternalIngredientsResponse(Integer offset, Integer number, Integer totalResults, List<ExternalIngredient> results) {
        super(offset, number, totalResults);
        this.results = results;
    }

    public List<ExternalIngredient> getResults() {
        return results;
    }

    public void setResults(List<ExternalIngredient> results) {
        this.results = results;
    }
}
