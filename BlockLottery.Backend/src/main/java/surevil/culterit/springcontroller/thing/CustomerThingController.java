package surevil.culterit.springcontroller.thing;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import surevil.culterit.blservice.thing.ThingBlService;
import surevil.culterit.exception.ThingIdDoesNotExistException;
import surevil.culterit.response.Response;
import surevil.culterit.response.WrongResponse;
import surevil.culterit.response.thing.ThingDetailLoadResponse;
import surevil.culterit.response.thing.ThingLoadResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerThingController {
    private final ThingBlService thingBlService;

    @Autowired
    public CustomerThingController(ThingBlService thingBlService) {
        this.thingBlService = thingBlService;
    }

    @ApiOperation(value = "加载物品项", notes = "加载所有现有物品项信息")
    @RequestMapping(value = "thing", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThingLoadResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> loadThings() {
        return new ResponseEntity<>(thingBlService.loadThings(), HttpStatus.OK);
    }

    @ApiOperation(value = "加载某物品项", notes = "获得某物品项的详细信息")
    @RequestMapping(value = "thing/{thingId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThingDetailLoadResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> loadThingDetail(@PathVariable(name = "thingId") int thingId) {
        try {
            return new ResponseEntity<>(thingBlService.loadThingDetail(thingId), HttpStatus.OK);
        } catch (ThingIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }
}
