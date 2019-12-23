package surevil.lottery.response.user;

import surevil.lottery.response.Response;

public class AvatarSaveResponse extends Response {
    private String info;

    public AvatarSaveResponse() {
        this.info = "success";
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
