
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CategoriesService from "../../../../services/CategoriesService";
import DynamicVariantService from "../../../../services/DynamicVariantService";

const AddDynamicVariant = ()=>{
   const [formData, setFormData] =useState({category: ''})
   const [dynamicVariant, setDynamicVariant] = useState([
      {
         category: '',
         name_en: "",
         name_ar: "",
         available_amount: '',
         has_amount: false,
         price: ''
      }
   ])
   let dynamic_variant_id = window?.location?.pathname?.split('/dynamic-variant/add-dynamic-variant/')[1]
   const [ categoriesOptions, setCategoriesOptions] = useState()
   const [ isAdd, setIsAdd] = useState(true)
   const [ id, setId] = useState(null)
   const categoriesService = new CategoriesService()
   const dynamicVariantService = new DynamicVariantService()
   const navigate = useNavigate()

   useEffect(()=>{
      categoriesService?.getList().then(res=>{
         if(res.data?.status === 200){
            let categories =  res.data?.meta?.data?.map(item=>{
               return{
                  id: item?.id,
                  value: item?.id,
                  label: item.name_en
               }
            })
            setCategoriesOptions(categories)
         }
      })
   }, [])

   useEffect(()=>{
      if(!!formData?.category && !id){
         dynamicVariantService?.find(formData?.category?.id)?.then(res=>{
            if(res?.status === 200){
               if(res.data?.meta.data?.length > 0){
                  setIsAdd(false)
                  setDynamicVariant(res.data?.meta?.data)
               } else{
                  setIsAdd(true)
               }
            }
         })
      }
   },[formData?.category])

   useEffect(()=>{
      if(!!formData?.category || !!dynamic_variant_id){
         dynamicVariantService?.getList(Number(dynamic_variant_id)).then(res=>{
            if(res?.status === 200){
               setDynamicVariant([...res.data?.meta.data])
            }
         })
      }
   },[window.location.pathname])

   const onSubmit = (e) =>{
      e.preventDefault()
      if(isAdd){
         // dynamicVariantService?.create(dynamicVariant).then(res=> {
         //    if(res?.status === 201){
         //       toast.success('Dynamic Variant Added Successfully')
         //       // setFormData({category: '', variant: []})
         //       navigate('/variant')
         //    }
         // })
         
      } else {
         // dynamicVariant?.update(Number(dynamic_variant_id), dynamicVariant)?.then(res => {
         //    if(res?.status === 200){
         //       toast.success('Dynamic Variant Updated Successfully')
         //       // setFormData({category: '', variant: []})
         //       navigate('/variant')
         //    }
         // })
      }
      
   }

   return(
      <Card>
         <Card.Body>
            <form className="add-variant" onSubmit={onSubmit}>
            <div className="row">
               {!dynamic_variant_id && <div className="col-lg-6 mb-2">
                  <div className="form-group mb-3">
                     <label className="text-label">Category</label>
                     <Select
                     value={formData.category}
                     name="category"
                     options={categoriesOptions}
                     onChange={(e)=> {
                        setFormData({category: e})
                     }}
                  />
                  </div>
               </div>}

               {dynamicVariant?.map((item, itemIndex)=>(
                  <Col style={{boxShadow: '0 0 2px #dedede'}} md={12} className='mb-3 py-4 position-relative' key={itemIndex}>
                     {itemIndex > 0 && <button 
                           className="position-absolute"
                           type='button' 
                           style={{
                              height: 'fit-content', right: '16px', top: '16px',zIndex: '999',
                              padding: '2px 8px', backgroundColor: 'var(--danger)',
                              color: '#fff', border: 'none', borderRadius: '8px'
                           }}
                           onClick={()=>{
                              let update = dynamicVariant?.filter((_,index)=> index !== itemIndex)
                              setDynamicVariant(update)
                           }}
                        >X</button>}
                     <Row>
                        <Col lg={6} md={6} className='mb-3'>
                           <div className="form-group">
                              <label className="text-label">English Name</label>
                              <input
                              type="text"
                              name="en"
                              className="form-control"
                              placeholder="English Name"
                              required
                              // pattern="[\u0600-\u06FF\s]+"
                              value={item?.name_en}
                              onChange={(e)=> {
                                 let update = dynamicVariant?.map((res, index)=>{
                                    if(index === itemIndex){
                                       return{
                                          ...res,
                                          name_en: e.target.value
                                       }
                                    } else {
                                       return res
                                    }
                                 })
                                 setDynamicVariant([...update])
                              }}
                           />
                           </div>
                        </Col>
                        <Col md={6} className='mb-3'>
                           <label>Arabic Name</label>
                           <input
                              type="text"
                              name="ar"
                              className="form-control"
                              placeholder="Arabic Name"
                              required
                              // pattern="[\u0600-\u06FF\s]+"
                              value={item?.name_ar}
                              onChange={(e)=> {
                                 let update = dynamicVariant?.map((res, index)=>{
                                    if(index === itemIndex){
                                       return{
                                          ...res,
                                          name_ar: e.target.value
                                       }
                                    } else {
                                       return res
                                    }
                                 })
                                 setDynamicVariant([...update])
                              }}
                           />
                        </Col>
                        <Col md={2}>
                           <label className="text-label">Has Amount</label>
                           <Form.Check
                           type="switch"
                           id={`has_amount`}
                           checked={item.has_amount}
                           onChange={(e)=> {
                              let update = dynamicVariant?.map((res, index)=>{
                                 if(index === itemIndex){
                                    return{
                                       ...res,
                                       has_amount: e.target.checked
                                    }
                                 } else {
                                    return res
                                 }
                              })
                              setDynamicVariant([...update])
                           }}
                           />
                        </Col>
                        <Col md={4}>
                           <label>Available Amount</label>
                           <input
                              type="number"
                              name="avilable_amount"
                              className="form-control"
                              placeholder="Available Amount"
                              required
                              // pattern="[\u0600-\u06FF\s]+"
                              value={item?.available_amount}
                              onChange={(e)=> {
                                 let update = dynamicVariant?.map((res, index)=>{
                                    if(index === itemIndex){
                                       return{
                                          ...res,
                                          available_amount: e.target.value
                                       }
                                    } else {
                                       return res
                                    }
                                 })
                                 setDynamicVariant([...update])
                              }}
                           />
                        </Col>
                        <Col md={6}>
                           <label>Price</label>
                           <input
                              type="number"
                              name="price"
                              className="form-control"
                              placeholder="Price"
                              required
                              // pattern="[\u0600-\u06FF\s]+"
                              value={item?.price}
                              onChange={(e)=> {
                                 let update = dynamicVariant?.map((res, index)=>{
                                    if(index === itemIndex){
                                       return{
                                          ...res,
                                          price: e.target.value
                                       }
                                    } else {
                                       return res
                                    }
                                 })
                                 setDynamicVariant([...update])
                              }}
                           />
                        </Col>
                     </Row>
                  </Col>
               ))}
                  <div className="d-flex w-100 justify-content-end mb-3">
                     <Button 
                        variant="link" 
                        style={{color: 'blue'}}
                        type="button" 
                        onClick={()=>setDynamicVariant([...dynamicVariant, {
                           category: '',
                           name_en: "",
                           name_ar: "",
                           available_amount: '',
                           has_amount: false,
                           price: ''
                        }])}
                     >Add New Dynamic Variant</Button>
                  </div>
            </div>
            <div className="d-flex justify-content-between">
               <div></div>
               <div>
                  <Button variant="primary" type="submit">Submit</Button>
               </div>
            </div>
            </form>
         </Card.Body>
      </Card>
    )
}
export default AddDynamicVariant;