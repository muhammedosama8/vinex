import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/setting/iban";

export default class PaymentService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
