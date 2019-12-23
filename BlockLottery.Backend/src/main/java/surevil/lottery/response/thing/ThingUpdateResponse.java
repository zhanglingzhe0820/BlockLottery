package surevil.lottery.response.thing;

import surevil.lottery.response.Response;

public class ThingUpdateResponse extends Response {
    private String info;

    public ThingUpdateResponse() {
    }

    public ThingUpdateResponse(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
