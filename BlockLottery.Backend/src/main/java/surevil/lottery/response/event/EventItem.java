package surevil.lottery.response.event;

public class EventItem {
    private int id;
    private String name;
    private int numOfRewards;
    private int numOfWinner;

    public EventItem() {
    }

    public EventItem(int id, String name, int numOfRewards, int numOfWinner) {
        this.id = id;
        this.name = name;
        this.numOfRewards = numOfRewards;
        this.numOfWinner = numOfWinner;
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

    public int getNumOfRewards() {
        return numOfRewards;
    }

    public void setNumOfRewards(int numOfRewards) {
        this.numOfRewards = numOfRewards;
    }

    public int getNumOfWinner() {
        return numOfWinner;
    }

    public void setNumOfWinner(int numOfWinner) {
        this.numOfWinner = numOfWinner;
    }
}
