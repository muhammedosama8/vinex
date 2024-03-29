import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/product";
const apiGetEndpoint = API_BASE_URL_ENV() + "/product/Auth";
const apiDynamicVariantEndpoint = API_BASE_URL_ENV() + "/dynamicVariant/dynamicVariantsByCategory";
const apiDynamicVariantForProductEndpoint = API_BASE_URL_ENV() + "/product/dynamicVariantsOfProduct";
const apiTogglle = API_BASE_URL_ENV() +"/admin/block"
const apiProductCode = API_BASE_URL_ENV() +"/product/codeAuth"
const apiDigitalProduct = API_BASE_URL_ENV() +"/product/digtal"

export default class ProductsService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    createDigitalProduct(data) {
        return http.post(apiDigitalProduct, data);
    }
    getAllProducts(params) {
        return http.get(apiEndpoint, {params});
    }
    getList(params) {
        return http.get(apiGetEndpoint, {params});
    }
    toggleStatus(id, data) {
        return http.put(`${apiTogglle}/${id}`, data);
    }

    getProduct(id){
        return http.get(`${apiGetEndpoint}/${id}`)
    }

    getDynamicVariant(id){
        return http.get(`${apiDynamicVariantEndpoint}/${id}`)
    }
    getDynamicVariantOfProducts(id){
        return http.get(`${apiDynamicVariantForProductEndpoint}/${id}`)
    }
   
}
