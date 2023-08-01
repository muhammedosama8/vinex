import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import uploadImg from '../../../../images/upload-img.webp';
import AdminService from "../../../../services/AdminService";
import CategoriesService from "../../../../services/CategoriesService";
import '../style.scss'

const AddProducts = () => {
    const [product, setProduct]= useState({
        ar: '',
        en: '',
        price: '',
        offer_price: '',
        quantity: '',
        category: '',
        desc_ar: '',
        desc_en: '',
        bestSeller: false,
        newIn: false,
        images: [{src: ''} ,{src: ''} ,{src: ''} ,{src: ''} ,{src: ''}]
    })
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [files, setFiles] = useState([{},{},{},{},{}])
    const categoriesService = new CategoriesService()
    const adminService = new AdminService()

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
    },[])

    useEffect(()=>{
        if(!!product?.category){
           adminService?.getVariant(product?.category?.id)?.then(res=>{
              if(res?.status === 200){
                console.log(res.data.data)
              }
           })
        }
     },[product?.category])

    const fileHandler = (e, index) => {
        let update = files?.map((file,updateIndex) => {
            if(updateIndex === index){
                return e.target.files[0]
            } else{
                return file
            }
        })
        setFiles([...update])
		setTimeout(function(){
			var src = document.getElementById(`saveImageFile${index}`)?.getAttribute("src");
            let update = product?.images.map((item, ind)=>{
                if(ind === index){
                    return {src: src}
                } else {
                    return {...item}
                }
            } )
			setProduct({...product, images: update})
		}, 200);
    }

    const handlerText = (e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const submit = (e) =>{
        e.preventDefault()
    }

    const deleteImg = (index) =>{
        let updateFiles = files?.map((file,updateIndex) => {
            if(updateIndex === index){
                return {}
            } else{
                return file
            }
        })
        setFiles([...updateFiles])
        let update = product?.images.map((item, ind)=>{
            if(ind === index){
                    return {
                        ...item,
                        src: '',
                    }
                } else {
                    return {...item}
                }
            } )
		setProduct({...product, images: update})
    }

    return <Card className="p-4">
        <form onSubmit={submit} className='add-product'>
            <Row>
                <Col md={6} className="mb-3">
                        <label className="text-label">English Title*</label>
                        <input
                            type="text"
                            name="en"
                            className="form-control"
                            placeholder="English"
                            required
                            value={product.en}
                            onChange={(e)=> handlerText(e)}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Arabic Title</label>
                        <input
                            type="text"
                            name="ar"
                            className="form-control"
                            placeholder="Arabic"
                            required
                            value={product.ar}
                            onChange={(e)=> handlerText(e)}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">English Description</label>
                        <textarea  
                            name="desc_en" 
                            style={{
                                minHeight: '80px',
                                maxHeight: '150px',
                                height: '150px'
                            }}
                            className="form-control"
                            placeholder="Enter Description"
                            value={product.desc_en}
                            onChange={(e)=> handlerText(e)}
                            rows="6" >
                        </textarea>
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Arabic Description</label>
                        <textarea  
                            name="desc_ar" 
                            style={{
                                minHeight: '80px',
                                maxHeight: '150px',
                                height: '150px'
                            }}
                            className="form-control"
                            placeholder="Enter Description"
                            value={product.desc_ar}
                            onChange={(e)=> handlerText(e)}
                            rows="6" >
                        </textarea>
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Category</label>
                        <Select
                            value={product.category}
                            // isMulti
                            name="category"
                            options={categoriesOptions}
                            onChange={(e)=> setProduct({...product, category: e})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Price*</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Price"
                            required
                            value={product.price}
                            onChange={(e)=> handlerText(e)}
                        />
                </Col>
                <Col md={6} className="mb-3">
                    <div className="form-group mb-3">
                        <label className="text-label">Quantity*</label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder="Quantity"
                            required
                            value={product.quantity}
                            onChange={(e)=> handlerText(e)}
                        />
                    </div>
                </Col>
                <Col md={3} className="mb-3">
                    {/* <div className="form-group mb-3 d-flex" style={{gap: '24px'}}> */}
                        <label className="text-label">Best Seller</label>
                        <Form.Check
                        type="switch"
                        id={`bestSeller`}
                        checked={product.bestSeller}
                        onChange={(e)=> setProduct({...product, bestSeller: e.target.checked})}
                      />
                    {/* </div> */}
                </Col>
                <Col md={3} className="mb-3">
                    {/* <div className="form-group mb-3 d-flex" style={{gap: '24px'}}> */}
                        <label className="text-label">New In</label>
                        <Form.Check
                        type="switch"
                        id={`newIn`}
                        checked={product.newIn}
                        onChange={(e)=> setProduct({...product, newIn: e.target.checked})}
                      />
                    {/* </div> */}
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Offer Price</label>
                        <input
                            type="number"
                            name="offer_price"
                            className="form-control"
                            placeholder="Offer Price"
                            required
                            value={product.offer_price}
                            onChange={(e)=> handlerText(e)}
                        />
                </Col>
            </Row>
            <Row>
                {product?.images?.map((data, index)=>{
                    return <Col md={3} className='mb-3 mt-3' key={index}>
                        <h4 style={{marginLeft: '8px'}}>Image {index+1}</h4>
                        <div className="image-placeholder">	
                            <div className="avatar-edit">
                                <input type="file" onChange={(e) => fileHandler(e,index)} id={`imageUpload${index}`} /> 					
                                <label htmlFor={`imageUpload${index}`}  name=''></label>
                            </div>
                            <button className="delete-img" type="button" onClick={()=> deleteImg(index)}>
                                <i className='la la-trash'></i>
                            </button>
                            <div className="avatar-preview">
                                <div id={`imagePreview${index}`}>
                                {files[index]?.name && <img id={`saveImageFile${index}`} src={URL.createObjectURL(files[index])} alt='icon' />}
                                {!files[index]?.name && <img id={`saveImageFile${index}`} src={uploadImg} alt='icon'
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                    }}
                                />}
                                </div>
                            </div>
                        </div>
                </Col>
                })}
            </Row>
            <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Submit</Button>
            </div>
        </form>
    </Card>
}

export default AddProducts;