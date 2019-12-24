package surevil.lottery.response.event;

import surevil.lottery.parameters.event.RewardItem;
import surevil.lottery.response.Response;

import java.util.List;

public class EventDetailResponse extends Response {
    private int id;
    private String name;
    private List<RewardItem> rewardItemList;
    private String qrcodeUrl;
    private String lotteryUrl;
    private List<PeopleItem> peopleItems;

    public EventDetailResponse() {
    }

    public EventDetailResponse(int id, String name, List<RewardItem> rewardItemList, String qrcodeUrl, String lotteryUrl, List<PeopleItem> peopleItems) {
        this.id = id;
        this.name = name;
        this.rewardItemList = rewardItemList;
        this.qrcodeUrl = qrcodeUrl;
        this.lotteryUrl = lotteryUrl;
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

    public List<RewardItem> getRewardItemList() {
        return rewardItemList;
    }

    public void setRewardItemList(List<RewardItem> rewardItemList) {
        this.rewardItemList = rewardItemList;
    }

    public String getLotteryUrl() {
        return lotteryUrl;
    }

    public void setLotteryUrl(String lotteryUrl) {
        this.lotteryUrl = lotteryUrl;
    }

    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    public void setQrcodeUrl(String qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl;
    }

    public List<PeopleItem> getPeopleItems() {
        return peopleItems;
    }

    public void setPeopleItems(List<PeopleItem> peopleItems) {
        this.peopleItems = peopleItems;
    }
}
