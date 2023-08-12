import BaseService from "./BaseService";
import http from './HttpService'

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/promoCode";
const apiToggleStatusEndpoint = API_BASE_URL_ENV() + "/promoCode/status";

export default class PromoCodeService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

    toggleStatus(id) {
        return http.put(this.entityUrl(`${apiToggleStatusEndpoint}/${id}`));
    }
}
