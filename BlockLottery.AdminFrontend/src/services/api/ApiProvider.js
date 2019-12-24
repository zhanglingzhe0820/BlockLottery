import {AccountServiceImpl} from './account/AccountService'
import {AccountServiceMock} from './account/AccountServiceMock'
import {ThingServiceImpl} from "./artwork/ThingService";
import {ThingServiceMock} from "./artwork/ThingServiceMock";

class ApiProvider {
    isMock = false;

    accountService = undefined;
    thingService = undefined;
    constructor() {
        if (this.isMock) {
            this.accountService = new AccountServiceMock();
            this.thingService = new ThingServiceMock();
        } else {
            this.accountService = new AccountServiceImpl();
            this.thingService = new ThingServiceImpl();
        }
    }
}

export const api = new ApiProvider();
