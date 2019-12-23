package surevil.lottery.blservice.event;

import surevil.lottery.parameters.event.EventAddParameters;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.event.EventDetailResponse;
import surevil.lottery.response.event.EventLoadResponse;

public interface EventBlService {
    SuccessResponse addEvent(EventAddParameters eventAddParameters);

    EventLoadResponse loadEvents(String username);

    EventDetailResponse getEventDetail(int id);
}
