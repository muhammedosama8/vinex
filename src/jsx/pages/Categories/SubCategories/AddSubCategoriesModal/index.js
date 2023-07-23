import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import Select from 'react-select'


const AddSubCategoriesModal = ({addModal, setAddModal, item})=>{
    const [formData, setFormData] = useState({
        en: '',
        ar: '',
        category: {}
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
                <div>
                    <div className='form-row'>
                        <div className='form-group w-100'>
                        <label>Category</label>
                        <Select
                            value={formData.category}
                            name="categories"
                            options={categoriesOptions}
                            onChange={(e)=> setFormData({...formData, category: e})}
                        />
                        </div>
                    </div>
                    <div className='form-row'>
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
                    </div>

                    <div className='form-row'>
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
                    </div>
                </div>
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