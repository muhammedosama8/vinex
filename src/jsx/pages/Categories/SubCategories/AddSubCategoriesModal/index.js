import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import Select from 'react-select'
import uploadImg from '../../../../../images/upload-img.webp';

const AddSubCategoriesModal = ({addModal, setAddModal, item})=>{
    const [files, setFiles] = useState([{}])
    const [formData, setFormData] = useState({
        en: '',
        ar: '',
        category: '',
        img: [
            {img1:'', link1: ''}
        ]
    })
    const [isAdd, setIsAdd] = useState(false)
    const [ categoriesOptions, setCategoriesOptions] = useState([
        {label: 'Pants', value: 1},
        {label: 'T-shirts', value: 2},
    ])

    useEffect(() => {
        if(Object.keys(item).length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({...item})
        }
    },[item])

    const fileHandler = (e, index) => {
        let update = files?.map((file,updateIndex) => {
            if(updateIndex === index-1){
                return e.target.files[0]
            } else{
                return file
            }
        })
        setFiles([...update])
		setTimeout(function(){
			var src = document.getElementById(`saveImageFile${index}`)?.getAttribute("src");
            let updateFormData = formData?.img.map((item, ind)=>{
                if(item.hasOwnProperty(`img${index}`)){
                    let img = `img${index}`
                    return {
                        ...item,
                        [img]: src,
                    }
                } else {
                    return {...item}
                }
            } )
			setFormData({...formData, img: [...updateFormData]})
		}, 200);
    }

    const submit = () =>{

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
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </Col>

                    {formData?.img?.map((data, index)=>{
                    return <Col md={12}>
                            <div className='form-group w-100'>
                                <label className="m-0">Category Image</label>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit">
                                        <input type="file" onChange={(e) => fileHandler(e,index+1)} id={`imageUpload${index+1}`} /> 					
                                        <label htmlFor={`imageUpload${index+1}`}  name=''></label>
                                    </div>
                                    <div className="avatar-preview2 m-auto">
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
                                </div>
                            </div>
                            </Col>
                        })}
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