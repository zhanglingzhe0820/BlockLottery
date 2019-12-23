package surevil.lottery.springcontroller.thing;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import surevil.lottery.blservice.thing.ThingBlService;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.parameters.thing.ThingUpdateParameters;
import surevil.lottery.parameters.thing.ThingAddParameters;
import surevil.lottery.response.Response;
import surevil.lottery.response.WrongResponse;
import surevil.lottery.response.thing.*;
import surevil.lottery.util.UserInfoUtil;

@RestController
public class SupplierThingController {
    private final ThingBlService thingBlService;

    @Autowired
    public SupplierThingController(ThingBlService thingBlService) {
        this.thingBlService = thingBlService;
    }

    @ApiOperation(value = "添加物品项", notes = "添加新的物品项信息")
    @RequestMapping(value = "thing/supplier", method = RequestMethod.PUT)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Success", response = ThingAddResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> addThing(@RequestBody ThingAddParameters thingAddParameters) {
        return new ResponseEntity<>(thingBlService.addThing(thingAddParameters, UserInfoUtil.getUsername()), HttpStatus.CREATED);
    }

    @ApiOperation(value = "加载当前餐厅物品项", notes = "加载当前餐厅的所有物品项信息")
    @RequestMapping(value = "thing/supplier", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThingLoadResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> loadSupplierThing() {
        return new ResponseEntity<>(thingBlService.loadThingByUser(UserInfoUtil.getUsername()), HttpStatus.OK);
    }

    @ApiOperation(value = "加载物品项详细信息", notes = "根据id加载物品项详细信息")
    @RequestMapping(value = "thing/supplier/{thingId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThingDetailLoadResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> loadSupplierThingById(@PathVariable(name = "thingId") int thingId) {
        try {
            return new ResponseEntity<>(thingBlService.loadThingDetail(thingId), HttpStatus.OK);
        } catch (ThingIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "删除物品项", notes = "根据id删除物品项")
    @RequestMapping(value = "thing/supplier/{thingId}", method = RequestMethod.DELETE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThingDeleteResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> deleteSupplierThingById(@PathVariable(name = "thingId") int thingId) {
        return new ResponseEntity<>(thingBlService.deleteSupplierThingById(thingId), HttpStatus.OK);
    }

    @ApiOperation(value = "更新物品项", notes = "根据id更新物品项")
    @RequestMapping(value = "thing/supplier/update", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThingUpdateResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> updateSupplierThingById(@RequestBody ThingUpdateParameters thingUpdateParameters) {
        try {
            return new ResponseEntity<>(thingBlService.updateUserThingById(thingUpdateParameters, UserInfoUtil.getUsername()), HttpStatus.OK);
        } catch (ThingIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

}
