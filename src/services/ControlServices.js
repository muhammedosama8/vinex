import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/control";
const apiDashboardLogoEndpoint = API_BASE_URL_ENV() + "/control/dashboardLogo";
export default class ControlService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

    getDashboardLogo(){
        return http.get(apiDashboardLogoEndpoint)
    }
}
