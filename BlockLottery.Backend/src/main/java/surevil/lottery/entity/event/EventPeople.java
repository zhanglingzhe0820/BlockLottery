package surevil.lottery.entity.event;

import javax.persistence.*;

@Entity
@Table(name = "event_people")
public class EventPeople {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "event_id")
    private int eventId;
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

    public EventPeople(int eventId, String name, String phone, long timeStamp, String status) {
        this.eventId = eventId;
        this.name = name;
        this.phone = phone;
        this.timeStamp = timeStamp;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
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
