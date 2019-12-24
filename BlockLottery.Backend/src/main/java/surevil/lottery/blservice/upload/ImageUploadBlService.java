package surevil.lottery.blservice.upload;

import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.exception.SystemException;
import surevil.lottery.response.upload.UploadImageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadBlService {
    /**
     * Upload the image of the thing
     *
     * @param multipartFile
     * @return the url of the image
     */
    UploadImageResponse uploadFiles(MultipartFile multipartFile) throws SystemException, ThingIdDoesNotExistException;

    /**
     * Upload the image of the thing
     *
     * @param thingId
     * @param multipartFile
     * @return the url of the image
     */
    UploadImageResponse uploadFiles(int thingId, MultipartFile multipartFile) throws SystemException, ThingIdDoesNotExistException;

    UploadImageResponse uploadFiles(String path) throws SystemException;
}
