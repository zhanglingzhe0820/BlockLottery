package surevil.lottery.springcontroller.event;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import surevil.lottery.blservice.event.EventBlService;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.parameters.event.EventAddParameters;
import surevil.lottery.response.Response;
import surevil.lottery.response.SuccessResponse;
import surevil.lottery.response.WrongResponse;
import surevil.lottery.response.event.EventDetailResponse;
import surevil.lottery.response.event.EventLoadResponse;
import surevil.lottery.util.UserInfoUtil;

@RestController
public class EventController {
    private final EventBlService eventBlService;

    @Autowired
    public EventController(EventBlService eventBlService) {
        this.eventBlService = eventBlService;
    }

    @ApiOperation(value = "新增活动", notes = "新增一场活动")
    @RequestMapping(value = "event", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = SuccessResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> addEvent(@RequestBody EventAddParameters eventAddParameters) {
        return new ResponseEntity<>(eventBlService.addEvent(eventAddParameters), HttpStatus.OK);
    }

    @ApiOperation(value = "获得活动", notes = "获得活动列表")
    @RequestMapping(value = "event", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = EventLoadResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> loadEvents() {
        return new ResponseEntity<>(eventBlService.loadEvents(UserInfoUtil.getUsername()), HttpStatus.OK);
    }

    @ApiOperation(value = "获得活动", notes = "获得活动详情")
    @RequestMapping(value = "event/{id}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = EventDetailResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> getEventDetail(@PathVariable(name = "id") int id) {
        try {
            return new ResponseEntity<>(eventBlService.getEventDetail(id), HttpStatus.OK);
        } catch (ThingIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }
}
