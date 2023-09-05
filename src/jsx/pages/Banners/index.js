import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import uploadImg from '../../../images/upload-img.png';
import Select from 'react-select';
import './style.scss'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductsService from "../../../services/ProductsService";
import BaseService from "../../../services/BaseService";
import BannerService from "../../../services/BannerService";
import Loader from "../../common/Loader";
import { Translate } from "../../Enums/Tranlate";

const Banners = () =>{
    const [files, setFiles] = useState([{},{},{},{},{}])
    const [productsOptions, setProductsOptions] = useState([])
    const [isAdd, setIsAdd] = useState(true)
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSumbitLoading] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const productsService = new ProductsService()
    const bannerService = new BannerService()

    const [formData, setFormData] = useState([
        {src:'', product: '', loading: false},
        {src:'', product: '', loading: false},
        {src:'', product: '', loading: false},
        {src:'', product: '', loading: false},
        {src:'', product: '', loading: false},
    ])

    useEffect(()=>{
        setLoading(true)
        productsService?.getList()?.then(res=>{
            if(res && res?.status === 200){
                let products = res.data?.meta?.data?.map(prod=>{
                    return{
                        id: prod?.id,
                        value: prod?.id,
                        label: lang==='en' ? prod?.name_en : prod?.name_ar
                    }
                })
                setProductsOptions([...products])
            }
        })
    },[lang])

    useEffect(()=>{
        bannerService?.getList()?.then(res=>{
            if(res && res?.status === 200){
                if(res.data?.meta?.data?.length === 0){
                    return
                }
                if(res.data?.meta?.data?.length > 0){
                    setIsAdd(false)
                }
                let data = res.data?.meta?.data?.map(item=>{
                    return {
                        src: item?.image,
                        product: !!item.product_id ? productsOptions?.filter(opt=> opt?.id === item.product_id)[0] : '',
                        loading: false
                    }
                })

                if(data?.length < 5){
                    let complete =[]
                    for(let i=data?.length; i<5; i++){
                        complete.push({src: '', product: ''})
                    }
                    setFormData([...data, ...complete])
                } else {
                    setFormData([...data])
                }
            }
            setLoading(false)
        })
    },[productsOptions])

    const fileHandler = (e, index) => {
        let updateImages = formData.map((item, ind)=>{
            if(ind === index){
                return {
                    ...item,
                    loading: true
                }
            } else {
                return {...item}
            }
        } )
        setFormData([...updateImages])
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
            if(res && res?.data?.status){
                let updateImages = formData.map((item, ind)=>{
                    if(ind === index){
                        return {
                            ...item,
                            src: res.data.url,
                            loading: false
                        }
                    } else {
                        return {...item}
                    }
                } )
                setFormData([...updateImages])
                setFiles([...update])
            }
        })
    }

    const onSubmit = () => {
        let data = {
            banners: formData?.filter(res=> !!res.src)?.map((item,index)=>{
                let res = {
                    image: item?.src
                }
                if(!!item?.product?.value) res['product_id']=item?.product?.value
                return res
            })
        }
        
        if(isAdd){
            if(data.banners?.length === 0){
                toast.error('Add Image')
                return
            }
            setSumbitLoading(true)
            bannerService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Banners Added Successfully')
                    setIsAdd(false)
                }
                setSumbitLoading(false)
            })
        } else {
            setSumbitLoading(true)
            bannerService.update(data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Banners Updated Successfully')
                    setIsAdd(false)
                }
                setSumbitLoading(false)
            })
        }
        
    }

    if(loading){
        return <Card className="py-5">
            <Card.Body>
                <Loader />
            </Card.Body>
        </Card>
    }
    return(
        <>
        {formData?.map((data, index)=>{
            return <Card className="p-4" key={index}>
                    <Row>
                    <Col md={12}>
                    <h4>{Translate[lang].banner} {index+1}</h4>
                    <div className="image-placeholder">	
                        <div className="avatar-edit">
                            <input type="file" 
                                    onChange={(e) => {
                                        if(!isExist('banners')){
                                            toast.error('Not Allowed, Don`t have Permission')
                                            return
                                        }
                                        fileHandler(e,index)
                                    }} 
                                    id={`imageUpload${index}`} /> 					
                            <label htmlFor={`imageUpload${index}`}  name=''></label>
                        </div>
                        <button 
                            className="delete"
                            type="button"
                            onClick={()=>{
                                let update= formData?.map((item, ind)=>{
                                    if(ind === index){
                                        return{
                                            ...item,
                                            src: ''
                                        }
                                    } else {
                                        return item
                                    }
                                })
                                setFormData([...update])
                            }}
                        >
                            <i className="la la-trash text-danger"></i>
                        </button>
                        <div className="avatar-preview">
                            <div id={`imagePreview${index}`}>
                            {(!!data?.src && !data.loading) && <img id={`saveImageFile${index}`} src={data?.src} alt='icon' />}
                            {(!data?.src && !data.loading) && <img id={`saveImageFile${index}`} src={uploadImg} alt='icon'
                                style={{
                                    width: '80px',
                                    height: '80px',
                                }}
							/>}
                            {data.loading && <Loader />}
                            </div>
                        </div>
                    </div>
                    <div className='form-row mt-3'>
                        <div className='form-group w-100 d-flex align-items-center m-0'>
                            <label style={{width: '65px'}} className='m-0'>{Translate[lang].link} {index+1}:</label>
                            <Select
                                value={data?.product}
                                name="category"
                                options={productsOptions}
                                placeholder={Translate[lang].select}
                                className='w-50'
                                onChange={(e)=> {
                                    let updateFormData = formData.map((item, ind)=>{
                                        if(ind === index){
                                            return {
                                                ...item,
                                                product: e,
                                            }
                                        } else {
                                            return {...item}
                                        }
                                    } )
                                    setFormData([...updateFormData])
                                }}
                            />
                            {!!data?.product && <button 
                                className="delete2"
                                type="button"
                                onClick={()=>{
                                    let update= formData?.map((item, ind)=>{
                                        if(ind === index){
                                            return{
                                                ...item,
                                                product: ''
                                            }
                                        } else {
                                            return item
                                        }
                                    })
                                    setFormData([...update])
                                }}
                            >
                            <i className="la la-trash text-danger"></i>
                        </button>}
                        </div>
                    </div>
                    </Col>
                    </Row>
            </Card>
        })}
        {isExist('banners') && <div className="d-flex justify-content-end mb-4">
            <Button 
                variant="primary" 
                className="px-5"
                disabled={submitLoading}
                onClick={()=> onSubmit()}
            >{Translate[lang].submit}</Button>
        </div>}
    </>)
}
export default Banners;