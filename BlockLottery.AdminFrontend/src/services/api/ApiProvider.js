import {AccountServiceImpl} from './account/AccountService'
import {AccountServiceMock} from './account/AccountServiceMock'
import {ThingServiceImpl} from "./artwork/ThingService";
import {ThingServiceMock} from "./artwork/ThingServiceMock";
import {EventServiceImpl} from "./event/EventService";

class ApiProvider {
    isMock = false;

    accountService = undefined;
    thingService = undefined;
    eventService = undefined;

    constructor() {
        if (this.isMock) {
            this.accountService = new AccountServiceMock();
            this.thingService = new ThingServiceMock();
            this.eventService = new EventServiceImpl();
        } else {
            this.accountService = new AccountServiceImpl();
            this.thingService = new ThingServiceImpl();
            this.eventService = new EventServiceImpl();
        }
    }
}

export const api = new ApiProvider();
