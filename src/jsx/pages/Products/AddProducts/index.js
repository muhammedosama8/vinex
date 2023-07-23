import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from 'react-select';
import uploadImg from '../../../../images/upload-img.webp';
import '../style.scss'

const AddProducts = () => {
    const [product, setProduct]= useState({
        ar: '',
        en: '',
        price: '',
        quantity: '',
        category: [],
        desc_ar: '',
        desc_en: '',
        images: [{src: ''} ,{src: ''} ,{src: ''} ,{src: ''} ,{src: ''}]
    })
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [files, setFiles] = useState([{},{},{},{},{}])

    useEffect(()=>{
        setCategoriesOptions([
            {value: 1, label: 'Pants'},
            {value: 2, label: 'T-Shirts'},
        ])
    },[])

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
            <div className="row">
            <div className="col-lg-6 mb-3">
                    <label className="text-label">English Name*</label>
                    <input
                        type="text"
                        name="en"
                        className="form-control"
                        placeholder="English"
                        required
                        value={product.en}
                        onChange={(e)=> handlerText(e)}
                    />
            </div>
            <div className="col-lg-6 mb-3">
                    <label className="text-label">Arabic Name</label>
                    <input
                        type="text"
                        name="ar"
                        className="form-control"
                        placeholder="Arabic"
                        required
                        value={product.ar}
                        onChange={(e)=> handlerText(e)}
                    />
            </div>
            <div className="col-lg-6 mb-3">
                    <label className="text-label">Category</label>
                    <Select
                        value={product.category}
                        isMulti
                        name="category"
                        options={categoriesOptions}
                        onChange={(e)=> setProduct({...product, category: e})}
                    />
            </div>
            <div className="col-lg-6 mb-3">
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
            </div>
            <div className="col-lg-6 mb-2">
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
            </div>
            <div className="col-lg-12 mb-3">
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
            </div>
            <div className="col-lg-12 mb-3">
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
            </div>

            {product?.images?.map((data, index)=>{
                    return <Col md={3} className='mb-3'>
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
                
            </div>
            <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Submit</Button>
            </div>
        </form>
    </Card>
}

export default AddProducts;