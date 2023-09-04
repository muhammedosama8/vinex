import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import Select from 'react-select'
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../../images/upload-img.png';
import SubCategoriesService from "../../../../services/SubCategoriesService";
import CategoriesService from "../../../../services/CategoriesService";
import BaseService from "../../../../services/BaseService";
import Loader from "../../../common/Loader";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";

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
    const subCategoriesService = new SubCategoriesService()
    const categoriesService = new CategoriesService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=> {
        categoriesService.getList().then(res=>{
            if(res.data?.status === 200){
                let categories =  res.data?.meta?.data?.map(item=>{
                   return{
                      id: item?.id,
                      value: item?.id,
                      label: lang === 'en' ? item.name_en : item?.name_ar,
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
                    label: lang === 'en' ? item.category?.name_en : item.category?.name_ar,
                    value: item.category.id
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
        setLoading(true)
        if(isAdd){
            subCategoriesService.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('SubCategory Added Successfully')
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
                setLoading(false)
            })
        } else {
            subCategoriesService.update(formData?.id, data)?.then(res=>{
                if(res?.status === 200){
                    toast.success('SubCategory Updated Successfully')
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
                setLoading(false)
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade" : "ar fade"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={setAddModal}>
            <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang].add : Translate[lang].edit} {Translate[lang].sub_category}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={setAddModal}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                
                    <Row>
                        <Col md={12}>
                            <div className='form-group w-100'>
                            <label>{Translate[lang].category}</label>
                            <Select
                                value={formData.category}
                                name="categories"
                                placeholder={Translate[lang].select}
                                options={categoriesOptions}
                                onChange={(e)=> setFormData({...formData, category: e})}
                            />
                            </div>
                        </Col>
                        <Col md={6}>
                            <AvField
                                    label={Translate[lang].english}
                                    type='text'
                                    placeholder={Translate[lang].english}
                                    bsSize="lg"
                                    name='en'
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
                                    value={formData.en}
                                    onChange={(e) => setFormData({...formData, en: e.target.value})}
                                />
                        </Col>

                        <Col md={6}>
                            <AvField
                                    label={Translate[lang].arabic}
                                    type='text'
                                    placeholder={Translate[lang].arabic}
                                    value={formData.ar}
                                    name='ar'
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
                                    onChange={(e) => setFormData({...formData, ar: e.target.value})}
                                />
                        </Col>

                        <Col md={12}>
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang].category_image}</label>
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
                                            {(!formData?.img && !loading) &&  <img id={`saveImageFile`} src={uploadImg} alt='icon'
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                }}
                                            />}
                                            {(!formData?.img && loading) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                    </Row>
                
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
            {Translate[lang].close}
            </Button>
            <Button 
                disabled={loading}
                variant="primary" 
                type='submit'
                >{isAdd ? Translate[lang].add : Translate[lang].edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddSubCategoriesModal;