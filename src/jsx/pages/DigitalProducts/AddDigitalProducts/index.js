import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import {AvField, AvForm} from "availity-reactstrap-validation";
import uploadImg from '../../../../images/upload-img.png';
import CategoriesService from "../../../../services/CategoriesService";
import '../style.scss'
import { toast } from "react-toastify";
import BaseService from "../../../../services/BaseService";
import SubCategoriesService from "../../../../services/SubCategoriesService";
import ProductsService from "../../../../services/ProductsService";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../common/ConfirmModal";
import BrandsService from "../../../../services/BrandsService";
import { loadingToggleAction } from "../../../../store/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../../common/Loader'
import { Translate } from "../../../Enums/Tranlate";

const AddDigitalProducts = () => {
    const [product, setProduct]= useState({
        name_en: '',
        name_ar: '',
        amount: 1,
        description_en: '',
        description_ar: '',
        code: '',
        bestSeller: false,
        newIn: false,
        offer: false,
        offerPrice: '',
        price: '',
        category: '',
        sub_category: '',
        brand: '',
        cost: '',
        dynamic_variant: [],
        serial_number: [''],
        // serial_image: {src: ''},
        images: [{src: ''} ,{src: ''} ,{src: ''} ,{src: ''} ,{src: ''}]
    })
    const [errors, setErrors] = useState({
        desc_ar: false,
        desc_en: false,
        images: 0
    })
    const dispatch = useDispatch()
    const [id, setId]= useState(null)
    const [confirm, setConfirm]= useState(false)
    const [loading, setLoadning]= useState(false)
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [subCategoriesOptions, setSubCategoriesOptions] = useState([])
    const [dynamicVariant, setDynamicVariant] = useState([])
    const [files, setFiles] = useState([{},{},{},{},{}])
    // const [serialFile, setSerialFiles] = useState([{}])
    const navigate = useNavigate()
    const categoriesService = new CategoriesService()
    const subCategoriesService = new SubCategoriesService()
    const productsService = new ProductsService()
    const brandsService = new BrandsService()
    const Auth = useSelector(state=> state.auth)
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        categoriesService.getList().then(res=>{
            if(res?.data?.status === 200){
               let categories =  res.data?.meta?.data?.map(item=>{
                  return{
                     id: item?.id,
                     value: item?.id,
                     label: lang==='en' ? item.name_en : item.name_ar
                  }
               })
               setCategoriesOptions(categories)
            }
        })
        brandsService.getList().then(res=>{
            if(res?.data?.status === 200){
               let categories =  res.data?.meta?.data?.map(item=>{
                  return{
                     id: item?.id,
                     value: item?.id,
                     label: lang==='en' ? item.name_en : item.name_ar
                  }
               })
               setBrandOptions(categories)
            }
        })
    },[lang])

    useEffect(()=>{
        if(!!product?.category){
           subCategoriesService.getListForCategory(product?.category?.id).then(res=>{
                if(res?.data?.status === 200){
                    let subCategories =  res.data?.meta?.data?.map(item=>{
                        return{
                            id: item?.id,
                            value: item?.id,
                            label: lang==='en' ? item.name_en : item.name_ar
                        }
                    })
                    setSubCategoriesOptions(subCategories)
                }
            })

            productsService.getDynamicVariant(product?.category?.value).then(res=>{
                if(res?.status === 200){
                    let data = res.data?.data?.map(item=>{
                        return{
                            ...item,
                            label: lang==='en' ? item.name_en : item.name_ar,
                            value: item.id,
                        }
                    })
                    setDynamicVariant(data)
                }
            })
        }
    },[product?.category])

    useEffect(()=>{
        let prod_id = window.location.pathname.split('/digital-products/add-products/')[1]
        setId(prod_id)
        if(!!prod_id){
            dispatch(loadingToggleAction(true))
            productsService?.getProduct(prod_id)?.then(res=>{
                let response = res.data.data
                if(res?.data?.status === 200){
                    let data= {
                        ...response?.product,
                        offerPrice: response.product.offerPrice || '',
                        category: {
                            ...response?.product.category,
                            id: response?.product.category_id,
                            value: response.product?.category_id,
                            label: lang==='en' ? response.product?.category?.name_en : response.product?.category?.name_ar
                        },
                        brand: response.product.brand?.name_en ? {
                            ...response.product.brand,
                            label: lang==='en' ? response.product.brand?.name_en : response.product?.category?.name_ar,
                            value: response.product.brand_id
                        } : '',
                        images: product?.images?.map((_,index)=> {
                            if(!!response.product.images[index]?.url){
                                return {
                                    src: response.product.images[index]?.url
                                }
                            } else {
                                return {
                                    src: ''
                                }
                            }
                            
                        }),
                        sub_category: response.product?.sub_category?.name_en ? {
                            ...response.product?.sub_category,
                            label: lang==='en' ? response.product?.sub_category?.name_en : response.product?.category?.name_ar,
                            value: response.product?.sub_category_id,
                            id: response.product?.sub_category_id,
                        } : '',
                        serial_number: response.product.product_serial_numbers?.map(item=> item?.serial_number),
                        amount: response.product.product_serial_numbers?.length
                    }
                    productsService.getDynamicVariantOfProducts(prod_id).then(res2=>{
                        if(res2.status === 200){
                            data['dynamic_variant'] = res2.data.data?.map(item=>{
                                return{
                                    ...item,
                                    label: item.name_en
                                }
                            })
                            setProduct({...data})
                            dispatch(loadingToggleAction(false))  
                        }
                    })
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
            if(res.data?.status){
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
			setProduct({...product, images: update})
		}, 200);
    }
    // const serialFileHandler = (e) => {
    //     let filesAll = e.target.files
    //     const filesData = Object.values(filesAll)

    //     new BaseService().postUpload(filesData[0]).then(res=>{
    //         if(res.data?.status){
    //             setProduct({...product, serial_image: {src: res.data.url}})
    //             setFiles([e.target.files[0]])
    //         }
    //     })
    // }

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
        setLoadning(true)
        let data ={
            name_en: product.name_en,
            name_ar: product.name_ar,
            price: parseFloat(product.price),
            cost: product.cost,
            category_id: product.category?.value,
            images: product?.images?.filter(res=> !!res?.src)?.map(item=> item?.src),
            amount: parseFloat(product.amount),
            description_en: product.description_en,
            description_ar: product.description_ar,

            // dynamic_variant: product?.dynamic_variant?.map(dy=>{
            //     return {
            //         dynamic_variant_id: dy?.id
            //     }
            // }),
            
            bestSeller: product.bestSeller,
            newIn: product.newIn,
            offer: product.offer,
            offerPrice: parseFloat(product.offerPrice),
            serial_number: product?.serial_number
        }
        if(!!product.sub_category) data['sub_category_id']= product?.sub_category?.value
        if(!!product.brand) data['brand_id']= product?.brand?.value
        if(!!product.code) data['code']= product?.code

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
            productsService?.createDigitalProduct(data)?.then(res=>{
                if(res?.data?.status === 201){
                    setConfirm(true)
                    toast.success('Product Added Successfully')
                    // navigate('/products')
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
    // const deleteSerialImg = () =>{
    //     setSerialFiles([])
	// 	setProduct({...product, serial_image: {src: ''}})
    // }

    if(Auth.showLoading){
        return <Card className="p-4" style={{minHeight: '30rem'}}>
            <Loader />
        </Card>
    }
    return <Card className="p-4">
        <AvForm onValidSubmit={submit} className='add-product'>
            <Row>
                <Col md={6} className="mb-3">
                        <AvField
                                label={`${Translate[lang].english_name}*`}
                                type='text'
                                placeholder={Translate[lang].english_name}
                                bsSize="lg"
                                name='name_en'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
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
                                label={`${Translate[lang].arabic_name}*`}
                                type='text'
                                placeholder={Translate[lang].arabic_name}
                                value={product.name_ar}
                                name='name_ar'
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: Translate[lang].field_required
                                    },
                                    pattern: {
                                        value: '/^[\u0621-\u064A0-9١-٩ ]+$/',
                                        errorMessage: `Arabic format is invalid`
                                    }
                                }}
                                onChange={(e) => handlerText(e)}
                                />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">{`${Translate[lang].english_description}*`}</label>
                        <textarea  
                            name="description_en" 
                            style={{
                                minHeight: '80px',
                                maxHeight: '150px',
                                height: '150px'
                            }}
                            className="form-control"
                            required
                            placeholder={Translate[lang].english_description}
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
                        {errors['desc_en'] && <p className="text-danger m-0" style={{fontSize: '12.8px'}}>{Translate[lang].field_required}</p>}
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">{`${Translate[lang].arabic_description}*`}</label>
                        <textarea  
                            name="description_ar" 
                            style={{
                                minHeight: '80px',
                                maxHeight: '150px',
                                height: '150px'
                            }}
                            className="form-control"
                            placeholder={Translate[lang].arabic_description}
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
                        {errors['desc_ar'] && <p className="text-danger m-0" style={{fontSize: '12.8px'}}>{Translate[lang].field_required}</p>}
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">{`${Translate[lang].category}*`}</label>
                        <Select
                            value={product.category}
                            name="category"
                            placeholder={Translate[lang].select}
                            options={categoriesOptions}
                            onChange={(e)=> setProduct({...product, category: e, dynamic_variant: [],variant: [], sub_category: ''})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">{Translate[lang].sub_category}</label>
                        <Select
                            value={product.sub_category}
                            name="sub_category"
                            placeholder={Translate[lang].select}
                            options={subCategoriesOptions}
                            onChange={(e)=> setProduct({...product, sub_category: e})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <label className="text-label">{Translate[lang].brands}</label>
                        <Select
                            value={product.brand}
                            name="brand"
                            placeholder={Translate[lang].select}
                            options={brandOptions}
                            onChange={(e)=> setProduct({...product, brand: e})}
                        />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label={`${Translate[lang].price}*`}
                                type='number'
                                placeholder={Translate[lang].price}
                                bsSize="lg"
                                name='price'
                                min='0'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={product.price}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label={`${Translate[lang].cost}*`}
                                type='number'
                                placeholder={Translate[lang].cost}
                                bsSize="lg"
                                name='cost'
                                min= '0'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={product.cost}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                                label={`${Translate[lang].code}*`}
                                type='text'
                                placeholder={Translate[lang].code}
                                bsSize="lg"
                                name='code'
                                // validate={{
                                //     required: {
                                //         value: true,
                                //         errorMessage: Translate[lang].field_required
                                //     }
                                // }}
                                value={product.code}
                                onChange={(e)=> handlerText(e)}
                            />
                </Col>
                <Col md={6} className="mb-3">
                    <AvField
                                label={`${Translate[lang].quantity}*`}
                                type='number'
                                placeholder={Translate[lang].quantity}
                                bsSize="lg"
                                name='amount'
                                min={1}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    },
                                    pattern: {
                                        value: "^[0-9]+$",
                                        errorMessage: `Format is invalid`
                                    }
                                }}
                                value={product.amount}
                                onChange={(e)=> {
                                    if(!e.target.value){
                                        return
                                    }
                                    let quantity
                                    if( parseInt(product.amount) > parseInt(e.target.value)){
                                        quantity = product.serial_number?.filter((_, ind)=> ind+1 <= parseInt(e.target.value))
                                    } else {
                                        quantity = [...product.serial_number, ...Array.from({ length: parseInt(e.target.value)-parseInt(product.amount) }, (_) => '')]
                                    }
                                    setProduct({...product, serial_number: quantity, amount: e.target.value})
                                }}
                            />
                </Col>
                <Col md={6} className="mb-3">
                        <AvField
                            label={Translate[lang].offer_price}
                            type='number'
                            placeholder={Translate[lang].offer_price}
                            bsSize="lg"
                            name='offerPrice'
                            value={product.offerPrice}
                            onChange={(e)=> handlerText(e)}
                        />
                </Col>
                <Col md={2} className="mb-3">
                    {/* <div className="form-group mb-3 d-flex" style={{gap: '24px'}}> */}
                        <label className="text-label">{Translate[lang].best_seller}</label>
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
                        <label className="text-label">{Translate[lang].new_in}</label>
                        <Form.Check
                        type="switch"
                        id={`newIn`}
                        checked={product.newIn}
                        onChange={(e)=> setProduct({...product, newIn: e.target.checked})}
                      />
                    {/* </div> */}
                </Col>
                <Col md={2} className="mb-3">
                        <label className="text-label">{Translate[lang].offer}</label>
                        <Form.Check
                        type="switch"
                        id={`offer`}
                        checked={product.offer}
                        onChange={(e)=> setProduct({...product, offer: e.target.checked})}
                      />
                </Col>
                {/* {dynamicVariant?.length > 0 && <Col md={6}>
                <label className="text-label mb-2 d-block">{Translate[lang].dynamic_variant}</label>
                <Select 
                    options={dynamicVariant?.filter(res=> !product.dynamic_variant?.some(res2=> res.label === res2.label))}
                    name='dynamic_variant'
                    isMulti={true}
                    placeholder={Translate[lang].select}
                    value={product.dynamic_variant}
                    onChange={e=>{
                        setProduct({...product, dynamic_variant: e})
                    }}
                />
            </Col>} */}
            </Row>
            

            <Row>
                {product?.serial_number?.map((serial, index)=>{
                    return <Col md={6} key={index}>
                    <AvField
                        label={`${Translate[lang].serial_number} ${index+1}`}
                        type='text'
                        placeholder={`${Translate[lang].serial_number}`}
                        bsSize="lg"
                        name={`serial_number${index}`}
                        value={serial}
                        onChange={(e)=> {
                            let update = product?.serial_number?.map((item, ind)=>{
                                if(index === ind){
                                    return e.target.value
                                } else{
                                    return item
                                }
                            })
                            setProduct({...product, serial_number: update})
                        }}
                        validate={{
                            required: {
                                value: true,
                                errorMessage: Translate[lang].field_required
                            }
                        }}

                    />
                </Col>
                })}
                {/* <Col md={6}></Col>
                <Col md={3} className='mb-3'>
                        <label className="text-label text-center d-block or"> {Translate[lang].or}</label>
                        <label className="text-label">{Translate[lang].serial_image}</label>
                        <div className="image-placeholder">	
                            <div className="avatar-edit">
                                <input type="file" onChange={(e) => serialFileHandler(e)} id={`imageUpload`} /> 					
                                <label htmlFor={`imageUpload`}  name=''></label>
                            </div>
                            <button className="delete-img" type="button" onClick={()=> deleteSerialImg()}>
                                <i className='la la-trash'></i>
                            </button>
                            <div className="avatar-preview">
                                {!!product.serial_image.src ? <div id={`imagePreview`}>
                                    <img id={`saveImageFile`} src={product.serial_image?.src} alt='icon' />
                                </div> : <div id={`imagePreview`}>
                                    {serialFile[0]?.name && <img id={`saveImageFile`} src={URL.createObjectURL(serialFile[0])} alt='icon' />}
                                    {!serialFile[0]?.name && <img id={`saveImageFile`} src={uploadImg} alt='icon'
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                        }}
                                    />}
                                </div>}
                            </div>
                        </div>
                </Col> */}
            </Row>

            <label className="text-label mb-0 mt-4" style={{marginLeft: '8px'}}>{Translate[lang].images}</label>
            <Row>
                {product?.images?.map((data, index)=>{
                    return <Col md={3} className='mb-3' key={index}>
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
            <div className="d-flex justify-content-between mt-4">
            <Button 
                variant="secondary"
                type="button"
                onClick={()=> navigate('/digital-products')}
            >{Translate[lang].cancel}</Button>
            <Button 
                variant="primary"
                loading={loading}
                type="submit">{Translate[lang].submit}</Button>
            </div>
        </AvForm>
        {confirm && <ConfirmModal 
            open={confirm}
            title={Translate[lang]?.confirm_added}
            body={Translate[lang]?.confirm_des}
            button={Translate[lang]?.add_more_products}
            onCloseModal={()=> navigate('/digital-products')}
            submitButton={()=> setConfirm(false)}
        />}
    </Card>
}

export default AddDigitalProducts;