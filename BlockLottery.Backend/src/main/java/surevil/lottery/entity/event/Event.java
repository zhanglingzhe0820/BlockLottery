package surevil.lottery.entity.event;

import surevil.lottery.parameters.event.RewardItem;
import surevil.lottery.response.event.PeopleItem;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "qrcodeUrl")
    private String qrcodeUrl;
    @Column(name = "username")
    private String username;
    @Column(name = "rewardItemList")
    @ElementCollection(targetClass = RewardItem.class)
    private List<RewardItem> rewardItemList;
    @Column(name = "peopleItems")
    @ElementCollection(targetClass = PeopleItem.class)
    private List<PeopleItem> peopleItems;

    public Event() {
    }

    public Event(String name, String qrcodeUrl, String username, List<RewardItem> rewardItemList, List<PeopleItem> peopleItems) {
        this.name = name;
        this.qrcodeUrl = qrcodeUrl;
        this.username = username;
        this.rewardItemList = rewardItemList;
        this.peopleItems = peopleItems;
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

    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    public void setQrcodeUrl(String qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<RewardItem> getRewardItemList() {
        return rewardItemList;
    }

    public void setRewardItemList(List<RewardItem> rewardItemList) {
        this.rewardItemList = rewardItemList;
    }

    public List<PeopleItem> getPeopleItems() {
        return peopleItems;
    }

    public void setPeopleItems(List<PeopleItem> peopleItems) {
        this.peopleItems = peopleItems;
    }
}
