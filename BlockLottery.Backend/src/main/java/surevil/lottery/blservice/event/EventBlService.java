package surevil.lottery.blservice.event;

import surevil.lottery.exception.PutToBlockErrorException;
import surevil.lottery.exception.SystemException;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.parameters.event.EventAddParameters;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.event.EventDetailResponse;
import surevil.lottery.response.event.EventJoinSuccessResponse;
import surevil.lottery.response.event.EventLoadResponse;

public interface EventBlService {
    SuccessResponse addEvent(EventAddParameters eventAddParameters) throws SystemException;

    EventLoadResponse loadEvents(String username);

    EventDetailResponse getEventDetail(int id) throws ThingIdDoesNotExistException;

    EventJoinSuccessResponse joinEvent(int id, String phone, String name) throws ThingIdDoesNotExistException, PutToBlockErrorException;
}
