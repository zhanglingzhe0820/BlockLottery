package surevil.lottery.response.event;

import surevil.lottery.response.Response;

public class EventJoinSuccessResponse extends Response {
    private int code;
    private String transactionId;
    private String txHash;

    public EventJoinSuccessResponse() {
    }

    public EventJoinSuccessResponse(int code, String transactionId, String txHash) {
        this.code = code;
        this.transactionId = transactionId;
        this.txHash = txHash;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getTxHash() {
        return txHash;
    }

    public void setTxHash(String txHash) {
        this.txHash = txHash;
    }
}
