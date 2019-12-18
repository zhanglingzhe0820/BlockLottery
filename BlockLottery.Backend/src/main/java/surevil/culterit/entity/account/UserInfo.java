package surevil.culterit.entity.account;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_info")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "name")
    private String name;
    @Column(name = "career")
    private String career;
    @Column(name = "time")
    @ElementCollection(targetClass = String.class)
    private List<String> freeTimes;
    @Column(name = "interest_fields")
    @ElementCollection(targetClass = String.class)
    private List<String> interestFields;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "salary")
    private double salary;

    public UserInfo() {
    }

    public UserInfo(int userId, String name, String career, List<String> freeTimes, List<String> interestFields, String imageUrl, double salary) {
        this.userId = userId;
        this.name = name;
        this.career = career;
        this.freeTimes = freeTimes;
        this.interestFields = interestFields;
        this.imageUrl = imageUrl;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public List<String> getFreeTimes() {
        return freeTimes;
    }

    public void setFreeTimes(List<String> freeTimes) {
        this.freeTimes = freeTimes;
    }

    public List<String> getInterestFields() {
        return interestFields;
    }

    public void setInterestFields(List<String> interestFields) {
        this.interestFields = interestFields;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
