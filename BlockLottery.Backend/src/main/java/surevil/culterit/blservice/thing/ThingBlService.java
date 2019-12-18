package surevil.culterit.blservice.thing;

import surevil.culterit.exception.ThingIdDoesNotExistException;
import surevil.culterit.parameters.thing.ThingAddParameters;
import surevil.culterit.parameters.thing.ThingUpdateParameters;
import surevil.culterit.response.SuccessResponse;
import surevil.culterit.response.thing.*;

public interface ThingBlService {

    /**
     * add thing
     *
     * @return
     */
    ThingAddResponse addThing(ThingAddParameters thingAddParameters, String supplierUsername);

    /**
     * load things by user
     *
     * @param username
     * @return
     */
    ThingLoadResponse loadThingByUser(String username);

    /**
     * delete thing by id
     *
     * @param thingId
     * @return
     */
    SuccessResponse deleteSupplierThingById(int thingId);

    /**
     * update thing whole
     *
     * @param thingUpdateParameters
     * @param username
     * @return
     */
    SuccessResponse updateUserThingById(ThingUpdateParameters thingUpdateParameters, String username) throws ThingIdDoesNotExistException;

    /**
     * load a thing's detail
     *
     * @param thingId
     * @return
     */
    ThingDetailLoadResponse loadThingDetail(int thingId) throws ThingIdDoesNotExistException;

    ThingLoadResponse loadThings();
}
