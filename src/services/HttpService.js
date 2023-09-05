import axios from "axios";
import https from "https";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Logout } from "../store/actions/AuthActions";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
function setInterceptors(navigate){
  axios.interceptors.response.use(null, async (error) => {
    console.log(error)
    if(error?.response?.data?.message === "not authorized" || error?.response?.data?.message === "not authorized (old Token)." || error?.response?.data?.message === "غير مصرح به (رمز قديم)"){
      Logout(navigate);
    } else if(error?.response?.data?.message ===  "المستخدم غير موجود" || error?.response?.data?.message === 'User not Exist.'){
      swal("Oops", "Email not found", "error",{ button: "Try Again!",});
    } else if(error?.response?.data?.message === 'كلمة سر خاطئة' || error?.response?.data?.message === "Incorrect Password."){
      swal("Oops", "Incorrect Password", "error",{ button: "Try Again!",});
    } else if(error?.response){
      toast.error(`${error?.response?.data?.message}`)
    } else {
      toast.error(error.message)
    }
  });
}


function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `${jwt}`;
}
const obj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  setInterceptors
}
export default obj;