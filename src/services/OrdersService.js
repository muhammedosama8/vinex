import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/order/admin";
const apiTogglle = API_BASE_URL_ENV() +"/order/changeStatus"

export default class OrdersService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    getList(params) {
        return http.get(apiEndpoint, {params});
    }
    toggleStatus(id, data) {
        return http.put(`${apiTogglle}/${id}`, data);
    }

}
