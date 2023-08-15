import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvForm} from "availity-reactstrap-validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../common/DeleteModal";
import DynamicVariantService from "../../../../services/DynamicVariantService";
import { toast } from "react-toastify";

const ChooseEditModal = ({modal, setModal, dynamicVariants,isEdit, setShouldUpdate})=>{
    const [choose, setChoose] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate()
    const dynamicVariantService= new DynamicVariantService()

    const submit = () =>{
        if(!choose){
            toast.error('Select First')
            return
        }
        if(isEdit){
            navigate(`/dynamic-variant/edit-dynamic-variant/${choose.id}`, {state: choose})
        } else{
            setDeleteModal(true)
        }
    }

    return(
        <Modal show={modal} onHide={setModal}>
            <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>Chosse DynamicVariant</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={setModal}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        {dynamicVariants?.map((variant)=>{
                            return <Col md={12}>
                                <label className="w-100">
                                    <input type='radio' name='dynamicVariant' className="mr-3" onChange={()=>setChoose(variant)} />
                                    {variant?.name_en}
                                </label>
                            </Col>
                        })}
                    </Row>
                
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setModal} variant="danger light">
                Close
            </Button>
            <Button 
                variant="primary" 
                type='submit'
                >
                    {isEdit ? 'Edit' : 'Delete'}
                </Button>
            </Modal.Footer>
            </AvForm>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={choose.name_en}
                      deletedItem={choose}
                      modelService={dynamicVariantService}
                      setShouldUpdate={setShouldUpdate}
                      onCloseModal={setDeleteModal}
                      setModal={setModal}
                      isEdit={setModal}
                    />}
        </Modal>)
}

export default ChooseEditModal;