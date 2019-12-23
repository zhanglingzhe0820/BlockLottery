package surevil.lottery.entity.event;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class EventPeople {
    @Column(name = "code")
    private int code;
    @Column(name = "name")
    private String name;
    @Column(name = "phone")
    private String phone;
    @Column(name = "timeStamp")
    private long timeStamp;
    @Column(name = "status")
    private String status;

    public EventPeople() {
    }

    public EventPeople(int code, String name, String phone, long timeStamp, String status) {
        this.code = code;
        this.name = name;
        this.phone = phone;
        this.timeStamp = timeStamp;
        this.status = status;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
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

    public long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
