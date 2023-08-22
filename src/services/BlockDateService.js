import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/timeSlot/blockDate";

export default class BlockDateService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
