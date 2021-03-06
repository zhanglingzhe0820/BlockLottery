package surevil.lottery.bl.thing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import surevil.lottery.blservice.thing.ThingBlService;
import surevil.lottery.dao.account.UserDao;
import surevil.lottery.dao.thing.ThingDao;
import surevil.lottery.entity.thing.Thing;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.parameters.thing.ThingAddParameters;
import surevil.lottery.parameters.thing.ThingUpdateParameters;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.thing.ThingAddResponse;
import surevil.lottery.response.thing.ThingDetailLoadResponse;
import surevil.lottery.response.thing.ThingItem;
import surevil.lottery.response.thing.ThingLoadResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ThingBlServiceImpl implements ThingBlService {
    private final ThingDao thingDao;
    private final UserDao userDao;

    @Autowired
    public ThingBlServiceImpl(ThingDao thingDao, UserDao userDao) {
        this.thingDao = thingDao;
        this.userDao = userDao;
    }

    /**
     * add thing
     *
     * @param thingAddParameters
     * @return
     */
    @Override
    public ThingAddResponse addThing(ThingAddParameters thingAddParameters, String supplierUsername) {
        Thing thing = thingDao.save(new Thing(thingAddParameters.getName(), thingAddParameters.getUrl(), thingAddParameters.getPrice(), thingAddParameters.getDescription(), System.currentTimeMillis(), userDao.findFirstByUsername(supplierUsername)));
        return new ThingAddResponse(thing.getId());
    }

    /**
     * load things by supplier id
     *
     * @param username
     * @return
     */
    @Override
    public ThingLoadResponse loadThingByUser(String username) {
        List<Thing> things = thingDao.findThingsByUserUsername(username);
        return getThingLoadResponse(things);
    }

    /**
     * delete thing by id
     *
     * @param thingId
     * @return
     */
    @Override
    public SuccessResponse deleteSupplierThingById(int thingId) {
        thingDao.deleteById(thingId);
        return new SuccessResponse("success");
    }

    /**
     * update thing whole
     *
     * @param thingUpdateParameters
     * @param username
     * @return
     */
    @Override
    public SuccessResponse updateUserThingById(ThingUpdateParameters thingUpdateParameters, String username) throws ThingIdDoesNotExistException {
        Thing thing = new Thing(thingUpdateParameters.getName(), thingUpdateParameters.getUrl(), thingUpdateParameters.getPrice(), thingUpdateParameters.getDescription(), System.currentTimeMillis(), userDao.findFirstByUsername(username));
        thing.setId(thingUpdateParameters.getId());
        Thing savedThing = thingDao.save(thing);
        if (savedThing != null) {
            return new SuccessResponse("success");
        } else {
            throw new ThingIdDoesNotExistException();
        }
    }

    /**
     * load a thing's detail
     *
     * @param thingId
     * @return
     */
    @Override
    public ThingDetailLoadResponse loadThingDetail(int thingId) throws ThingIdDoesNotExistException {
        Optional<Thing> optionalThing = thingDao.findById(thingId);
        if (optionalThing.isPresent()) {
            throw new ThingIdDoesNotExistException();
        }
        Thing thing = optionalThing.get();
        return new ThingDetailLoadResponse(thingId, thing.getName(), thing.getUrl(), thing.getDescription(), thing.getPrice(), thing.getCreateTime());
    }

    @Override
    public ThingLoadResponse loadThings() {
        List<Thing> things = thingDao.findAll();
        return getThingLoadResponse(things);
    }

    private ThingLoadResponse getThingLoadResponse(List<Thing> things) {
        List<ThingItem> thingItems = things.stream().collect(ArrayList::new, (list, thing) -> list.add(new ThingItem(thing.getId(), thing.getName(), thing.getUrl(), thing.getPrice(), thing.getCreateTime(), thing.getUser().getAvatarUrl(), thing.getUser().getNickname(), thing.getDescription())), ArrayList::
                addAll);
        return new ThingLoadResponse(thingItems);
    }
}
