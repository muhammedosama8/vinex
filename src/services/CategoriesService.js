import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/categories";
// const apiDropDownEndpoint = API_BASE_URL_ENV() + "/admin/user/dropdown/Admin";
const apiAllVariant = API_BASE_URL_ENV() +"/categories/getAllVariant"
export default class CategoriesService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    
    addVariant=(data)=>{
        return http.post(`${apiEndpoint}/addVariant`, data) 
    }
   
    getAllVariant=()=>{
        return http.get(apiAllVariant)
    }
}
