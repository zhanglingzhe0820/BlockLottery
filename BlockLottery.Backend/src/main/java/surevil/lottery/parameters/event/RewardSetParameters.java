package surevil.lottery.parameters.event;

import java.util.List;

public class RewardSetParameters {
    private String level;
    private List<Integer> codes;

    public RewardSetParameters() {
    }

    public RewardSetParameters(String level, List<Integer> codes) {
        this.level = level;
        this.codes = codes;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public List<Integer> getCodes() {
        return codes;
    }

    public void setCodes(List<Integer> codes) {
        this.codes = codes;
    }
}
