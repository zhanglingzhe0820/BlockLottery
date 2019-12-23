package surevil.lottery.response.thing;

import surevil.lottery.response.Response;

public class ThingDetailLoadResponse extends Response {
    private int id;
    private String name;
    private String url;
    private String description;
    private double price;
    private long time;

    public ThingDetailLoadResponse() {
    }

    public ThingDetailLoadResponse(int id, String name, String url, String description, double price, long time) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.price = price;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
}
