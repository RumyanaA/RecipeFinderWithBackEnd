package RecipeFinder.ExternalApiClasses;

import java.util.List;

public class ExternalMissedOrUnusedIngredient extends ExternalIngredient{
    private String aisle;
    private Float amount;
    private List<String> meta;
    private String original;
    private String originalName;
    private String unit;
    private String unitLong;
    private String unitShort;

    public ExternalMissedOrUnusedIngredient() {
    }


    public ExternalMissedOrUnusedIngredient(Long id, String name, String image, String aisle, Float amount, List<String> meta, String original, String originalName, String unit, String unitLong, String unitShort) {
        super(id, name, image);
        this.aisle = aisle;
        this.amount = amount;
        this.meta = meta;
        this.original = original;
        this.originalName = originalName;
        this.unit = unit;
        this.unitLong = unitLong;
        this.unitShort = unitShort;
    }

    public String getAisle() {
        return aisle;
    }

    public void setAisle(String aisle) {
        this.aisle = aisle;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public List<String> getMeta() {
        return meta;
    }

    public void setMeta(List<String> meta) {
        this.meta = meta;
    }

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getUnitLong() {
        return unitLong;
    }

    public void setUnitLong(String unitLong) {
        this.unitLong = unitLong;
    }

    public String getUnitShort() {
        return unitShort;
    }

    public void setUnitShort(String unitShort) {
        this.unitShort = unitShort;
    }
}
