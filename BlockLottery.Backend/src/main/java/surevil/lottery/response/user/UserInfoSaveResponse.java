package surevil.lottery.response.user;

import surevil.lottery.response.Response;

public class UserInfoSaveResponse extends Response {
    private String info;

    public UserInfoSaveResponse() {
        this.info = "success";
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
