import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import {AvField, AvForm} from "availity-reactstrap-validation";
import uploadImg from '../../../../images/upload-img.webp';
import AdminService from "../../../../services/AdminService";
import CategoriesService from "../../../../services/CategoriesService";
import '../style.scss'
import { toast } from "react-toastify";
import BaseService from "../../../../services/BaseService";
import SubCategoriesService from "../../../../services/SubCategoriesService";
import ProductsService from "../../../../services/ProductsService";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../common/ConfirmModal";
import BrandsService from "../../../../services/BrandsService";

const AddProducts = () => {
    const [product, setProduct]= useState({
        name_en: '',
        name_ar: '',
        amount: '',
        description_en: '',
        description_ar: '',
        bestSeller: false,
        newIn: false,
        offer: false,
        offerPrice: '',
        price: '',
        offer_price: '',
        category: '',
        weight: '',
        sub_category: '',
        code: '',
        brand: '',
        variant: [],
        images: [{src: ''} ,{src: ''} ,{src: ''} ,{src: ''} ,{src: ''}]
    })
    const [errors, setErrors] = useState({
        desc_ar: false,
        desc_en: false,
        images: 0
    })
    const [confirm, setConfirm]= useState(false)
    const [id, setId]= useState(null)
    const [loading, setLoadning]= useState(false)
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [subCategoriesOptions, setSubCategoriesOptions] = useState([])
    const [variant, setVariant] = useState([])
    const [files, setFiles] = useState([{},{},{},{},{}])
    const navigate = useNavigate()
    const categoriesService = new CategoriesService()
    const subCategoriesService = new SubCategoriesService()
    const adminService = new AdminService()
    const productsService = new ProductsService()
    const brandsService = new BrandsService()

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
        brandsService?.getList().then(res=>{
            if(res.data?.status === 200){
               let categories =  res.data?.meta?.data?.map(item=>{
                  return{
                     id: item?.id,
                     value: item?.id,
                     label: item.name_en
                  }
               })
               setBrandOptions(categories)
            }
        })
    },[])

    useEffect(()=>{
        if(!!product?.category){
           adminService?.getVariant(product?.category?.id)?.then(res=>{
              if(res?.data?.status === 200){
                setVariant(res.data?.meta.data)
              }
           })

           subCategoriesService?.getListForCategory(product?.category?.id).then(res=>{
                if(res.data?.status === 200){
                    let subCategories =  res.data?.meta?.data?.map(item=>{
                        return{
                            id: item?.id,
                            value: item?.id,
                            label: item.name_en
                        }
                    })
                    setSubCategoriesOptions(subCategories)
                }
            })
        }
    },[product?.category])

    useEffect(()=>{
        let prod_id = window.location.pathname.split('/products/add-products/')[1]
        setId(Number(prod_id))

        if(!!prod_id){
            productsService?.getProduct(prod_id)?.then(res=>{
                let response = res.data.data
                if(res.data?.status === 200){
                    
                    let data= {
                        ...response,
                        category: {
                            ...response.category,
                            id: response?.category_id,
                            value: response?.category_id,
                            label: response?.category?.name_en
                        },
                        images: product?.images?.map((_,index)=> {
                            if(!!response.images[index]?.url){
                                return {
                                    src: response.images[index]?.url
                                }
                            } else {
                                return {
                                    src: ''
                                }
                            }
                            
                        }),
                        sub_category: response?.sub_category_id ? subCategoriesOptions?.filter(opt=> opt.value ===response?.sub_category_id)[0] : '',
                        brand: response?.brand_id ? subCategoriesOptions?.filter(opt=> opt.value ===response?.brand_id)[0] : '',
                        variant: response?.variant?.map(item=>{
                            return{
                                name_ar: item.variant?.name_ar,
                                name_en: item.variant?.name_en,
                                variant_id: item.variant?.id,
                                variant_value_id: item?.variant_value?.id,
                                variant_values: {...item.variant_value}
                            }
                        })
                    }
                    setProduct({...data})
                }
            })
        }
    },[])

    const fileHandler = (e, index) => {
        let filesAll = e.target.files
        const filesData = Object.values(filesAll)
        let update = files?.map((file,updateIndex) => {
            if(updateIndex === index){
                return e.target.files[0]
            } else{
                return file
            }
        })
        
        new BaseService().postUpload(filesData[0]).then(res=>{
            if(res.data.status){
                let updateImages = product?.images.map((item, ind)=>{
                    if(ind === index){
                        return {src: res.data.url}
                    } else {
                        return {...item}
                    }
                } )
                setProduct({...product, images: updateImages})
                setFiles([...update])
            }
        })
		setTimeout(function(){
			var src = document.getElementById(`saveImageFile${index}`)?.getAttribute("src");
            
			setProduct({...product, images: update})
		}, 200);
    }

    const handlerText = (e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const submit = () =>{
        if(!product.description_ar || !product.description_en){
            setErrors({
                desc_ar: !product.desc_ar,
                desc_en: !product.desc_en
            })
            return
        }
        if(product?.images?.filter(res=> !!res?.src)?.length === 0){
            toast.error('Upload Images')
            return
        }
        if(product?.variant?.length !== variant?.length){
            toast.error('Selected Variant')
            return
        }
        setLoadning(true)
        let data ={
            name_en: product.name_en,
            name_ar: product.name_ar,
            price: Number(product.price),
            code: product.code,
            category_id: product.category?.value,
            images: product?.images?.filter(res=> !!res?.src)?.map(item=> item?.src),
            variant: product.variant?.map(res=>{
                return{
                    variant_value_id: res?.variant_value_id,
                    variant_id: res?.variant_id,
                }
            }),
            amount: Number(product.amount),
            description_en: product.description_en,
            description_ar: product.description_ar,
            bestSeller: product.bestSeller,
            newIn: product.newIn,
            offer: product.offer,
            offerPrice: Number(product.offerPrice)
        }
        if(!!product.sub_category) data['sub_category_id']= product?.sub_category?.value
        if(!!product.brand) data['brand_id']= product?.brand?.value

        if(!!id){
            productsService?.update(id, data)?.then(res=>{
                if(res.data?.status === 200){
                    toast.success('Product Updated Successfully')
                    // navigate('/products')
                    setConfirm(true)
                    setProduct({...product, images: [{src: ''} ,{src: ''} ,{src: ''} ,{src: ''} ,{src: ''}]})
                }
                setLoadning(false)
            })
        } else {
            productsService?.create(data)?.then(res=>{
                if(res.data?.status === 201){
                    toast.success('Product Added Successfully')
                    navigate('/products')
                }
                setLoadning(false)
            })
        }
        
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
        <AvForm onValidSubmit={submit} className='add-product'>
            <Row>
                <Col md={6} className="mb-3">
                        <AvField
                                label='English Title*'
                                type='text'
                                placeholder='English'
                                bsSize="lg"
                                name='name_en'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: '/^[A-Za-z0-9 ]+$/',
                                        errorMessage: `English format is invalid`
                                    }
                                }}
                                value={product.name_en}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label='Arabic Title'
                                type='text'
                                placeholder='الاسم'
                                value={product.name_ar}
                                name='name_ar'
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: '/^[\u0621-\u064A0-9 ]+$/',
                                        errorMessage: `Arabic format is invalid`
                                    }
                                }}
                                onChange={(e) => handlerText(e)}
                                />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">English Description</label>
                        <textarea  
                            name="description_en" 
                            style={{
                                minHeight: '80px',
                                maxHeight: '150px',
                                height: '150px'
                            }}
                            className="form-control"
                            required
                            placeholder="Enter Description"
                            value={product.description_en}
                            onChange={(e)=> {
                                setErrors({
                                    ...errors,
                                    desc_en: false
                                })
                                handlerText(e)
                            }}
                            rows="6" >
                        </textarea>
                        {errors['desc_en'] && <p className="text-danger m-0" style={{fontSize: '12.8px'}}>This Field is required</p>}
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Arabic Description</label>
                        <textarea  
                            name="description_ar" 
                            style={{
                                minHeight: '80px',
                                maxHeight: '150px',
                                height: '150px'
                            }}
                            className="form-control"
                            placeholder="Enter Description"
                            value={product.description_ar}
                            onChange={(e)=> {
                                setErrors({
                                    ...errors,
                                    desc_ar: false
                                })
                                handlerText(e)
                            }}
                            rows="6" >
                        </textarea>
                        {errors['desc_ar'] && <p className="text-danger m-0" style={{fontSize: '12.8px'}}>This Field is required</p>}
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Category*</label>
                        <Select
                            value={product.category}
                            name="category"
                            options={categoriesOptions}
                            onChange={(e)=> setProduct({...product, category: e})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">SubCategory</label>
                        <Select
                            value={product.sub_category}
                            name="sub_category"
                            options={subCategoriesOptions}
                            onChange={(e)=> setProduct({...product, sub_category: e})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label='Code*'
                                type='text'
                                placeholder='Code'
                                bsSize="lg"
                                name='code'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: '/^[A-Za-z0-9 ]+$/',
                                        errorMessage: `Code format is invalid`
                                    }
                                }}
                                value={product.code}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">Brand</label>
                        <Select
                            value={product.brand}
                            name="brand"
                            options={brandOptions}
                            onChange={(e)=> setProduct({...product, brand: e})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label='Price*'
                                type='number'
                                placeholder='Price'
                                bsSize="lg"
                                name='price'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: "^[0-9]+$",
                                        errorMessage: `English format is invalid`
                                    }
                                }}
                                value={product.price}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                    <AvField
                                label='Quantity*'
                                type='number'
                                placeholder='Quantity'
                                bsSize="lg"
                                name='amount'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: "^[0-9]+$",
                                        errorMessage: `English format is invalid`
                                    }
                                }}
                                value={product.amount}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label='Weight*'
                                type='number'
                                placeholder='Weight'
                                bsSize="lg"
                                name='weight'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: "^[0-9]+$",
                                        errorMessage: `Format is invalid`
                                    }
                                }}
                                value={product.weight}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label='Offer Price'
                                type='number'
                                placeholder='Offer Price'
                                bsSize="lg"
                                name='offer_price'
                                // validate={{
                                //     required: {
                                //         value: true,
                                //         errorMessage: 'This Field is required'
                                //     },
                                //     pattern: {
                                //         value: "^[0-9]+$",
                                //         errorMessage: `English format is invalid`
                                //     }
                                // }}
                                value={product.offer_price}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={2} className="mb-3">
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
                <Col md={2} className="mb-3">
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
                <Col md={2} className="mb-3">
                        <label className="text-label">Offer</label>
                        <Form.Check
                        type="switch"
                        id={`offer`}
                        checked={product.offer}
                        onChange={(e)=> setProduct({...product, offer: e.target.checked})}
                      />
                </Col>
               
                {variant?.length > 0 && variant?.map((item, index)=>{
                    let findInd = product?.variant?.findIndex(res=> res.name_en === item.name_en)
                   
                    return<Col md={6} className="mb-3">
                    <label className="text-label">{item.name_en}</label>
                    <div className="d-grid mt-2" style={{gridTemplateColumns: 'auto auto auto auto'}}>
                        {item?.variant_values?.map(value=>{
                            return <label for={value?.value_en} className='m-0 mr-3'>
                                <input 
                                    type="radio" 
                                    id={value?.value_en} 
                                    name={item.name_en} 
                                    value={value?.value_en}
                                    checked={product.variant[findInd]?.variant_values?.value_en === value?.value_en}
                                    className='mr-2'
                                    required
                                    onChange={()=> {
                                        let var_value = {
                                            name_en: item.name_en,
                                            name_ar: item.name_ar,
                                            variant_value_id: value.id,
                                            variant_id: item.id,
                                            variant_values: {
                                                ...value
                                            }
                                        }
                                        let isExist = product?.variant?.filter(res=> res.variant_id === item.id)
                                        if(!isExist?.length){
                                            setProduct({...product, variant: [...product.variant, var_value]})
                                        } else {
                                            let update = product?.variant?.map(res=>{
                                                if(res.variant_id === item.id){
                                                    return var_value
                                                } else {
                                                    return res
                                                }
                                            })
                                            setProduct({...product, variant: [...update]})
                                        }
                                        // if(product.variant?.length === 0){
                                        //     setProduct({...product, variant: [var_value]})
                                        // } else {
                                            
                                        // }
                                    }}
                                />
                                {value?.value_en}
                            </label>
                        })}
                    </div>
            </Col>
                })}
            </Row>

            <Row>
                {product?.images?.map((data, index)=>{
                    return <Col md={3} className='mb-3 mt-3' key={index}>
                        <label className="text-label" style={{marginLeft: '8px'}}>Image {index+1}</label>
                        <div className="image-placeholder">	
                            <div className="avatar-edit">
                                <input type="file" onChange={(e) => fileHandler(e,index)} id={`imageUpload${index}`} /> 					
                                <label htmlFor={`imageUpload${index}`}  name=''></label>
                            </div>
                            <button className="delete-img" type="button" onClick={()=> deleteImg(index)}>
                                <i className='la la-trash'></i>
                            </button>
                            <div className="avatar-preview">
                                {!!data.src ? <div id={`imagePreview${index}`}>
                                    <img id={`saveImageFile${index}`} src={data?.src} alt='icon' />
                                </div> : <div id={`imagePreview${index}`}>
                                    {files[index]?.name && <img id={`saveImageFile${index}`} src={URL.createObjectURL(files[index])} alt='icon' />}
                                    {!files[index]?.name && <img id={`saveImageFile${index}`} src={uploadImg} alt='icon'
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                        }}
                                    />}
                                </div>}
                            </div>
                        </div>
                </Col>
                })}
            </Row>
            <div className="d-flex justify-content-end">
            <Button 
                variant="primary"
                loading={loading}
                type="submit">Submit</Button>
            </div>
        </AvForm>
        {confirm && <ConfirmModal 
            open={confirm}
            title='Confirm Added'
            body='You can add another product by change some information'
            button='Add More Same Product'
            onCloseModal={()=> navigate('/products')}
            submitButton={()=> setConfirm(false)}
        />}
    </Card>
}

export default AddProducts;