package surevil.culterit.response.thing;

import surevil.culterit.response.Response;

public class ThingAddResponse extends Response {
    private int thingId;

    public ThingAddResponse() {
    }

    public ThingAddResponse(int thingId) {
        this.thingId = thingId;
    }

    public int getThingId() {
        return thingId;
    }

    public void setThingId(int thingId) {
        this.thingId = thingId;
    }
}
