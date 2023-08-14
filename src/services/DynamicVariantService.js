import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/dynamicVariant";

export default class DynamicVariantService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
