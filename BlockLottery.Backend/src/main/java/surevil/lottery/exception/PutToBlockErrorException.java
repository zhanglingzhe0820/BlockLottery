package surevil.lottery.exception;


import surevil.lottery.response.WrongResponse;

public class PutToBlockErrorException extends Exception {
    private WrongResponse response = new WrongResponse(10010, "Put to block error.");

    public WrongResponse getResponse() {
        return response;
    }
}
