package surevil.lottery.util;

import java.io.File;

public class PathUtil {
    public final static String TEMP_FILE_NAME = "BlockLottery";

    public static String getTmpPath() {
        java.util.Properties properties = System.getProperties();
        String tempFileName = properties.getProperty("java.io.tmpdir");
        File dir = new File(tempFileName + TEMP_FILE_NAME);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return tempFileName + TEMP_FILE_NAME;
    }

    public static String getStaticPath() {
        return new File("static/").getAbsolutePath() + "/";
    }

}
