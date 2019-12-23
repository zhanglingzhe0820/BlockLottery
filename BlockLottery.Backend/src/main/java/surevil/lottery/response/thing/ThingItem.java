package surevil.lottery.response.thing;

public class ThingItem {
    private int id;
    private String name;
    private String url;
    private double price;
    private long createTime;
    private String avatar;
    private String nickname;
    private String description;

    public ThingItem() {
    }


    public ThingItem(int id, String name, String url, double price, long createTime, String avatar, String nickname, String description) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.price = price;
        this.createTime = createTime;
        this.avatar = avatar;
        this.nickname = nickname;
        this.description = description;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(long createTime) {
        this.createTime = createTime;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
