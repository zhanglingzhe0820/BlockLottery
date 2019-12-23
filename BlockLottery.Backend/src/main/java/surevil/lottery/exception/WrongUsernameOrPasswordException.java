package surevil.lottery.exception;

import surevil.lottery.response.WrongResponse;

public class WrongUsernameOrPasswordException extends Exception {
    private WrongResponse response = new WrongResponse(10003, "Wrong username or password.");

    public WrongResponse getResponse() {
        return response;
    }
}
