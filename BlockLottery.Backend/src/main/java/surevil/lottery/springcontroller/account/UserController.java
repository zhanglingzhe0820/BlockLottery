package surevil.lottery.springcontroller.account;

import io.swagger.annotations.*;
import surevil.lottery.blservice.account.UserBlService;
import surevil.lottery.exception.*;
import surevil.lottery.parameters.user.AvatarSaveParameters;
import surevil.lottery.parameters.user.PhoneNumberGetParameters;
import surevil.lottery.parameters.user.UserBaseSaveParameters;
import surevil.lottery.parameters.user.UserInfoSaveParameters;
import surevil.lottery.publicdatas.account.Role;
import surevil.lottery.response.Response;
import surevil.lottery.response.WrongResponse;
import surevil.lottery.response.user.UserLoginResponse;
import surevil.lottery.response.user.UserRoleResponse;
import surevil.lottery.util.UserInfoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserBlService userBlService;

    @Autowired
    public UserController(UserBlService userBlService) {
        this.userBlService = userBlService;
    }

    @ApiOperation(value = "用户登录", notes = "验证用户登录并返回token")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String"),
            @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String")
    })
    @RequestMapping(value = "account/login", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> login(
            @RequestParam("username") String username, @RequestParam("password") String password) {
        try {
            UserLoginResponse userLoginResponse = userBlService.login(username, password, Role.USER_NAME);
            return new ResponseEntity<>(userLoginResponse, HttpStatus.OK);
        } catch (WrongUsernameOrPasswordException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.UNAUTHORIZED);
        } catch (CannotRegisterException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "用户注册", notes = "验证用户注册并返回token")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String"),
            @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String")
    })
    @RequestMapping(value = "account/register", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> register(
            @RequestParam("username") String username, @RequestParam("password") String password) {
        UserLoginResponse userLoginResponse = userBlService.register(username, password, Role.USER_NAME);
        return new ResponseEntity<>(userLoginResponse, HttpStatus.OK);
    }

    @ApiOperation(value = "用户角色", notes = "获得用户角色")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String"),
            @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String")
    })
    @RequestMapping(value = "account/role", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = UserRoleResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> getRole(
            @RequestParam("username") String username) {
        UserRoleResponse userRoleResponse = userBlService.getRole(username);
        return new ResponseEntity<>(userRoleResponse, HttpStatus.OK);
    }

    @ApiOperation(value = "获得微信openid", notes = "获得微信openid")
    @RequestMapping(method = RequestMethod.GET, path = "/getOpenId", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Response> getOpenId(@RequestParam("jsCode") String jsCode) {
        try {
            return new ResponseEntity<>(userBlService.getOpenIdAndSessionKey(jsCode), HttpStatus.OK);
        } catch (CannotGetOpenIdAndSessionKeyException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "获得手机号码", notes = "获得手机号码")
    @RequestMapping(method = RequestMethod.POST, path = "/getPhoneNumber", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Response> getPhoneNumber(@RequestBody PhoneNumberGetParameters phoneNumberGetParameters) {
        try {
            return new ResponseEntity<>(userBlService.decryptData(phoneNumberGetParameters.getEncryptData(), phoneNumberGetParameters.getSessionKey(), phoneNumberGetParameters.getIvCode()), HttpStatus.OK);
        } catch (PhoneNumberGetWrongException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "保存用户头像", notes = "提交订单工程中保存用户头像")
    @RequestMapping(method = RequestMethod.POST, path = "/saveAvatar", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Response> saveAvatar(@RequestBody AvatarSaveParameters avatarSaveParameters) {
        try {
            return new ResponseEntity<>(userBlService.saveAvatar(UserInfoUtil.getUsername(), avatarSaveParameters.getAvatarUrl()), HttpStatus.OK);
        } catch (UsernameDoesNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "保存用户基本信息", notes = "保存用户基本信息")
    @RequestMapping(method = RequestMethod.POST, path = "/saveUserBase", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Response> saveUserBase(@RequestBody UserBaseSaveParameters userBaseSaveParameters) {
        try {
            return new ResponseEntity<>(userBlService.saveUserBase(userBaseSaveParameters, UserInfoUtil.getUsername()), HttpStatus.OK);
        } catch (UsernameDoesNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "保存用户个人信息", notes = "保存用户个人信息")
    @RequestMapping(method = RequestMethod.POST, path = "/saveUserInfo", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Response> saveUserInfo(@RequestBody UserInfoSaveParameters userInfoSaveParameters) {
        try {
            return new ResponseEntity<>(userBlService.saveUserInfo(userInfoSaveParameters, UserInfoUtil.getUsername()), HttpStatus.OK);
        } catch (UsernameDoesNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "获得用户个人信息", notes = "获得用户个人信息")
    @RequestMapping(method = RequestMethod.GET, path = "/getUserInfo", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Response> getUserInfo() {
        try {
            return new ResponseEntity<>(userBlService.getUserInfo(UserInfoUtil.getUsername()), HttpStatus.OK);
        } catch (UsernameDoesNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }
}
