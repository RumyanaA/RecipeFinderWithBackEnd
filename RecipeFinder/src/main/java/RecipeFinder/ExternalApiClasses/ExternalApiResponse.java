package RecipeFinder.ExternalApiClasses;

import java.util.List;

public class ExternalApiResponse {
    private List<Result> results;
    private Integer offset;
    private Integer number;
    private Integer totalResults;

    public ExternalApiResponse() {
    }

    public ExternalApiResponse(List<Result> results, Integer offset, Integer number, Integer totalResults) {
        this.results = results;
        this.offset = offset;
        this.number = number;
        this.totalResults = totalResults;
    }

    public List<Result>  getResult() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(Integer totalResults) {
        this.totalResults = totalResults;
    }
}
