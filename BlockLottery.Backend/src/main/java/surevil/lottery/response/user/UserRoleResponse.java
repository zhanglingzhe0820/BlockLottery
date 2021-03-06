package surevil.lottery.response.user;

import surevil.lottery.publicdatas.account.Role;
import surevil.lottery.response.Response;

public class UserRoleResponse extends Response {
    private String token;
    private Role role;

    public UserRoleResponse() {
    }

    public UserRoleResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
