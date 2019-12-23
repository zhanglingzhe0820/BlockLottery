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
    @Column(name = "eventId")
    private int eventId;

    public EventPeople() {
    }

    public EventPeople(int code, String name, String phone, int eventId) {
        this.code = code;
        this.name = name;
        this.phone = phone;
        this.eventId = eventId;
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

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
