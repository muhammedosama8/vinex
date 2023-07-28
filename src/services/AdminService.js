import BaseService from "./BaseService";
import axios from "axios";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/admin";
// const apiDropDownEndpoint = API_BASE_URL_ENV() + "/admin/user/dropdown/Admin";
const apiTogglle = API_BASE_URL_ENV() +"/admin/block"
export default class AdminService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    
    // getDropDown=()=>{
    //     return axios.get(apiDropDownEndpoint) 
    // }

    toggleStatus(id, data) {
        return http.put(`${apiTogglle}/${id}`, data);
    }
 
   
}
