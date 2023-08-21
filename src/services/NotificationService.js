import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/notification";

export default class NotificationService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
