package surevil.lottery.response.event;

public class PeopleItem {
    private String code;
    private String name;
    private String phone;
    private long time;
    private String status;

    public PeopleItem() {
    }

    public PeopleItem(String code, String name, String phone, long time, String status) {
        this.code = code;
        this.name = name;
        this.phone = phone;
        this.time = time;
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
