import http from '../HttpService';

export class ThingServiceImpl {
    async getArtworks() {
        return await http.get(
            '/thing/supplier'
        );
    }

    async getArtworkDetail(id) {
        const artworkDetail = await http.get(
            '/thing/supplier/' + id
        );
        return {
            id: id,
            name: artworkDetail.name,
            price: artworkDetail.price,
            content: artworkDetail.description,
            url: artworkDetail.url,
            time: artworkDetail.time,
            status: artworkDetail.status,
            description: artworkDetail.description,
            currentPrice: artworkDetail.currentPrice,
            intervalPrice: artworkDetail.intervalPrice,
            imageUrls: artworkDetail.imageUrls,
            startTime: artworkDetail.startTime,
            endTime: artworkDetail.endTime,
            joinNum: artworkDetail.joinNum
        }
    }

    async putArtwork(artworkData) {
        return await http.put(
            '/thing/supplier', artworkData
        );
    }

    async updateArtwork(artworkData) {
        return await http.post(
            '/thing/supplier/update', artworkData
        );
    }
}
