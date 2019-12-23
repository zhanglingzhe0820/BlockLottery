package surevil.lottery.springcontroller.upload;

import io.swagger.annotations.*;
import surevil.lottery.blservice.upload.ImageUploadBlService;
import surevil.lottery.exception.ThingIdDoesNotExistException;
import surevil.lottery.exception.SystemException;
import surevil.lottery.response.Response;
import surevil.lottery.response.WrongResponse;
import surevil.lottery.response.upload.UploadImageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UploadController {
    private final ImageUploadBlService imageUploadBlService;

    @Autowired
    public UploadController(ImageUploadBlService imageUploadBlService) {
        this.imageUploadBlService = imageUploadBlService;
    }

    @Authorization(value = "商户")
    @ApiOperation(value = "商户上传图片", notes = "商户上传物品项图片，传输时限为10min")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "multipartFile", value = "图片", required = true, dataType = "MultipartFile"),
            @ApiImplicitParam(name = "thingId", value = "物品项ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload/thing/{thingId}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Image uploaded", response = UploadImageResponse.class),
            @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
            @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadFiles(@PathVariable("thingId") int thingId, @RequestParam("file") MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(imageUploadBlService.uploadFiles(thingId, multipartFile), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (ThingIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "上传图片", notes = "上传图片")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "multipartFile", value = "图片", required = true, dataType = "MultipartFile"),
            @ApiImplicitParam(name = "thingId", value = "物品项ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Image uploaded", response = UploadImageResponse.class),
            @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
            @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadFiles(@RequestParam("file") MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(imageUploadBlService.uploadFiles(multipartFile), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (ThingIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }
}
