import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from 'react-select'
import { InputTags } from "react-bootstrap-tagsinput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CategoriesService from "../../../../services/CategoriesService";
import AdminService from "../../../../services/AdminService";


const AddVariant = ()=>{
   const [formData, setFormData] = useState({
      category: '',
      variant: []
   })
   const [ categoriesOptions, setCategoriesOptions] = useState()
   const [ tags, setTags] = useState([])
   const adminService = new AdminService()
   const categoriesService = new CategoriesService()
   const navigate = useNavigate()

   useEffect(()=>{
      categoriesService?.getList().then(res=>{
         if(res.data?.status === 200 || true){
            let categories =  res.data?.data?.map(item=>{
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

   const generateVariant = () =>{
      let update = tags?.map(tag=>{
         return {
            type: {
               name_en: tag,
               name_ar: '',
            },
            values: [
               {
                  value_ar: "",
                  value_en: ""
                }
            ]
         }
      })
      setFormData({...formData, variant: update})
   }

   const onSubmit = (e) =>{
      e.preventDefault()
      if(!formData?.category || formData?.variant?.length === 0 || formData.variant?.filter(res=> res.values?.length === 0)?.length > 0){
         toast.error('Complete All Phases')
         return
      }
      let data = {
         category_id: formData?.category?.value,
         variant: formData?.variant?.map((variant) => {
            return{
               ...variant.type,
               variant_values : variant.values
            }
         })
      }
      adminService?.addVariant(data)?.then(res => {
         if(res?.status === 201){
            toast.success('Variant Added Successfully')
            navigate('/variant')
         }
      })
   }

   return(
      <Card>
         <Card.Body>
            <form className="add-variant" onSubmit={onSubmit}>
            <div className="row">
               <div className="col-lg-6 mb-2">
                  <div className="form-group mb-3">
                     <label className="text-label">Category*</label>
                     <Select
                     value={formData.category}
                     name="category"
                     options={categoriesOptions}
                     onChange={(e)=> setFormData({...formData, category: e})}
                  />
                  </div>
               </div>
               <div className="col-lg-12 mb-2">
                  <div className="form-group mb-3">
                     <label className="text-label">Variant*</label>
                     <div className="input-group">
                        <InputTags
                           style={{fontSize: '16px'}}
                           values={tags}
                           placeholder='Values'
                           onTags={(value) => setTags(value.values)}
                        />
                        <button
                           className="btn btn-secondary light generate"
                           type="button"
                           data-testid="button-clearAll"
                           disabled={!tags.length}
                           onClick={() => generateVariant()}
                        >
                           Generate
                        </button>
                     </div>
                  </div>
               </div>

               {!!formData.variant?.length && formData.variant?.map((item, itemIndex)=>(
                  <Col md={12} className='mb-3' key={itemIndex}>
                     <Row style={{boxShadow: '0 0 2px #dedede', padding: '2rem 0'}}>
                        <Col lg={6} md={6} className='mb-3'>
                           <div className="form-group">
                              <label className="text-label">Variant Type</label>
                              <h3>{item?.type?.name_en}</h3>
                           </div>
                        </Col>
                        <Col md={6} className='mb-3'>
                           <label>Arabic Name*</label>
                           <input
                              type="text"
                              name="ar"
                              className="form-control"
                              placeholder="Arabic Name"
                              required
                              pattern="[\u0600-\u06FF\s]+"
                              value={item.type?.name_ar}
                              onChange={(e)=> {
                                 let update = formData.variant?.map((res, index)=>{
                                    if(index === itemIndex){
                                       return{
                                          ...res,
                                          type: {
                                             ...res.type,
                                             name_ar: e.target.value
                                          }
                                       }
                                    } else {
                                       return res
                                    }
                                 })
                                 setFormData({...formData, variant: update})
                              }}
                           />
                        </Col>
                        <Col md={6}>
                           <label className="text-label">Types by English*</label>
                        </Col>
                        <Col md={6}>
                           <label className="text-label">Types by Arabic*</label>
                        </Col>
                        {item?.values?.map((val,ind)=>{
                           return <>
                              <Col lg={6} md={12}>
                              <div className='form-group'>
                                 <div className="input-group">
                                    <input
                                       type="text"
                                       name="ar"
                                       className="form-control"
                                       placeholder="English"
                                       required
                                       pattern="[A-Za-z]+"
                                       value={val?.value_en}
                                       onChange={(e)=> {
                                          let update = formData.variant?.map((res, index)=>{
                                             if(index === itemIndex){
                                                return{
                                                   ...res,
                                                   values: res.values?.map((valType, valTypeIndex)=>{
                                                      if(valTypeIndex === ind){
                                                         return {
                                                            ...valType,
                                                            value_en: e.target.value
                                                         }
                                                      } else {
                                                         return valType
                                                      }
                                                   })
                                                }
                                             } else {
                                                return res
                                             }
                                          })
                                          setFormData({...formData, variant: update})
                                       }}
                                    />
                                 </div>
                              </div>
                              </Col>
                              <Col lg={5} md={12}>
                                 <div className='form-group'>
                                    <div className="input-group">
                                       <input
                                          type="text"
                                          name="ar"
                                          className="form-control"
                                          placeholder="Arabic Name"
                                          required
                                          pattern="[\u0600-\u06FF\s]+"
                                          value={val?.value_ar}
                                          onChange={(e)=> {
                                             let update = formData.variant?.map((res, index)=>{
                                                if(index === itemIndex){
                                                   return{
                                                      ...res,
                                                      values: res.values?.map((valType, valTypeIndex)=>{
                                                         if(valTypeIndex === ind){
                                                            return {
                                                               ...valType,
                                                               value_ar: e.target.value
                                                            }
                                                         } else {
                                                            return valType
                                                         }
                                                      })
                                                   }
                                                } else {
                                                   return res
                                                }
                                             })
                                             setFormData({...formData, variant: update})
                                          }}
                                       />
                                    </div>
                                 </div>
                              </Col>
                              {ind > 0 && <Col md={1}>
                                 <button type='button' 
                                    style={{
                                       height: 'fit-content',
                                       padding: '8px 12px', backgroundColor: 'var(--danger)',
                                       color: '#fff', border: 'none', borderRadius: '8px'
                                    }}
                                    onClick={()=>{
                                       let update = formData.variant?.map((res, index)=>{
                                          if(index === itemIndex){
                                             let valuesUpdate = res.values?.filter((_, valuInd)=> valuInd !== ind)
                                             return{
                                                ...res,
                                                values: valuesUpdate
                                             }
                                          } else {
                                             return res
                                          }
                                       })
                                       setFormData({...formData, variant: update})
                                    }}
                                 >X</button>
                              </Col>}
                              {ind === item?.values?.length-1 && <Col md={12} className='justify-content-end d-flex'>
                                 <button 
                                    className="border-0"
                                    style={{
                                       background:'none',
                                       fontSize: '15px',
                                       color: '#0909cc'
                                    }}
                                    type='button'
                                    onClick={()=>{
                                       let update = formData.variant?.map((res, index)=>{
                                          if(index === itemIndex){
                                             let valuesUpdate = res.values
                                             valuesUpdate.push({
                                                value_ar: '',
                                                value_en: '',
                                             })
                                             return{
                                                ...res,
                                                values: valuesUpdate
                                             }
                                          } else {
                                             return res
                                          }
                                       })
                                       setFormData({...formData, variant: update})
                                    }}
                                 >
                                    Add New Value
                                 </button>
                              </Col>}
                           </>
                        })}
                     </Row>
                  </Col>)
               )}
            </div>
            <div className="d-flex justify-content-end">
               <Button variant="primary" type="submit">Submit</Button>
            </div>
            </form>
         </Card.Body>
      </Card>
    )
}
export default AddVariant;