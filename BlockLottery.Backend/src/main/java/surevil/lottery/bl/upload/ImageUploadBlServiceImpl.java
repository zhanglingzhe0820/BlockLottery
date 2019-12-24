package surevil.lottery.bl.upload;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import surevil.lottery.blservice.upload.ImageUploadBlService;
import surevil.lottery.dao.thing.ThingDao;
import surevil.lottery.entity.thing.Thing;
import surevil.lottery.exception.SystemException;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.response.upload.UploadImageResponse;
import surevil.lottery.util.FormatDateTime;
import surevil.lottery.util.PathUtil;

import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.Optional;


@Service
public class ImageUploadBlServiceImpl implements ImageUploadBlService {
    private final static String TEMP_PATH = PathUtil.getTmpPath();
    private static final long EXPIRATION = Long.MAX_VALUE;

    @Value("${oos.accessKey}")
    private String accessKey;
    @Value("${oos.secretKey}")
    private String secretKey;
    @Value("${oos.endPoint}")
    private String endPoint;
    @Value("${oos.bucketName}")
    private String bucketName;

    private final ThingDao thingDao;

    @Autowired
    public ImageUploadBlServiceImpl(ThingDao thingDao) {
        this.thingDao = thingDao;
    }

    /**
     * Upload the image of the mission
     *
     * @param thingId
     * @param multipartFile
     * @return the url of the image
     */
    @Override
    public UploadImageResponse uploadFiles(int thingId, MultipartFile multipartFile) throws SystemException, ThingIdDoesNotExistException {
        try {
            Optional<Thing> optionalThing = thingDao.findById(thingId);
            if (optionalThing.isPresent()) {
                Thing thing = optionalThing.get();
                String url = uploadImage(generateImageKey(thingId), multipartFile.getBytes());
                thing.setUrl(url);
                thingDao.save(thing);
                return new UploadImageResponse(url);
            } else {
                throw new ThingIdDoesNotExistException();
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    @Override
    public UploadImageResponse uploadFiles(String path) throws SystemException {
        String url = uploadImage(generateImageKey(), path);
        return new UploadImageResponse(url);
    }

    private String uploadImage(String key, String path) throws SystemException {
        try {
            //上传图片
            AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
            AmazonS3 oos = new AmazonS3Client(credentials);
            oos.setEndpoint(endPoint);
            oos.putObject(bucketName, key, new File(path));

            //生成共享地址
            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                    new GeneratePresignedUrlRequest(bucketName, key);
            generatePresignedUrlRequest.setExpiration(new Date(EXPIRATION));
            URL url = oos.generatePresignedUrl(generatePresignedUrlRequest);
            return url.toURI().toString();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private String generateImageKey(int thingId) {
        return "thing_" + thingId;
    }

    /**
     * Upload the image of the mission
     *
     * @param multipartFile
     * @return the url of the image
     */
    @Override
    public UploadImageResponse uploadFiles(MultipartFile multipartFile) throws SystemException {
        try {
            String url = uploadImage(generateImageKey(), multipartFile.getBytes());
            return new UploadImageResponse(url);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private String generateImageKey() {
        return FormatDateTime.currentDateString();
    }


    /**
     * upload the image to the oos cloud
     *
     * @param key   the id of the image
     * @param bytes the image content
     * @return the url of the uploaded image
     */
    private String uploadImage(String key, byte[] bytes) throws SystemException {
        try {
            //保存到临时文件
            File file = new File(TEMP_PATH);
            FileImageOutputStream fileWriter = new FileImageOutputStream(file);
            fileWriter.write(bytes);
            fileWriter.close();

            //上传图片
            AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
            AmazonS3 oos = new AmazonS3Client(credentials);
            oos.setEndpoint(endPoint);
            oos.putObject(bucketName, key, file);

            //生成共享地址
            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                    new GeneratePresignedUrlRequest(bucketName, key);
            generatePresignedUrlRequest.setExpiration(new Date(EXPIRATION));
            URL url = oos.generatePresignedUrl(generatePresignedUrlRequest);
            return url.toURI().toString();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

}
