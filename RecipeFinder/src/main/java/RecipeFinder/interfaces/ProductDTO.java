package RecipeFinder.interfaces;

public class ProductDTO {

    private String title;

    private String image;

    private String unit;

    private int number;

    public ProductDTO() {
    }

    public ProductDTO(String title, String image, String unit, int number) {
        this.title = title;
        this.image = image;
        this.unit = unit;
        this.number = number;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
    // Constructors, getters and setters
}
