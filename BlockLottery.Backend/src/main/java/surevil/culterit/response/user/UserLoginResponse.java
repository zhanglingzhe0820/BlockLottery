package surevil.culterit.response.user;

import surevil.culterit.response.Response;

public class UserLoginResponse extends Response {
    private String token;

    public UserLoginResponse() {
    }

    public UserLoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
