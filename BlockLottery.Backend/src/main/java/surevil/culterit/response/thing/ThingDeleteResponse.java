package surevil.culterit.response.thing;

import surevil.culterit.response.Response;

public class ThingDeleteResponse extends Response {
    private String info;

    public ThingDeleteResponse() {
    }

    public ThingDeleteResponse(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
