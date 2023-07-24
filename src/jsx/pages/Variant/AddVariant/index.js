import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from 'react-select'
import { InputTags } from "react-bootstrap-tagsinput";


const AddVariant = ()=>{
   const [formData, setFormData] = useState({
      category: '',
      products: '',
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
            values: tag?.values > 0 ? tag?.values : [
               {name: '', price: ''}
            ]
         }
      })
      setFormData({...formData, variant: update})
   }

   const onSubmit = () =>{
      console.log(formData)
   }
    return(
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
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Product*</label>
                  <Select
                    value={formData.products}
                    isMulti
                    name="category"
                    options={productsOptions}
                    onChange={(e)=> setFormData({...formData, products: e})}
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
            {console.log(formData)}
            {!!formData.variant?.length && formData.variant?.map((item, itemIndex)=>(
               <Col md={12} className='mb-3' key={itemIndex}>
                  <Row>
                     <Col lg={3} md={3}>
                        <div className="form-group">
                           <label className="text-label">Variant Type</label>
                           <h3>{item?.type}</h3>
                        </div>
                     </Col>
                     {item?.values?.map((res, index)=>{
                        return <React.Fragment key={index}>
                           {index > 0 && <Col lg={3} md={3}></Col>}
                           <Col lg={4} md={4}>
                              <div className="form-group">
                                 <label className="text-label">Name*</label>
                                 <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                    value={res.name}
                                    // onChange={(e)=> handlerText(e)}
                                 />
                              </div>
                           </Col>
                           <Col lg={4} md={4}>
                              <div className="form-group">
                                 <label className="text-label">Price*</label>
                                 <input
                                    type="number"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                    value={res.price}
                                    // onChange={(e)=> handlerText(e)}
                                 />
                              </div>
                           </Col>
                           <Col md={1} className='d-flex align-items-center mt-2'>
                              {index > 0 && <button 
                                    className="btn btn-danger" 
                                    style={{padding: '5px 10px'}}
                                    onClick={()=>{
                                       let update= formData?.variant?.map((val, valIndex)=>{
                                          if(valIndex === itemIndex){
                                             let filter= val.values?.filter((_,valueIndex)=> valueIndex !== index)
                                             return {
                                                ...val,
                                                values: filter
                                             }
                                          } else{
                                             return val
                                          }
                                       })
                                       setFormData({...formData, variant: update})
                                    }}
                                 >
                                 <i className="la la-times"></i>
                              </button>}
                           </Col>
                        </React.Fragment>
                     })}
                     <Col md={12} className='d-flex justify-content-end'>
                        <button 
                           className="border-0" 
                           style={{color: 'blue', background:'none', marginRight: '6rem'}}
                           onClick={()=> {
                              let update = formData?.variant?.map((val, valIndex)=>{
                                 if(valIndex === itemIndex){
                                    let values = [...val.values, {name: '', price: ''}]
                                    return {
                                       ...val,
                                       values: values
                                    }
                                 } else {
                                    return {...val}
                                 }
                              })
                              setFormData({...formData, variant: update})
                           }}
                        > 
                           Add New Value
                        </button>
                     </Col>
                  </Row>
               </Col>)
            )}
         </div>
         <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Submit</Button>
         </div>
         {console.log(formData)}
      </form>
    )
}
export default AddVariant;