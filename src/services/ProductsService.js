import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/product";
const apiGetEndpoint = API_BASE_URL_ENV() + "/product/Auth";
const apiDynamicVariantEndpoint = API_BASE_URL_ENV() + "/dynamicVariant/dynamicVariantsByCategory";
const apiTogglle = API_BASE_URL_ENV() +"/admin/block"

export default class ProductsService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    getList(params) {
        return http.get(apiGetEndpoint, {params});
    }
    toggleStatus(id, data) {
        return http.put(`${apiTogglle}/${id}`, data);
    }

    getProduct(id){
        return http.get(`${apiEndpoint}/${id}`)
    }

    getDynamicVariant(id){
        return http.get(`${apiDynamicVariantEndpoint}/${id}`)
    }
   
}
