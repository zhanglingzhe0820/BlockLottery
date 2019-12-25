package surevil.lottery.util;

public class Transaction {
    private String transactionId;
    private String txHash;

    public Transaction() {
    }

    public Transaction(String transactionId, String txHash) {
        this.transactionId = transactionId;
        this.txHash = txHash;
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
