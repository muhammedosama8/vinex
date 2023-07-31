import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/categories";
// const apiDropDownEndpoint = API_BASE_URL_ENV() + "/admin/user/dropdown/Admin";
const apiTogglle = API_BASE_URL_ENV() +"/admin/block"
const apiCategories = API_BASE_URL_ENV() +"/"
export default class CategoriesService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    
    addVariant=(data)=>{
        return http.post(`${apiCategories}/addVariant`, data) 
    }

    toggleStatus(id, data) {
        return http.put(`${apiTogglle}/${id}`, data);
    }
 
   
}
