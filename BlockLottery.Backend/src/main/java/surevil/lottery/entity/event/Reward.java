package surevil.lottery.entity.event;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Reward {
    @Column(name = "level")
    private String level;
    @Column(name = "name")
    private String name;
    @Column(name = "num")
    private int num;
    @Column(name = "count")
    private int count;

    public Reward() {
    }

    public Reward(String level, String name, int num, int count) {
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
