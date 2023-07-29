import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from 'react-select'
import { InputTags } from "react-bootstrap-tagsinput";
import { toast } from "react-toastify";


const AddVariant = ()=>{
   const [formData, setFormData] = useState({
      category: '',
      variant: []
   })
   const [ categoriesOptions, setCategoriesOptions] = useState()
   const [ productsOptions, setProductsOptions] = useState()
   const [ tags, setTags] = useState([])

   useEffect(()=>{
      setCategoriesOptions([
         {value: 1, label: 'Pants'},
         {value: 2, label: 'T-Shirts'},
      ])
      setProductsOptions([
         {value: 1, label: 'Nike'},
         {value: 2, label: 'Any Thing'},
      ])
   }, [])

   const generateVariant = () =>{
      let update = tags?.map(tag=>{
         return {
            type: tag,
            values: []
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
         category_id: formData?.category?.id,
         variant: formData?.variant
      }
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
                     <Row>
                        <Col lg={3} md={3}>
                           <div className="form-group">
                              <label className="text-label">Variant Type</label>
                              <h3>{item?.type}</h3>
                           </div>
                        </Col>
                        <Col lg={9} md={9}>
                           <div className='form-group'>
                              <label className="text-label">Types*</label>
                              <div className="input-group">
                                    <InputTags
                                       style={{fontSize: '16px'}}
                                       values={item.values}
                                       onTags={(value) => {
                                          let update = formData.variant?.map((res, index)=>{
                                             if(index === itemIndex){
                                                return {
                                                   ...res,
                                                   values: value.values
                                                }
                                             } else{
                                                return res
                                             }
                                          })
                                          setFormData({...formData, variant: update})
                                       }}
                                    />
                              </div>
                           </div>
                        </Col>
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