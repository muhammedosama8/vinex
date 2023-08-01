import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/admin";
const apiTogglle = API_BASE_URL_ENV() +"/admin/block"
const apiCategories = API_BASE_URL_ENV() +"/categories"
export default class AdminService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    
    addVariant=(data)=>{
        return http.post(`${apiCategories}/addVariant`, data) 
    }

    getVariant=(id)=>{
        return http.get(`${apiCategories}/getVariant/${id}`) 
    }

    updateVariant(id, data) {
        const body = { ...data };
        return http.put(`${apiCategories}/updateVariant/${id}`, body);
    }

    deleteVariant(id) {
        return http.delete(`${apiCategories}/deleteVariant/${id}`);
    }

    addCategories=(data)=>{
        return http.post(`${apiCategories}`, data) 
    }

    toggleStatus(id, data) {
        return http.put(`${apiTogglle}/${id}`, data);
    }

}
