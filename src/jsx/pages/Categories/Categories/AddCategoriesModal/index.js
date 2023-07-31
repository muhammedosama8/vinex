import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import { toast } from "react-toastify";
import uploadImg from '../../../../../images/upload-img.webp';
import BaseService from "../../../../../services/BaseService";
import CategoriesService from "../../../../../services/CategoriesService";

const AddCategoriesModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        en: '',
        ar: '',
        img: ''
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const cancelTokenSource = useRef();
    const categoriesService = new CategoriesService()

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                ar: item?.name_ar,
                en: item?.name_en,
                img: item?.image,
            })
        }
    },[item])

    const fileHandler = (e) => {
        // setFiles([e.target.files[0]])
		// setTimeout(function(){
		// 	var src = document.getElementById(`saveImageFile`)?.getAttribute("src");
		// 	setFormData({...formData, img: {id: '', path: src}})
		// }, 200);

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
            name_en: formData?.en,
            name_ar: formData?.ar,
            image: formData?.img
        }
        if(isAdd){
            categoriesService?.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('Category Added Successfully')
                    cancelTokenSource.current.cancel()
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
            })
        } else {
            categoriesService?.update(formData?.id, {...data, id: formData?.id})?.then(res=>{
                if(res?.status === 200){
                    toast.success('Category Updated Successfully')
                    cancelTokenSource.current.cancel()
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
            })
        }
    }

    return(
        <Modal className="fade" show={addModal} onHide={()=>{
            if(loading){
                cancelTokenSource.current.cancel()
            }
            setAddModal()
            }}>
            <Modal.Header>
            <Modal.Title>{isAdd ? 'Add': 'Edit'} Category</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={()=>{
                    if(loading){
                        cancelTokenSource.current.cancel()
                    }
                    setAddModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                <Row>
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
                            <label className="">Arabic</label>
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
                                        {/* {files[0]?.name && <img id={`saveImageFile`} className='w-100 h-100' style={{borderRadius: '30px'}} src={URL.createObjectURL(files[0])} alt='icon' />} */}
                                        {!formData?.img && 
                                            <img 
                                                id={`saveImageFile`} 
                                                src={uploadImg} alt='icon'
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
                    disabled={loading}
                    onClick={()=> submit()}
                >{isAdd ? "Add" : "Edit"}</Button>
            </Modal.Footer>
        </Modal>)
}

export default AddCategoriesModal;