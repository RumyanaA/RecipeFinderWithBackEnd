package RecipeFinder.ExternalApiClasses;

public class BaseExternalApiResponse {
    private Integer offset;
    private Integer number;
    private Integer totalResults;

    public BaseExternalApiResponse() {
    }

    public BaseExternalApiResponse(Integer offset, Integer number, Integer totalResults) {
        this.offset = offset;
        this.number = number;
        this.totalResults = totalResults;
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
