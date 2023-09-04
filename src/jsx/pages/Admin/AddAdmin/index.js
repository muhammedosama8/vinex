import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminService from "../../../../services/AdminService";
import {useLocation} from 'react-router-dom';
import Select from 'react-select';
import CountryiesService from "../../../../services/CountriesService";
import {AvField, AvForm} from "availity-reactstrap-validation";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";

const AddAdmin = () => {
   const location = useLocation();
   const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country_code: '',
      password: '',
      rules: []
   })
   const [loading, setLoading] = useState(false)
   const [countriesOptions, setCountriesOptions] = useState([])
   const [showPassword, setShowPassword] = useState(false)
   const navigate = useNavigate()
   const adminService = new AdminService()
   const countryiesService = new CountryiesService()
   const lang = useSelector(state=> state.auth?.lang)

   useEffect(()=>{
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
      } else {
         countryiesService?.getList().then(res=>{
            if(res && res?.status === 200){
               let data = res.data.data?.map(item=>{
                  return{
                     label: `${lang === 'en' ? item.name_en : item.name_ar} (${item?.country_code || ''})`,
                     name_en: item.name_en,
                     country_code: item?.country_code,
                     type: item.type
                  }
               })
               setCountriesOptions(data)
            }
         })    
      }
   },[])

   const inputHandler = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   const onSubmit = (e) =>{
      e.preventDefault();
      // if(!location?.state?.edit && formData.password.length < 6){
      //    setError({...formData, password: true})
      //    return
      // }
      
      let data = {
         f_name: formData?.first_name,
         l_name: formData?.last_name,
         rules: []
      }
      if(location?.state?.edit){
         setLoading(true)
         adminService.update(location.state?.id, data).then((response) =>{
            if(response?.status === 200){
               toast.success('Admin Updated Successfully')
               navigate('/admins')
            }
            setLoading(false)
         })
      } else {
         if(!formData.country_code){
            toast.error('Select Country')
            return
         }
         data['password'] = formData?.password
         data['email'] = formData?.email
         data['phone'] = formData?.phone
         data['country_code'] = formData?.country_code?.country_code
         setLoading(true)
         adminService.create(data).then((response) =>{
            if(response?.status === 201){
               toast.success('Admin Added Successfully')
               navigate('/admins')
            }
            setLoading(false)
         })
      }
   }

   return (
      <Card className="p-4">
         <AvForm onValidSubmit={onSubmit}>
         <div className="row">
            <div className="col-lg-6 col-sm-6 mb-3">
               <AvField
						label ={`${Translate[lang]?.first_name}*`}
						name ='first_name'
						type='text'
						value={formData?.first_name}
						errorMessage="Please enter a valid First Name"
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
						placeholder={`${Translate[lang]?.first_name}`}
						onChange={(e)=> inputHandler(e)}
					/>
            </div>
            <div className="col-lg-6 col-sm-6 mb-3">
               <AvField
						label ={`${Translate[lang]?.last_name}*`}
						name ='last_name'
						type='text'
						value={formData?.last_name}
						errorMessage="Please enter a valid Last Name"
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
						placeholder={`${Translate[lang]?.last_name}`}
						onChange={(e)=> inputHandler(e)}
					/>
            </div>
           {!location?.state?.edit &&  <div className="col-lg-6 col-sm-6 mb-3">
               <AvField
						label ={`${Translate[lang]?.email}*`}
						name ='email'
						type='email'
						value={formData?.email}
						errorMessage="Please enter a valid Email"
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
						placeholder='example@example.com'
						onChange={(e)=> inputHandler(e)}
					/>
            </div>}
            {!location?.state?.edit && <div className="col-lg-6 col-sm-6 mb-3">
               <AvField
						label ={`${Translate[lang]?.password}*`}
						name ='password'
						type={`${showPassword ? 'password' : 'text'}`}
						value={formData?.password}
						errorMessage="Please enter a valid Password"
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
                  onFocus={(e)=> setShowPassword(false)}
                  onBlur={(e)=> setShowPassword(true)}
						placeholder={`${Translate[lang]?.password}`}
						onChange={(e)=> inputHandler(e)}
					/>
            </div>}
            {!location?.state?.edit && <div className="col-lg-3 col-sm-6 mb-3">
                  <label className="text-label">{Translate[lang]?.country_code}*</label>
                  <Select
                     value={formData?.country_code}
                     name="country_code"
                     placeholder={Translate[lang]?.select}
                     options={countriesOptions}
                     onChange={(e)=> setFormData({...formData, country_code: e})}
                  />
            </div>}
            {!location?.state?.edit && <div className="col-lg-3 col-sm-6 mb-3">
                  <AvField
						label ={`${Translate[lang]?.phone}*`}
						name ='phone'
						type='number'
						value={formData?.phone}
						errorMessage="Please enter a valid Phone"
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
						placeholder={`${Translate[lang]?.phone}`}
						onChange={(e)=> inputHandler(e)}
					/>
            </div>}
         </div>
         <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" type="button" onClick={()=> navigate('/admins')}>{Translate[lang]?.cancel}</Button>
            <Button variant="primary" type="submit" disabled={loading}>{Translate[lang]?.submit}</Button>
         </div>
      </AvForm>
      </Card>
   );
};

export default AddAdmin;
