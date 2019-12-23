package surevil.lottery.parameters.event;

import java.util.List;

public class EventAddParameters {
    private int id;
    private String name;
    private List<RewardItem> rewardItems;

    public EventAddParameters() {
    }

    public EventAddParameters(int id, String name, List<RewardItem> rewardItems) {
        this.id = id;
        this.name = name;
        this.rewardItems = rewardItems;
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

    public List<RewardItem> getRewardItems() {
        return rewardItems;
    }

    public void setRewardItems(List<RewardItem> rewardItems) {
        this.rewardItems = rewardItems;
    }
}
