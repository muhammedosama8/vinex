import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import uploadImg from '../../../images/upload-img.webp';
import Select from 'react-select';
import './style.scss'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductsService from "../../../services/ProductsService";
import BaseService from "../../../services/BaseService";
import BannerService from "../../../services/BannerService";

const Banners = () =>{
    const [files, setFiles] = useState([{},{},{},{},{}])
    const [productsOptions, setProductsOptions] = useState([])
    const [isAdd, setIsAdd] = useState(true)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const productsService = new ProductsService()
    const bannerService = new BannerService()

    const [formData, setFormData] = useState([
        {src:'', product: ''},
        {src:'', product: ''},
        {src:'', product: ''},
        {src:'', product: ''},
        {src:'', product: ''},
    ])

    useEffect(()=>{
        productsService?.getList()?.then(res=>{
            if(res.status === 200){
                let products = res.data?.meta?.data?.map(prod=>{
                    return{
                        id: prod?.id,
                        value: prod?.id,
                        label: prod?.name_en
                    }
                })
                setProductsOptions([...products])
            }
        })
    },[])

    useEffect(()=>{
        bannerService?.getList()?.then(res=>{
            if(res.status === 200){
                if(res?.data?.meta?.data?.length === 0){
                    return
                }
                if(res?.data?.meta?.data?.length > 0){
                    setIsAdd(false)
                }
                let data = res?.data?.meta?.data?.map(item=>{
                    return {
                        src: item?.image,
                        product: productsOptions?.filter(opt=> opt?.id === item.product_id)[0]
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
        })
    },[productsOptions])

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
            if(res?.data?.status){
                let updateImages = formData.map((item, ind)=>{
                    if(ind === index){
                        return {
                            ...item,
                            src: res.data.url
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
            banners: formData?.filter(res => !!res.src && !!res.product)?.map((item,index)=>{
                return {
                    image: item?.src, 
                    product_id: item?.product?.value
                }
            })
        }
        
        if(isAdd){
            if(data.banners?.length === 0){
                toast.error('Add Image and Product First')
                return
             }
            bannerService?.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('Banners Added Successfully')
                    setIsAdd(false)
                }
            })
        } else {
            bannerService?.update(data)?.then(res=>{
                if(res?.status === 200){
                    toast.success('Banners Updated Successfully')
                    setIsAdd(false)
                }
            })
        }
        
    }

    return(
        <>
        {formData?.map((data, index)=>{
            return <Card className="p-4" key={index}>
                    <Row>
                    <Col md={12}>
                    <h4>Banner {index+1}</h4>
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
                            {!!data?.src && <img id={`saveImageFile${index}`} src={data?.src} alt='icon' />}
                            {!data?.src && <img id={`saveImageFile${index}`} src={uploadImg} alt='icon'
                                style={{
                                    width: '80px',
                                    height: '80px',
                                }}
							/>}
                            </div>
                        </div>
                    </div>
                    {/* <div className="image-placeholder">	
                        <div className="avatar-edit">
                            <input type="file" 
                                    onChange={(e) => {
                                        if(!isExist('banners')){
                                            toast.error('Not Allowed, Don`t have Permission')
                                            return
                                        }
                                        fileHandler(e,index+1)
                                    }} 
                                    id={`imageUpload${index+1}`} /> 					
                            <label htmlFor={`imageUpload${index+1}`}  name=''></label>
                        </div>
                        <div className="avatar-preview">
                            <div id={`imagePreview${index+1}`}>
                            {files[index]?.name && <img id={`saveImageFile${index+1}`} src={URL.createObjectURL(files[index])} alt='icon' />}
                            {!files[index]?.name && <img id={`saveImageFile${index+1}`} src={uploadImg} alt='icon'
                                style={{
                                    width: '80px',
                                    height: '80px',
                                }}
							/>}
                            </div>
                        </div>
                    </div> */}
                    <div className='form-row mt-3'>
                        <div className='form-group w-100 d-flex align-items-center m-0'>
                            <label style={{width: '65px'}} className='m-0'>Link {index+1}:</label>
                            <Select
                                value={data?.product}
                                name="category"
                                options={productsOptions}
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
                        </div>
                    </div>
                    </Col>
                    </Row>
            </Card>
        })}
        {isExist('banners') && <div className="d-flex justify-content-end">
            <Button 
                variant="primary" 
                className="px-5"
                onClick={()=> onSubmit()}
            >Submit</Button>
        </div>}
    </>)
}
export default Banners;