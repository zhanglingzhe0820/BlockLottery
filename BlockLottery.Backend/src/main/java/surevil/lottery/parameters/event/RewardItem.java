package surevil.lottery.parameters.event;

public class RewardItem {
    private String level;
    private String name;
    private int num;
    private int count;

    public RewardItem() {
    }

    public RewardItem(String level, String name, int num, int count) {
        this.level = level;
        this.name = name;
        this.num = num;
        this.count = count;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
