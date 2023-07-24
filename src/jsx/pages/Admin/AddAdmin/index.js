import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Rules } from "../../../Enums/Rules";

const AddAdmin = () => {
   const [formData, setFormData] = useState({})
   const [rules, setRules] = useState({})
   const [showPassword, setShowPassword] = useState(false)

   useEffect(()=>{
      let allRules = {}
      Rules.map(rul => {
         let key = rul.value
         allRules = { ...allRules, [key]: false}
         return{}
      })
      setRules({...allRules})
   },[])

   const inputHandler = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   const onSubmit = (e) =>{
      e.preventDefault();
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
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>
            <div className="col-lg-6 mb-3">
                  <label className="text-label">Email Address*</label>
                  <input
                     type="email"
                     name="email"
                     className="form-control"
                     placeholder="example@example.com"
                     required
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>
            <div className="col-lg-6 mb-3">
                  <label className="text-label">Password*</label>
                  <input
                     type={`${showPassword ? 'password' : 'text'}`}
                     name="password"
                     className="form-control"
                     placeholder="Passwword"
                     required
                     onChange={(e)=> inputHandler(e)}
                     onFocus={(e)=> setShowPassword(false)}
                     onBlur={(e)=> setShowPassword(true)}
                  />
            </div>
            <div className="col-lg-6 mb-3">
                  <label className="text-label">Phone Number*</label>
                  <input
                     type="number"
                     name="phone"
                     className="form-control"
                     placeholder="(+20)1234567890"
                     required
                     onChange={(e)=> inputHandler(e)}
                  />
            </div>
            
            <div className="col-md-12">
               <hr></hr>
            </div>
            <div className="col-md-12 mb-3">
               <label className="text-label">Rules*</label>
               <div className="row">
                  {Rules?.map((rule, index)=>{
                     return <div className="col-md-4" key={index}>
                        <input 
                           type='checkbox' 
                           id={rule.value} 
                           name={rule.value} 
                           value={rule.value}
                           onChange={(e) => {
                              let key = rule.value
                              setRules({
                                 ...rules,
                                 [key]: e.target.checked
                              })
                           }}
                        />
                        <label className="ml-2" htmlFor={rule.value}> {rule.label} </label>
                     </div>
                  })}
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Submit</Button>
         </div>
      </form>
      </Card>
   );
};

export default AddAdmin;
