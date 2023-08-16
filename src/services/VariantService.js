import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/categories/addVariant";
const apiGetAllVariant = API_BASE_URL_ENV() +"/categories/getAllVariant"
const apiGetVariant = API_BASE_URL_ENV() +"/categories/getVariant"
const apiUpdateVariant = API_BASE_URL_ENV() +"/categories/updateVariant"
const apiDeleteVariant = API_BASE_URL_ENV() +"/categories/deleteVariant"

export default class VariantService extends BaseService {
    // constructor() {
    //     super(apiEndpoint);
    // }
    
    addVariant=(data)=>{
        return http.post(apiEndpoint, data) 
    }
   
    getList=()=>{
        return http.get(apiGetAllVariant)
    }

    getVariant=(id)=>{
        return http.get(`${apiGetVariant}/${id}`)
    }

    updateVariant=(id,data) => {
        return http.put(`${apiUpdateVariant}/${id}`,data)
    }

    remove=(id) => {
        return http.delete(`${apiDeleteVariant}/${id}`)
    }
}
