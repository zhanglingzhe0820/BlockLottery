package surevil.culterit.response.user;

import surevil.culterit.response.Response;

import java.util.List;

public class UserInfoGetResponse extends Response {
    private int id;
    private String name;
    private String career;
    private List<String> freeTimes;
    private List<String> interestFields;
    private String avatarUrl;
    private String imageUrl;
    private double salary;

    public UserInfoGetResponse() {
    }

    public UserInfoGetResponse(int id, String name, String career, List<String> freeTimes, List<String> interestFields, String avatarUrl, String imageUrl, double salary) {
        this.id = id;
        this.name = name;
        this.career = career;
        this.freeTimes = freeTimes;
        this.interestFields = interestFields;
        this.avatarUrl = avatarUrl;
        this.imageUrl = imageUrl;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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
