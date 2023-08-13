
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select'
import { InputTags } from "react-bootstrap-tagsinput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CategoriesService from "../../../../services/CategoriesService";
import VariantService from "../../../../services/VariantService";

const Variant = ()=>{
   const [formData, setFormData] = useState({
      category: '', variant: []
   })
   let variant_id = window?.location?.pathname?.split('/variant/add-variant/')[1]
   const [ categoriesOptions, setCategoriesOptions] = useState()
   const [ tags, setTags] = useState([])
   const [ isAdd, setIsAdd] = useState(true)
   const [ id, setId] = useState(null)
   const categoriesService = new CategoriesService()
   const variantService = new VariantService()
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
         variantService?.getVariant(formData?.category?.id)?.then(res=>{
            if(res?.status === 200){
               if(res.data?.meta.data?.length > 0){
                  let tags = res.data?.meta.data?.map(tag=> tag.name_en)
                  setIsAdd(false)
                  setTags([...tags])
                  setFormData({...formData, variant: res.data?.meta?.data})
               } else{
                  setIsAdd(true)
               }
            }
         })
      }
   },[formData?.category])

   useEffect(()=>{
      if(!!formData?.category || !!variant_id){
         variantService?.getVariant(Number(variant_id))?.then(res=>{
            setId(Number(variant_id))
            if(res?.status === 200){
               if(res.data?.meta.data?.length > 0){
                  let tags = res.data?.meta.data?.map(tag=> tag.name_en)
                  setIsAdd(false)
                  setTags([...tags])
                  setFormData({category: categoriesOptions?.filter(opt=> opt.id === Number(variant_id))[0], variant: res.data?.meta?.data})
               } else{
                  setIsAdd(true)
               }
            }
         })
      }
   },[window.location.pathname])


   let checkTypeVariant = (val) => {
      if(val === 'color' || val === 'colour' || val === 'coulor'){
         return true
      }
      return false
   }

   const generateVariant = () =>{
      let filterFormDataVariant = formData?.variant?.map(item => item.name_en)
      let filterFound = tags.filter(item => filterFormDataVariant.includes(item));
      let filterNotFound = tags.filter(item => !filterFormDataVariant.includes(item));

      let filter = formData?.variant?.filter(res=> filterFound?.includes(res.name_en))
      
      let update = filterNotFound?.map((tag)=>{
         return {
            name_en: tag,
            name_ar: '',
            variant_values: [
               {
                  value_ar: "",
                  value_en: checkTypeVariant(tag) ? '#dfdfdf' : ''
                }
            ]
         }
      })
      
      setFormData({...formData, variant: [...filter, ...update]})
   }

   const onSubmit = (e) =>{
      e.preventDefault()
      if((!formData?.category && isAdd) || formData?.variant?.length === 0 || formData.variant?.filter(res=> res.values?.length === 0)?.length > 0){
         toast.error('Complete All Phases')
         return
      }
      let data = {
         variant: formData?.variant?.map((variant) => {
            return{
               name_en: variant.name_en,
               name_ar: variant.name_ar,
               variant_values : variant.variant_values?.map(val=>{
                  return{
                     value_ar: val.value_ar,
                     value_en: val.value_en,
                  }
               })
            }
         })
      }
      if(isAdd) data['category_id']= formData?.category?.value

      if(isAdd){
         variantService?.addVariant(data).then(res=> {
            if(res?.status === 201){
               toast.success('Variant Added Successfully')
               // setFormData({category: '', variant: []})
               navigate('/variant')
            }
         })
      } else {
         variantService?.updateVariant(Number(variant_id), data)?.then(res => {
            if(res?.status === 200){
               toast.success('Variant Updated Successfully')
               // setFormData({category: '', variant: []})
               navigate('/variant')
            }
         })
      }
      
   }

   return(
      <Card>
         <Card.Body>
            <form className="add-variant" onSubmit={onSubmit}>
            <div className="row">
               {!variant_id && <div className="col-lg-6 mb-2">
                  <div className="form-group mb-3">
                     <label className="text-label">Category</label>
                     <Select
                     value={formData.category}
                     name="category"
                     options={categoriesOptions}
                     onChange={(e)=> {
                        setFormData({variant: [], category: e})
                        setTags([])
                     }}
                  />
                  </div>
               </div>}
               <div className="col-lg-12 mb-2">
                  <div className="form-group mb-3">
                     <label className="text-label">Variant</label>
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

               {!!formData.variant?.length && formData.variant?.map((item, itemIndex)=>{
                  let typeVal = (item?.name_en === 'color' || item?.name_en === 'colour' || item?.name_en === 'coulor')
                  return <Col md={12} className='mb-3' key={itemIndex}>
                     <Row style={{boxShadow: '0 0 2px #dedede', padding: '2rem 0'}}>
                        <Col lg={6} md={6} className='mb-3'>
                           <div className="form-group">
                              <label className="text-label">Variant Type</label>
                              <h3>{item?.name_en}</h3>
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
                                 let update = formData.variant?.map((res, index)=>{
                                    if(index === itemIndex){
                                       return{
                                          ...res,
                                          name_ar: e.target.value
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
                           <label className="text-label">Types by English</label>
                        </Col>
                        {!typeVal && <Col md={6}>
                           <label className="text-label">Types by Arabic</label>
                        </Col>}
                        {item?.variant_values?.map((val,ind)=>{
                           return <>
                              <Col lg={typeVal ? 11 : 6} md={12}>
                              <div className='form-group'>
                                 <div className="input-group">
                                    <input
                                       type={typeVal ? "color" : 'text'}
                                       name="en"
                                       className="form-control"
                                       placeholder="English"
                                       required
                                       // pattern='/^[A-Za-z0-9 ]+$/'
                                       value={val?.value_en}
                                       onChange={(e)=> {
                                          let update = formData.variant?.map((res, index)=>{
                                             if(index === itemIndex){
                                                return{
                                                   ...res,
                                                   variant_values: res.variant_values?.map((valType, valTypeIndex)=>{
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
                                    {typeVal && <input
                                       type="text"
                                       name="en"
                                       className="form-control"
                                       placeholder="e.g. #RRGGBB"
                                       pattern="#[0-9a-fA-F]{6}"
                                       required
                                       value={val?.value_en}
                                       onChange={(e)=> {
                                          let update = formData.variant?.map((res, index)=>{
                                             if(index === itemIndex){
                                                return{
                                                   ...res,
                                                   variant_values: res.variant_values?.map((valType, valTypeIndex)=>{
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
                                    />}
                                 </div>
                              </div>
                              </Col>
                              {!typeVal && <Col lg={5} md={12}>
                                 <div className='form-group'>
                                    <div className="input-group">
                                       <input
                                          type="text"
                                          name="ar"
                                          className="form-control"
                                          placeholder="Arabic Name"
                                          required
                                          // pattern="[\u0600-\u06FF\s]+"
                                          value={val?.value_ar}
                                          onChange={(e)=> {
                                             let update = formData.variant?.map((res, index)=>{
                                                if(index === itemIndex){
                                                   return{
                                                      ...res,
                                                      variant_values: res.variant_values?.map((valType, valTypeIndex)=>{
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
                              </Col>}
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
                                             let valuesUpdate = res.variant_values?.filter((_, valuInd)=> valuInd !== ind)
                                             return{
                                                ...res,
                                                variant_values: valuesUpdate
                                             }
                                          } else {
                                             return res
                                          }
                                       })
                                       setFormData({...formData, variant: update})
                                    }}
                                 >X</button>
                              </Col>}
                              {ind === item?.variant_values?.length-1 && <Col md={12} className='justify-content-end d-flex'>
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
                                             let valuesUpdate = res.variant_values
                                             valuesUpdate.push({
                                                value_ar: '',
                                                value_en: checkTypeVariant(item.name_en) ? '#dedede' : '',
                                             })
                                             return{
                                                ...res,
                                                variant_values: valuesUpdate
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
                  </Col>}
               )}
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
export default Variant;