import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminService from "../../../../services/AdminService";
import {useLocation} from 'react-router-dom';
import Select from 'react-select';
import CountryiesService from "../../../../services/CountriesService";

const AddAdmin = () => {
   const location = useLocation();
   const [formData, setFormData] = useState({})
   const [loading, setLoading] = useState(false)
   const [countriesOptions, setCountriesOptions] = useState([])
   const [error, setError] = useState({
      password: false
   })
   const [showPassword, setShowPassword] = useState(false)
   const navigate = useNavigate()
   const adminService = new AdminService()
   const countryiesService = new CountryiesService()

   useEffect(()=>{
      countryiesService?.getList().then(res=>{
         if(res.status === 200){
            let data = res.data.data?.map(item=>{
               return{
                  label: `${item.name_en} (${item?.country_code || ''})`,
                  name_en: item.name_en,
                  country_code: item?.country_code,
                  type: item.type
               }
            })
            setCountriesOptions(data)
         }
      })
      if(location?.state?.edit){
         let item = location.state?.item
         setFormData({
            first_name: item?.f_name,
            last_name: item?.l_name,
            email: item?.email,
            phone: item?.phone,
            country_code: item?.country_code,
            password: '',
         })
      }
   },[])

   const inputHandler = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   const onSubmit = (e) =>{
      e.preventDefault();
      if(!location?.state?.edit && formData.password.length < 6){
         setError({...formData, password: true})
         return
      }
      setLoading(true)
      let data = {
         f_name: formData?.first_name,
         l_name: formData?.last_name,
         rules: []
      }
      if(location?.state?.edit){
         adminService.update(location.state?.id, data).then((response) =>{
            if(response?.status === 200){
               toast.success('Admin Updated Successfully')
               navigate('/admins')
            }
         })
      } else {
         data['password'] = formData?.password
         data['email'] = formData?.email
         data['phone'] = formData?.phone
         data['country_code'] = formData?.country_code?.country_code

         adminService.create(data).then((response) =>{
            if(response?.status === 201){
               toast.success('Admin Added Successfully')
               navigate('/admins')
            }
         })
      }
      setLoading(false)
   }

   return (
      <Card className="p-4">
         <form onSubmit={onSubmit}>
         <div className="row">
            <div className="col-lg-6 mb-3">
                  <label className="text-label">First Name*</label>
                  <input
                     type="text"
                     name="first_name"
                     className="form-control"
                     placeholder="Fist Name"
                     required
                     pattern="[A-Za-z]+"
                     value={formData.first_name}
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>
            <div className="col-lg-6 mb-3">
                  <label className="text-label">Last Name*</label>
                  <input
                     type="text"
                     name="last_name"
                     className="form-control"
                     placeholder="Last Name"
                     required
                     pattern="[A-Za-z]+"
                     value={formData.last_name}
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>
           {!location?.state?.edit &&  <div className="col-lg-6 mb-3">
                  <label className="text-label">Email Address*</label>
                  <input
                     type="email"
                     name="email"
                     className="form-control"
                     placeholder="example@example.com"
                     required
                     value={formData.email}
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>}
            {!location?.state?.edit && <div className="col-lg-6 mb-3">
                  <label className="text-label">Password*</label>
                  <input
                     type={`${showPassword ? 'password' : 'text'}`}
                     name="password"
                     className="form-control"
                     placeholder="Passwword"
                     required
                     value={formData.password}
                     onChange={(e)=> {
                        setError({...formData, password: false})
                        inputHandler(e)
                     }}
                     onFocus={(e)=> setShowPassword(false)}
                     onBlur={(e)=> setShowPassword(true)}
                  />
                  {error['password'] && <p className="text-danger m-0" style={{fontSize: '12px'}}>length must be at least 6 characters long</p>}
            </div>}
            {!location?.state?.edit && <div className="col-lg-3 mb-3">
                  <label className="text-label">Country Code*</label>
                  <Select
                     value={formData?.country_code}
                     name="country_code"
                     options={countriesOptions}
                     onChange={(e)=> setFormData({...formData, country_code: e})}
                  />
            </div>}
            {!location?.state?.edit && <div className="col-lg-3 mb-3">
                  <label className="text-label">Phone Number*</label>
                  <input
                     type="number"
                     name="phone"
                     className="form-control"
                     placeholder="01234567890"
                     required
                     value={formData.phone}
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>}
         </div>
         <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" type="button" onClick={()=> navigate('/admins')}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>Submit</Button>
         </div>
      </form>
      </Card>
   );
};

export default AddAdmin;
