import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/admin/buy";

export default class AdminBuyService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
