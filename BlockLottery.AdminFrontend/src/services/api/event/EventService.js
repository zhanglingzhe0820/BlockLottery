import http from '../HttpService';

export class EventServiceImpl {
    async addEvent(eventAddParameters) {
        return await http.post(
            '/event', eventAddParameters
        );
    }

    async loadEvents() {
        return await http.get(
            '/event'
        );
    }

    async getEventDetail(id) {
        return await http.get(
            '/event/' + id
        );
    }
}
