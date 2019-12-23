package surevil.lottery.response.upload;

import surevil.lottery.response.Response;

public class UploadImageResponse extends Response {
    private String url;

    public UploadImageResponse() {
    }

    public UploadImageResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
