import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";
import BaseService from './BaseService';

const apiPostEndpoint = API_BASE_URL_ENV() + "/categories/addSubCategory";
const apiGetEndpoint = API_BASE_URL_ENV() + "/categories/getSubCategory";
const apiGetSubForCategoryEndpoint = API_BASE_URL_ENV() + "/categories/getSubCategoryOfCategory";
const apiDeleteEndpoint = API_BASE_URL_ENV() + "/categories/deleteSubCategory";
const apiUpdateEndpoint = API_BASE_URL_ENV() + "/categories/updateSubCategory";

export default class SubCategoriesService extends BaseService {
    
    getList(params) {
        if(params){
            return http.get(apiGetEndpoint,{params});
        }
        return http.get(apiGetEndpoint);
    }

    getListForCategory(id) {
        return http.get(`${apiGetSubForCategoryEndpoint}/${id}`);
    }

    create(data) {
        return http.post(apiPostEndpoint, data);
    }

    remove(id) {
        return http.delete(`${apiDeleteEndpoint}/${id}`);
    }
    
    update(id, data) {
        const body = { ...data };
        return http.put(`${apiUpdateEndpoint}/${id}`, body);
    }
   
}
