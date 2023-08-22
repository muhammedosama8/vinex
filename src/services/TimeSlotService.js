import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/timeSlot";

export default class TimeSlotService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
