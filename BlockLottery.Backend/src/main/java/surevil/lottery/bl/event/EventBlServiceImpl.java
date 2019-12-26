package surevil.lottery.bl.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import surevil.lottery.blservice.event.EventBlService;
import surevil.lottery.blservice.upload.ImageUploadBlService;
import surevil.lottery.dao.event.EventDao;
import surevil.lottery.dao.event.EventPeopleDao;
import surevil.lottery.entity.event.Event;
import surevil.lottery.entity.event.EventPeople;
import surevil.lottery.entity.event.Reward;
import surevil.lottery.exception.PutToBlockErrorException;
import surevil.lottery.exception.SystemException;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.parameters.event.EventAddParameters;
import surevil.lottery.parameters.event.RewardItem;
import surevil.lottery.parameters.event.RewardSetParameters;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.event.*;
import surevil.lottery.response.upload.UploadImageResponse;
import surevil.lottery.util.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventBlServiceImpl implements EventBlService {
    private final static String JOIN_BASE_URL = "file:///Users/zhanglingzhe/Documents/private/BlockLottery/BlockLottery.UserFrontend/index.html?eventId=";
    private final static String LOTTERY_BASE_URL = "http://localhost:3000/?eventId=";
    private final EventDao eventDao;
    private final ImageUploadBlService imageUploadBlService;
    private final EventPeopleDao eventPeopleDao;

    @Autowired
    public EventBlServiceImpl(EventDao eventDao, ImageUploadBlService imageUploadBlService, EventPeopleDao eventPeopleDao) {
        this.eventDao = eventDao;
        this.imageUploadBlService = imageUploadBlService;
        this.eventPeopleDao = eventPeopleDao;
    }

    @Override
    public SuccessResponse addEvent(EventAddParameters eventAddParameters) throws SystemException {
        List<Reward> rewards = new ArrayList<>();
        List<RewardItem> rewardItems = eventAddParameters.getRewardItems();
        for (RewardItem rewardItem : rewardItems) {
            rewards.add(new Reward(rewardItem.getLevel(), rewardItem.getName(), rewardItem.getNum(), rewardItem.getCount()));
        }
        Event event = new Event(eventAddParameters.getName(), "", UserInfoUtil.getUsername(), rewards);
        event = eventDao.save(event);
        String qrcodeSourceUrl = JOIN_BASE_URL + event.getId();
        String filename = FormatDateTime.currentDateString();
        QrCodeUtil.createQrCode(qrcodeSourceUrl, PathUtil.getTmpPath(), filename);
        UploadImageResponse response = this.imageUploadBlService.uploadFiles(PathUtil.getTmpPath() + "/" + filename);
        event.setQrcodeUrl(response.getUrl());
        eventDao.save(event);
        return new SuccessResponse("add success");
    }

    @Override
    public EventLoadResponse loadEvents(String username) {
        List<Event> events = eventDao.findAllByUsername(username);
        List<EventItem> eventItems = new ArrayList<>();
        for (Event event : events) {
            int winners = 0;
            List<EventPeople> eventPeopleList = eventPeopleDao.findAllByEventId(event.getId());
            for (EventPeople eventPeople : eventPeopleList) {
                if (!eventPeople.getStatus().equals("待开奖") && !eventPeople.getStatus().equals("未中奖")) {
                    winners++;
                }
            }
            int rewardNum = 0;
            for (Reward reward : event.getRewardItemList()) {
                rewardNum += reward.getNum();
            }
            eventItems.add(new EventItem(event.getId(), event.getName(), rewardNum, winners));
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
            List<EventPeople> eventPeopleList = eventPeopleDao.findAllByEventId(event.getId());
            for (EventPeople eventPeople : eventPeopleList) {
                PeopleItem peopleItem = new PeopleItem(eventPeople.getId(), eventPeople.getName(), eventPeople.getPhone(), eventPeople.getTimeStamp(), eventPeople.getStatus());
                peopleItems.add(peopleItem);
            }
            return new EventDetailResponse(event.getId(), event.getName(), rewardItems, event.getQrcodeUrl(), LOTTERY_BASE_URL + event.getId(), peopleItems);
        } else {
            throw new ThingIdDoesNotExistException();
        }
    }

    @Override
    public EventJoinSuccessResponse joinEvent(int id, String phone, String name) throws PutToBlockErrorException {
        EventPeople eventPeople = new EventPeople(id, name, phone, System.currentTimeMillis(), "待开奖");
        eventPeople = eventPeopleDao.save(eventPeople);
        Transaction transaction = AntBlockSaveUtil.saveAndGetTransaction("join", getEventPeopleStr(eventPeople));
        return new EventJoinSuccessResponse(eventPeople.getId(), transaction.getTransactionId(), transaction.getTxHash());
    }

    @Override
    public SuccessResponse setLottery(int id, RewardSetParameters rewardSetParameters) {
        List<Integer> peopleCodes = rewardSetParameters.getCodes();
        for (Integer peopleCode : peopleCodes) {
            Optional<EventPeople> optionalEventPeople = eventPeopleDao.findById(peopleCode);
            if (optionalEventPeople.isPresent()) {
                EventPeople eventPeople = optionalEventPeople.get();
                eventPeople.setStatus(rewardSetParameters.getLevel());
                eventPeopleDao.save(eventPeople);
            }
        }
        return new SuccessResponse("lottery success");
    }

    private String getEventPeopleStr(EventPeople eventPeople) {
        return eventPeople.getEventId() + "-" + eventPeople.getId() + "-" + eventPeople.getName() + eventPeople.getPhone();
    }
}
