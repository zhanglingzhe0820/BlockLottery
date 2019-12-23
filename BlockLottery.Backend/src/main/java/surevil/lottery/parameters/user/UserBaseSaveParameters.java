package surevil.lottery.parameters.user;

public class UserBaseSaveParameters {
    private String avatar;
    private String nickname;

    public UserBaseSaveParameters() {
    }

    public UserBaseSaveParameters(String avatar, String nickname) {
        this.avatar = avatar;
        this.nickname = nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
