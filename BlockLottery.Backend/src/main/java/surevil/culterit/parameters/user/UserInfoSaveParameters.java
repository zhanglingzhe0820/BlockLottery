package surevil.culterit.parameters.user;

import java.util.List;

public class UserInfoSaveParameters {
    private String name;
    private String career;
    private List<String> freeTimes;
    private List<String> interestFields;
    private String imageUrl;
    private double salary;

    public UserInfoSaveParameters() {
    }

    public UserInfoSaveParameters(String name, String career, List<String> freeTimes, List<String> interestFields, String imageUrl, double salary) {
        this.name = name;
        this.career = career;
        this.freeTimes = freeTimes;
        this.interestFields = interestFields;
        this.imageUrl = imageUrl;
        this.salary = salary;
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
