package surevil.lottery.response.thing;

import surevil.lottery.response.Response;

import java.util.List;

public class ThingLoadResponse extends Response {
    private List<ThingItem> thingItemList;

    public ThingLoadResponse() {
    }

    public ThingLoadResponse(List<ThingItem> thingItemList) {
        this.thingItemList = thingItemList;
    }

    public List<ThingItem> getThingItemList() {
        return thingItemList;
    }

    public void setThingItemList(List<ThingItem> thingItemList) {
        this.thingItemList = thingItemList;
    }
}
