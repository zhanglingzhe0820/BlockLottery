package surevil.culterit.response.user;

import surevil.culterit.response.Response;

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
