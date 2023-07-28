import { API_BASE_URL_ENV } from "../jsx/common/common";
import axios from "axios";
import http from './HttpService'
import { getJwt } from "./AuthService";

const apiDropdownEndpoint = API_BASE_URL_ENV() + "/admin/settings/dropdown";

export default class BaseService {
  apiEndpoint;

  constructor(apiEndPoint) {
    http.setJwt(getJwt());
    this.apiEndpoint = apiEndPoint;
  }

  entityUrl(params = []) {
    return `${this.apiEndpoint}/${params.join("/")}`;
  }

  dropDownUrl(model) {
    return `${apiDropdownEndpoint}/${model}`;
  }

  getList() {
    return http.get(this.apiEndpoint);
  }

  find(id, params) {
    return http.get(this.entityUrl([id]), { params });
  }

  create(data) {
    return http.post(this.apiEndpoint, data);
  }

  update(id, data) {
    const body = { ...data };
    return http.put(this.entityUrl([id]), body);
  }

  toggleStatus(model, id, params = []) {
    return http.get(this.entityUrl(["toggle-activation", model, id]), { params });
  }

  getDropDown(model, params = []) {
    return http.get(this.dropDownUrl(model), { params });
  }

  remove(id) {
    return http.delete(this.entityUrl([id]));
  }

}