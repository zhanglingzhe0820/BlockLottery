import http from "../HttpService";

export class ThingServiceMock {
    async getArtworks() {
        const artworks = [
            {
                id: 1,
                coverUrl: "http://njutakeout.oos-bj2.ctyunapi.cn/2019%E5%B9%B412%E6%9C%88?AWSAccessKeyId\u003dc4582dec5d0809103126\u0026Expires\u003d9223372036854775\u0026Signature\u003d50VTbUW97U4Rd1DqrLNa490oGOg%3D",
                name: "OPPO艺术品1",
                price: 3000,
            },
            {
                id: 2,
                coverUrl: "http://njutakeout.oos-bj2.ctyunapi.cn/2019%E5%B9%B412%E6%9C%88?AWSAccessKeyId\u003dc4582dec5d0809103126\u0026Expires\u003d9223372036854775\u0026Signature\u003d50VTbUW97U4Rd1DqrLNa490oGOg%3D",
                name: "OPPO艺术品2",
                price: 5000,
            },
        ];
        return await artworks;
    }

    async getArtworkDetail(id) {
        const artworkDetail = {
            name: "九水玲珑心",
            price: 12.00,
            content: "<div style='text-align: center'>九地真水中提取出的心脏</div>",
            defaultList: [
                "https://developers.weixin.qq.com/miniprogram/dev/image/cat/2.png?t=18092914",
                "http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg"
            ],
        };
        return await artworkDetail;
    }

    async putArtwork(artworkData) {
        const t = await http.post(
            '/master/artwork', artworkData
        );
        return t;
    }
}
