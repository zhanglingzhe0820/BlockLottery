package surevil.lottery.bl.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import surevil.lottery.blservice.event.EventBlService;
import surevil.lottery.dao.account.UserDao;
import surevil.lottery.dao.event.EventDao;
import surevil.lottery.parameters.event.EventAddParameters;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.event.EventDetailResponse;
import surevil.lottery.response.event.EventLoadResponse;

@Service
public class EventBlServiceImpl implements EventBlService {
    private final UserDao userDao;
    private final EventDao eventDao;

    @Autowired
    public EventBlServiceImpl(UserDao userDao, EventDao eventDao) {
        this.userDao = userDao;
        this.eventDao = eventDao;
    }

    @Override
    public SuccessResponse addEvent(EventAddParameters eventAddParameters) {
        return null;
    }

    @Override
    public EventLoadResponse loadEvents(String username) {
        return null;
    }

    @Override
    public EventDetailResponse getEventDetail(int id) {
        return null;
    }
}
