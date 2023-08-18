import React ,{useState} from 'react'
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types"
import { toast } from 'react-toastify';

function DeleteModal(props) {
    const [loading, setLoading] = useState(false)

    const handleDeletedItem = async () => {
        setLoading(true)
        if(props.isDeleted){
            const { data: response } = await props.modelService.remove(props.deletedItem.id , { isDeleted: props.isDeleted })
            if(response?.status === 200){
                toast.success('Deleted Successfully')
                props.setShouldUpdate(prev=> !prev)
                if(props?.isEdit === false){
                    props?.setModal(false)
                }
                return props.onCloseModal(false)
            }
        } else {
            const { data: response } = await props.modelService.remove(props.deletedItem.id)
            if(response?.status === 200){
                toast.success('Deleted Successfully')
                props.setShouldUpdate(prev=> !prev)
                if(props?.isEdit === false){
                    props?.setModal(false)
                }
                return props.onCloseModal(false)
            }
        }
    }

    return (
        <Modal show={props.open}  onHide={()=> props.onCloseModal(false)} >
            <div className="modal-header border-0">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    <i className='la la-trash text-danger' style={{fontSize: '20px'}}></i> Delete {props.titleMsg}
                </h5>
                <button
                    type="button"
                    onClick={() => props.onCloseModal(false)}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body border-0">
                <p>
                    {`Kindly note that this action can't be undone and the ${props.titleMsg} details will get deleted.`}
                </p>
            </div>
            <div className="modal-footer border-0">
                <button
                    type="button"
                    onClick={() => props.onCloseModal(false)}
                    className="btn me-auto btn-secondary waves-effect waves-light"
                    data-dismiss="modal"
                >
                    Cancel
            </button>
                <button
                    onClick={handleDeletedItem}
                    type="button"
                    className="btn btn-danger waves-effect"
                    disabled={loading ? true : false}

                >
                    Delete
            </button>
            </div>
        </Modal>
    )
}

DeleteModal.propTypes = {
    open: PropTypes.bool,
    onCloseModal: PropTypes.func,
    handleTableChange: PropTypes.func,
    deletedItem: PropTypes.object,
    modelService: PropTypes.object,
    titleMsg: PropTypes.string
};

export default DeleteModal
