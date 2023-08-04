package RecipeFinder.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique=true)
    private String title;
    @Column(columnDefinition="TEXT")
    private String image;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product")
    private Set<RecipeProduct> recipes = new HashSet<>();


    public Product() {
    }

    public Product(Long id, String title, String image, Set<RecipeProduct> recipes) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.recipes = recipes;
    }


    public Set<RecipeProduct> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<RecipeProduct> recipes) {
        this.recipes = recipes;
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

}

