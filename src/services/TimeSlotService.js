import BaseService from "./BaseService";
import http from './HttpService'

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/timeSlot";
const apiDeleteEndpoint = API_BASE_URL_ENV() + "/timeSlot/blockDate";

export default class TimeSlotService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

    delete(id) {
        return http.delete(`${apiDeleteEndpoint}/${id}`);
    }
}
