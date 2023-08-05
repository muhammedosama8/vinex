import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/admin/user";

export default class UserService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
