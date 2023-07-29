import axios from "axios";
import https from "https";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Logout } from "../store/actions/AuthActions";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

axios.interceptors.response.use(null, async (error) => {
  const navigate = useNavigate()
  console.log(error)
  if (error.response && error.response.status === 401) {
    if (error.response.data.admins?.isAdmin) {
      Logout(navigate);
      window.location = `/login`;
    } 
  } else if(error.response && error.response.status === 403){
    if(error.response.data.message === "not authorized (old Token)."){
      Logout(navigate);
      window.location = `/login`;
    }
  } else if(error.response && error.response?.data?.status === 404){
    toast.error(error.response?.data?.message)
  }
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `${jwt}`;
}
const obj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
}
export default obj;