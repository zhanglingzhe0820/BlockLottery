package surevil.culterit.bl.account;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import surevil.culterit.blservice.account.UserBlService;
import surevil.culterit.dao.account.UserInfoDao;
import surevil.culterit.dao.account.UserDao;
import surevil.culterit.entity.account.User;
import surevil.culterit.entity.account.UserInfo;
import surevil.culterit.exception.*;
import surevil.culterit.parameters.user.UserBaseSaveParameters;
import surevil.culterit.parameters.user.UserInfoSaveParameters;
import surevil.culterit.publicdatas.account.Role;
import surevil.culterit.response.SuccessResponse;
import surevil.culterit.response.user.*;
import surevil.culterit.security.jwt.JwtService;
import surevil.culterit.security.jwt.JwtUser;
import surevil.culterit.security.jwt.JwtUserDetailsService;
import surevil.culterit.util.AESDecodeUtils;

import java.util.ArrayList;

@Service
public class UserBlServiceImpl implements UserBlService {

    private final static long EXPIRATION = 604800;
    private final static String USER_DEFAULT_PASSWORD = "user";

    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtService jwtService;
    private final UserInfoDao userInfoDao;
    private final UserDao userDao;

    @Value(value = "${wechat.url}")
    private String wechatUrl;

    @Value(value = "${wechat.id}")
    private String appId;

    @Value(value = "${wechat.secret}")
    private String appSecret;

    @Autowired
    public UserBlServiceImpl(JwtUserDetailsService jwtUserDetailsService, JwtService jwtService, UserInfoDao userInfoDao, UserDao userDao) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtService = jwtService;
        this.userInfoDao = userInfoDao;
        this.userDao = userDao;
    }

    /**
     * login
     *
     * @param username the username of the user
     * @param password the password of the user
     * @param role
     * @return the login info to response
     * @throws WrongUsernameOrPasswordException the username or password is error
     */
    @Override
    public UserLoginResponse login(String username, String password, String role) throws WrongUsernameOrPasswordException, CannotRegisterException {
        if (username.length() == 0) {
            throw new CannotRegisterException();
        }
        if (password.equals(USER_DEFAULT_PASSWORD)) {
            if (userDao.findUserByUsername(username) == null) {
                userDao.save(new User("", username, password, Role.getRole(role), "", new ArrayList<>()));
            }
            JwtUser jwtUser = (JwtUser) jwtUserDetailsService.loadUserByUsername(username);
            String token = jwtService.generateToken(jwtUser, EXPIRATION);
            return new UserLoginResponse(token);
        } else {
            if (confirmPassword(username, password)) {
                JwtUser jwtUser = (JwtUser) jwtUserDetailsService.loadUserByUsername(username);
                String token = jwtService.generateToken(jwtUser, EXPIRATION);
                return new UserLoginResponse(token);
            } else {
                throw new WrongUsernameOrPasswordException();
            }
        }
    }

    private boolean confirmPassword(String username, String password) {
        User user = userDao.findUserByUsername(username);
        if (user != null) {
            return BCrypt.checkpw(password, user.getPassword());
        } else {
            return false;
        }
    }

    /**
     * get user openid
     *
     * @param jsCode wechat js code
     * @return whether the operation is success or not
     */
    @Override
    public OpenIdAndSessionKeyResponse getOpenIdAndSessionKey(String jsCode) throws CannotGetOpenIdAndSessionKeyException {
        RestTemplate client = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        ResponseEntity<String> response = client.exchange(wechatUrl + appId + "&secret=" + appSecret + "&js_code=" + jsCode + "&grant_type=authorization_code", HttpMethod.GET, entity, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return new OpenIdAndSessionKeyResponse((String) JSONObject.fromObject(response.getBody()).get("openid"), (String) JSONObject.fromObject(response.getBody()).get("session_key"));
        } else {
            throw new CannotGetOpenIdAndSessionKeyException();
        }
    }

    /**
     * register
     *
     * @param username
     * @param password
     * @return
     */
    @Override
    public UserLoginResponse register(String username, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userDao.save(new User("", username, encoder.encode(password), Role.RESTAURANT, "", new ArrayList<>()));
        JwtUser jwtUser = (JwtUser) jwtUserDetailsService.loadUserByUsername(username);
        String token = jwtService.generateToken(jwtUser, EXPIRATION);
        return new UserLoginResponse(token);
    }

    /**
     * decrypt data
     *
     * @param encryptData
     * @param sessionKey
     * @param ivCode
     * @return
     */
    @Override
    public PhoneNumberGetResponse decryptData(String encryptData, String sessionKey, String ivCode) throws PhoneNumberGetWrongException {
        try {
            return new PhoneNumberGetResponse(AESDecodeUtils.decrypt(sessionKey, ivCode, encryptData));
        } catch (Exception e) {
            e.printStackTrace();
            throw new PhoneNumberGetWrongException();
        }
    }

    /**
     * save avatar to a user
     *
     * @param username
     * @param avatarUrl
     */
    @Override
    public AvatarSaveResponse saveAvatar(String username, String avatarUrl) throws UsernameDoesNotFoundException {
        User user = userDao.findUserByUsername(username);
        if (user == null) {
            throw new UsernameDoesNotFoundException();
        } else {
            user.setAvatarUrl(avatarUrl);
            userDao.save(user);
            return new AvatarSaveResponse();
        }
    }

    @Override
    public UserInfoSaveResponse saveUserInfo(UserInfoSaveParameters userInfoSaveParameters, String username) throws UsernameDoesNotFoundException {
        User user = userDao.findUserByUsername(username);
        if (user == null) {
            throw new UsernameDoesNotFoundException();
        } else {
            UserInfo userInfo = userInfoDao.findUserInfoByUserId(user.getId());
            if (userInfo == null) {
                userInfo = new UserInfo();
                userInfo.setUserId(user.getId());
            }
            userInfo.setCareer(userInfoSaveParameters.getCareer());
            userInfo.setFreeTimes(userInfoSaveParameters.getFreeTimes());
            userInfo.setImageUrl(userInfoSaveParameters.getImageUrl());
            userInfo.setInterestFields(userInfoSaveParameters.getInterestFields());
            userInfo.setName(userInfoSaveParameters.getName());
            userInfo.setSalary(userInfoSaveParameters.getSalary());
            userInfoDao.save(userInfo);
            return new UserInfoSaveResponse();
        }
    }

    @Override
    public SuccessResponse saveUserBase(UserBaseSaveParameters userBaseSaveParameters, String username) throws UsernameDoesNotFoundException {
        User user = userDao.findUserByUsername(username);
        if (user == null) {
            throw new UsernameDoesNotFoundException();
        }
        user.setAvatarUrl(userBaseSaveParameters.getAvatar());
        user.setNickname(userBaseSaveParameters.getNickname());
        userDao.save(user);
        return new SuccessResponse("success");
    }

    @Override
    public UserInfoGetResponse getUserInfo(String username) throws UsernameDoesNotFoundException {
        User user = userDao.findUserByUsername(username);
        if (user == null) {
            throw new UsernameDoesNotFoundException();
        } else {
            UserInfo userInfo = userInfoDao.findUserInfoByUserId(user.getId());
            return new UserInfoGetResponse(user.getId(), userInfo.getName(), userInfo.getCareer(), userInfo.getFreeTimes(), userInfo.getInterestFields(), user.getAvatarUrl(), userInfo.getImageUrl(), userInfo.getSalary());
        }
    }

    @Override
    public UserRoleResponse getRole(String username) {
        User user = userDao.findUserByUsername(username);
        JwtUser jwtUser = (JwtUser) jwtUserDetailsService.loadUserByUsername(username);
        String token = jwtService.generateToken(jwtUser, EXPIRATION);
        return new UserRoleResponse(token, user.getRole());
    }
}
