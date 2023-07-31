import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import Select from 'react-select'
import { toast } from "react-toastify";
import uploadImg from '../../../../../images/upload-img.webp';
import BaseService from "../../../../../services/BaseService";
import CategoriesService from "../../../../../services/CategoriesService";
import SubCategoriesService from "../../../../../services/SubCategoriesService";

const AddSubCategoriesModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        en: '',
        ar: '',
        category: '',
        img: ''
    })
    const [isAdd, setIsAdd] = useState(false)
    const [ categoriesOptions, setCategoriesOptions] = useState([])
    const cancelTokenSource = useRef();
    const subCategoriesService = new SubCategoriesService()
    const categoriesService = new CategoriesService()

    useEffect(()=> {
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

    useEffect(() => {
        if(Object.keys(item).length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                category: {
                    ...item.category,
                    label: `${item.category?.name_en}`
                },
                id: item?.id,
                ar: item?.name_ar,
                en: item?.name_en,
                img: item?.image,
            })
        }
    },[item])

    const fileHandler = (e) => {
        setLoading(true)
        let files = e.target.files
        const filesData = Object.values(files)
        cancelTokenSource.current = axios.CancelToken.source();
 
        if (filesData.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res.data.status){
                    setFormData({...formData, img: res.data.url})
                    setFiles(filesData[0])
                }
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        return () => {
            cancelTokenSource?.current?.cancel()
          }
    }, [])

    const submit = () =>{
        if(!formData?.img){
            return
        }
        let data ={
            category_id: formData.category?.value,
            name_en: formData?.en,
            name_ar: formData?.ar,
            image: formData?.img
        }
        if(isAdd){
            subCategoriesService?.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('SubCategory Added Successfully')
                    cancelTokenSource.current.cancel()
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
            })
        } else {
            subCategoriesService?.update(formData?.id, {...data, id: formData?.id})?.then(res=>{
                if(res?.status === 200){
                    toast.success('SubCategory Updated Successfully')
                    cancelTokenSource.current.cancel()
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
            })
        }
    }

    return(
        <Modal className="fade" show={addModal} onHide={setAddModal}>
            <Modal.Header>
            <Modal.Title>{isAdd ? 'Add': 'Edit'} Sub Category</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={setAddModal}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <div className='form-group w-100'>
                        <label>Category</label>
                        <Select
                            value={formData.category}
                            name="categories"
                            options={categoriesOptions}
                            onChange={(e)=> setFormData({...formData, category: e})}
                        />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='form-group w-100'>
                            <label>English</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Name'
                                value={formData.en}
                                style={{height: '50px', color: 'initial'}}
                                required
                                onChange={(e) => setFormData({...formData, en: e.target.value})}
                            />
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className='form-group w-100'>
                            <label>Arabic</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='الاسم'
                                value={formData.ar}
                                style={{height: '50px', color: 'initial'}}
                                required
                                onChange={(e) => setFormData({...formData, ar: e.target.value})}
                            />
                        </div>
                    </Col>

                    <Col md={12}>
                            <div className='form-group w-100'>
                                <label className="m-0">Category Image</label>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit">
                                        <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload`} /> 					
                                        <label htmlFor={`imageUpload`}  name=''></label>
                                    </div>
                                    <div className="avatar-preview2 m-auto">
                                        <div id={`imagePreview`}>
                                        {!!formData?.img && 
                                            <img alt='icon'
                                                id={`saveImageFile`} 
                                                className='w-100 h-100' 
                                                style={{borderRadius: '30px'}} 
                                                src={formData?.img|| URL.createObjectURL(files)}
                                            />}
                                        {/* {files[index]?.name && <img id={`saveImageFile${index+1}`} src={URL.createObjectURL(files[index])} alt='icon' />} */}
                                        {formData?.img &&  <img id={`saveImageFile`} src={uploadImg} alt='icon'
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                            }}
                                        />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
                Close
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    onClick={()=> submit()}
                >{isAdd ? "Add" : "Edit"}</Button>
            </Modal.Footer>
        </Modal>)
}

export default AddSubCategoriesModal;