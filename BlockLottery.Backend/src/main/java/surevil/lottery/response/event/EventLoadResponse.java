package surevil.lottery.response.event;

import surevil.lottery.response.Response;

import java.util.List;

public class EventLoadResponse extends Response {
    private List<EventItem> eventItems;

    public EventLoadResponse() {
    }

    public EventLoadResponse(List<EventItem> eventItems) {
        this.eventItems = eventItems;
    }

    public List<EventItem> getEventItems() {
        return eventItems;
    }

    public void setEventItems(List<EventItem> eventItems) {
        this.eventItems = eventItems;
    }
}
