package surevil.culterit.blservice.account;

import org.springframework.stereotype.Service;
import surevil.culterit.exception.*;
import surevil.culterit.parameters.user.UserBaseSaveParameters;
import surevil.culterit.parameters.user.UserInfoSaveParameters;
import surevil.culterit.response.SuccessResponse;
import surevil.culterit.response.user.*;

@Service
public interface UserBlService {
    /**
     * login
     *
     * @param username the username of the user
     * @param password the password of the user
     * @param role
     * @return the login info to  response
     * @throws WrongUsernameOrPasswordException the username or password is error
     */
    UserLoginResponse login(String username, String password, String role) throws WrongUsernameOrPasswordException, CannotRegisterException;

    /**
     * get user openid
     *
     * @param jsCode wechat js code
     * @return whether the operation is success or not
     */
    OpenIdAndSessionKeyResponse getOpenIdAndSessionKey(String jsCode) throws CannotGetOpenIdAndSessionKeyException;

    /**
     * register
     *
     * @param username
     * @param password
     * @return
     */
    UserLoginResponse register(String username, String password);

    /**
     * decrypt data
     *
     * @param encryptData
     * @param sessionKey
     * @param ivCode
     * @return
     */
    PhoneNumberGetResponse decryptData(String encryptData, String sessionKey, String ivCode) throws PhoneNumberGetWrongException;

    /**
     * save avatar to a user
     *
     * @param avatarUrl
     */
    AvatarSaveResponse saveAvatar(String username, String avatarUrl) throws UsernameDoesNotFoundException;

    UserInfoSaveResponse saveUserInfo(UserInfoSaveParameters userInfoSaveParameters, String username) throws UsernameDoesNotFoundException;

    SuccessResponse saveUserBase(UserBaseSaveParameters userBaseSaveParameters, String username) throws UsernameDoesNotFoundException;

    UserInfoGetResponse getUserInfo(String username) throws UsernameDoesNotFoundException;

    UserRoleResponse getRole(String username);
}
