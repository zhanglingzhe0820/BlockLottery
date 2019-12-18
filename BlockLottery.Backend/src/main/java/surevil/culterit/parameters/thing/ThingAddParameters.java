package surevil.culterit.parameters.thing;

public class ThingAddParameters {
    private String name;
    private String url;
    private String description;
    private double price;

    public ThingAddParameters() {
    }

    public ThingAddParameters(String name, String url, String description, double price) {
        this.name = name;
        this.url = url;
        this.description = description;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
