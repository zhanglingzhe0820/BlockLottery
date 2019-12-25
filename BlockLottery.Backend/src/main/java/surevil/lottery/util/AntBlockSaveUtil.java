package surevil.lottery.util;

import cn.com.antcloud.api.AntFinTechApiClient;
import cn.com.antcloud.api.AntFinTechProfile;
import cn.com.antcloud.api.twc.v1_0_0.model.Identity;
import cn.com.antcloud.api.twc.v1_0_0.request.CreateTextRequest;
import cn.com.antcloud.api.twc.v1_0_0.request.CreateTransRequest;
import cn.com.antcloud.api.twc.v1_0_0.request.GetTextRequest;
import cn.com.antcloud.api.twc.v1_0_0.request.GetTransRequest;
import cn.com.antcloud.api.twc.v1_0_0.response.CreateTextResponse;
import cn.com.antcloud.api.twc.v1_0_0.response.CreateTransResponse;
import cn.com.antcloud.api.twc.v1_0_0.response.GetTextResponse;
import cn.com.antcloud.api.twc.v1_0_0.response.GetTransResponse;
import surevil.lottery.exception.PutToBlockErrorException;

import java.util.List;

public class AntBlockSaveUtil {
    private static final String PRODUCT_INSTANCE_ID = "notary-api-test";
    private static final AntFinTechProfile profile = AntFinTechProfile.getProfile(
            "https://prodapigw.cloud.alipay.com",
            "LTAI4FniYELXW4DkfT78BHx5",
            "ow5IkHQkmZ8LiYmMwOqoOde7ODfZ2l"
    );
    private static final AntFinTechApiClient client = new AntFinTechApiClient(profile);

    public static Transaction saveAndGetTransaction(String phase, String content) throws PutToBlockErrorException {
        // 构建请求
        CreateTransRequest createTransRequest = new CreateTransRequest();
        Identity customer = new Identity();
        customer.setCertName("小王");
        customer.setCertNo("320503199808202759");
        customer.setCertType("IDENTITY_CARD");
        customer.setLegalPerson("张凌哲");
        customer.setUserType("PERSON");
        createTransRequest.setCustomer(customer);
        createTransRequest.setTsr(true);
        createTransRequest.setProductInstanceId(PRODUCT_INSTANCE_ID);
        createTransRequest.setRegionName("CN-HANGZHOU-FINANCE");
        try {
            CreateTransResponse createTransResponse = client.execute(createTransRequest);
            if (createTransResponse.getResultCode().equals("200")) {
                // 构建文本存证请求
                CreateTextRequest createTextRequest = new CreateTextRequest();
                createTextRequest.setNotaryContent(content);
                createTextRequest.setPhase(phase);
                createTextRequest.setTransactionId(createTransResponse.getTransactionId());
                createTextRequest.setProductInstanceId(PRODUCT_INSTANCE_ID);
                CreateTextResponse response = client.execute(createTextRequest);
                if (response.getResultCode().equals("200")) {
                    return new Transaction(createTransResponse.getTransactionId(), response.getTxHash());
                } else {
                    throw new PutToBlockErrorException();
                }
            } else {
                throw new PutToBlockErrorException();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new PutToBlockErrorException();
        }
    }

    public static String getContentUrlByTransaction(String transactionId) throws PutToBlockErrorException {
        try {
            // 构建请求，获取存证事务信息
            GetTransRequest getTransRequest = new GetTransRequest();
            getTransRequest.setTransactionId(transactionId);
            getTransRequest.setProductInstanceId(PRODUCT_INSTANCE_ID);
            GetTransResponse getTransResponse = client.execute(getTransRequest);
            if (getTransResponse.getResultCode().equals("200")) {
                List<String> urls = getTransResponse.getFileUrl();
                return urls.get(1);
            } else {
                throw new PutToBlockErrorException();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new PutToBlockErrorException();
        }
    }

    public static String getContentByTransaction(String txHash) throws PutToBlockErrorException {
        try {
            // 构建请求，获取存证事务信息
            GetTextRequest getTextRequest = new GetTextRequest();
            getTextRequest.setTxHash(txHash);
            getTextRequest.setProductInstanceId(PRODUCT_INSTANCE_ID);
            GetTextResponse getTransResponse = client.execute(getTextRequest);
            if (getTransResponse.getResultCode().equals("200")) {
                return getTransResponse.getContent();
            } else {
                throw new PutToBlockErrorException();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new PutToBlockErrorException();
        }
    }
}
