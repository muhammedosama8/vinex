import React, {useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from 'react-select';
import uploadImg from '../../../images/upload-img.png';
import BaseService from "../../../services/BaseService";
import ProductsService from "../../../services/ProductsService";
import ScreenService from "../../../services/ScreenService";

const AdScreen = () =>{
    const [files, setFiles] = useState([{}])
    const productsService = new ProductsService()
    const screenService = new ScreenService()
    const [productsOptions, setProductsOptions] = useState([])
    const [isAdd, setIsAdd] = useState(true)
    const [formData, setFormData] = useState([
        {src:'', product: ''}
    ])
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

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
        screenService?.getList()?.then(res=>{
            if(res.status === 200){
                if(res?.data?.meta?.data?.length === 0){
                    return
                }
                if(res?.data?.meta?.data?.length > 0) setIsAdd(false)
                let data = res?.data?.meta?.data?.map(item=>{
                    return {
                        src: item?.image,
                        product: productsOptions?.filter(opt=> opt?.id === item.product_id)[0] || ''
                    }
                })
                setFormData([...data])
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
            screens: formData?.filter(res => !!res.src)?.map((item,index)=>{
                return {
                    image: item?.src, 
                    product_id: item?.product?.value
                }
            })
        }
        
        if(isAdd){
            if(data.screens?.length === 0){
                toast.error('Add Image First')
                return
             }
            screenService?.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('Screen Added Successfully')
                    setIsAdd(false)
                }
            })
        } else {
            screenService?.update(data)?.then(res=>{
                if(res?.status === 200){
                    toast.success('Screen Updated Successfully')
                    setIsAdd(false)
                }
            })
        }
        
    }

    return(<Card>
        <Card.Body>
        {formData?.map((data, index)=>{
            return <Row key={index}>
                <Col md={12} style={{
                    padding: '1rem',
                    boxShadow: '0 0 8px #e0dbdb9e',
                    borderRadius: '16px',
                    marginBottom: '2rem'
                }}>
                <div className='d-flex justify-content-between align-items-center mb-1'>
                    <p style={{fontSize: '21px', marginBottom: '0'}}>Ad</p>
                    {index > 0 && <button 
                        className='btn btn-danger p-2'
                        onClick={()=>{
                            let update = formData?.filter((_,ind)=> ind !== index)
                            setFormData([...update])
                        }}>
                        <i className='la la-trash' style={{fontSize: '20px'}}></i>
                    </button>}
                </div>
                <div className="image-placeholder">	
                    <div className="avatar-edit">
                        <input 
                            type="file" 
                            onChange={(e) => {
                                if(!isExist('ad_screen')){
                                    toast.error('Not Allowed, Don`t have Permission')
                                    return
                                }
                                fileHandler(e,index)
                            }} 
                            id={`imageUpload${index}`} /> 					
                        <label htmlFor={`imageUpload${index}`}  name=''></label>
                    </div>
                    <div className="avatar-preview">
                        <div id={`imagePreview${index}`} className='position-relative'>
                            {!!data?.src && <button 
                                onClick={()=>{
                                    let update = formData?.map((item,ind)=>{
                                        if(ind === index){
                                            return{
                                                ...item,
                                                src: ''
                                            }
                                        } else {
                                            return item
                                        }
                                    })
                                    setFormData(update)
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '16px',
                                    borderRadius: '50%',
                                    right: '16px',
                                    border: '0',
                                    background: '#FF4847',
                                    color: '#fff',
                                    padding: '4px 7px',
                                    zIndex: '1'
                                 }}
                            >
                                <i className='la la-times' style={{fontSize: '18px'}}></i>
                            </button>}
                            {!!data?.src && <img id={`saveImageFile${index}`} ssrc={data?.src} alt='icon' />}
                            {!data?.src && <img id={`saveImageFile${index}`} src={uploadImg} alt='icon'
                                style={{
                                    width: '80px',
                                    height: '80px',
                                }}
                            />}
                        </div>
                    </div>
                </div>
                <div className='form-row mt-3'>
                    <div className='form-group w-100 d-flex align-items-center m-0'>
                        <label  className='m-0 mr-3'>Product:</label>
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
        })}
    {isExist('ad_screen') && <div className="d-flex justify-content-between align-items-center mt-2">
        <Button
            variant="secondary" 
            className="px-5"
            onClick={()=> setFormData([...formData, {src:'', product: ''}])}
        >Add New Screen</Button>
        <Button
            variant="primary" 
            className="px-5"
            onClick={()=> onSubmit()}
        >Submit</Button>
    </div>}
    </Card.Body>
</Card>)
}
export default AdScreen;