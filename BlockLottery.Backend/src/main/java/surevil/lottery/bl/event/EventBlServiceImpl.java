package surevil.lottery.bl.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import surevil.lottery.blservice.event.EventBlService;
import surevil.lottery.dao.account.UserDao;
import surevil.lottery.dao.event.EventDao;
import surevil.lottery.entity.event.Event;
import surevil.lottery.entity.event.EventPeople;
import surevil.lottery.entity.event.Reward;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.parameters.event.EventAddParameters;
import surevil.lottery.parameters.event.RewardItem;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.event.EventDetailResponse;
import surevil.lottery.response.event.EventItem;
import surevil.lottery.response.event.EventLoadResponse;
import surevil.lottery.response.event.PeopleItem;
import surevil.lottery.util.UserInfoUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<Reward> rewards = new ArrayList<>();
        List<RewardItem> rewardItems = eventAddParameters.getRewardItems();
        for (RewardItem rewardItem : rewardItems) {
            rewards.add(new Reward(rewardItem.getLevel(), rewardItem.getName(), rewardItem.getNum(), rewardItem.getCount()));
        }
        Event event = new Event(eventAddParameters.getName(), "", UserInfoUtil.getUsername(), rewards, new ArrayList<>());
        eventDao.save(event);
        return new SuccessResponse("add success");
    }

    @Override
    public EventLoadResponse loadEvents(String username) {
        List<Event> events = eventDao.findAllByUsername(username);
        List<EventItem> eventItems = new ArrayList<>();
        for (Event event : events) {
            int winners = 0;
            for (EventPeople eventPeople : event.getPeopleItems()) {
                if (!eventPeople.getStatus().equals("待开奖") && !eventPeople.getStatus().equals("未中奖")) {
                    winners++;
                }
            }
            eventItems.add(new EventItem(event.getId(), event.getName(), event.getRewardItemList().size(), winners));
        }
        return new EventLoadResponse(eventItems);
    }

    @Override
    public EventDetailResponse getEventDetail(int id) throws ThingIdDoesNotExistException {
        Optional<Event> optionalEvent = eventDao.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            List<RewardItem> rewardItems = new ArrayList<>();
            for (Reward reward : event.getRewardItemList()) {
                RewardItem rewardItem = new RewardItem(reward.getLevel(), reward.getName(), reward.getNum(), reward.getCount());
                rewardItems.add(rewardItem);
            }
            List<PeopleItem> peopleItems = new ArrayList<>();
            for (EventPeople eventPeople : event.getPeopleItems()) {
                PeopleItem peopleItem = new PeopleItem(eventPeople.getCode(), eventPeople.getName(), eventPeople.getPhone(), eventPeople.getTimeStamp(), eventPeople.getStatus());
                peopleItems.add(peopleItem);
            }
            return new EventDetailResponse(event.getId(), event.getName(), rewardItems, event.getQrcodeUrl(), peopleItems);
        } else {
            throw new ThingIdDoesNotExistException();
        }
    }
}
