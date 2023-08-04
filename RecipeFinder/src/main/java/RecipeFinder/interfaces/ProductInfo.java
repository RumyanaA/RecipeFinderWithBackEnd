package RecipeFinder.interfaces;

public class ProductInfo {
    private Long id;
    private String title;
    private String image;
    private String unit;
    private Integer number;

    public ProductInfo(Long id, String title, String image, String unit, Integer number) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.unit = unit;
        this.number = number;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
// Getters and setters...
}