package surevil.lottery.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import springfox.documentation.spring.web.json.Json;
import surevil.lottery.config.jsonAdapter.SpringfoxJsonToGsonAdapter;

public class GsonFactory {
    public static Gson get() {
        return new GsonBuilder()
                .registerTypeAdapter(Json.class, new SpringfoxJsonToGsonAdapter())
                .create();
    }
}
