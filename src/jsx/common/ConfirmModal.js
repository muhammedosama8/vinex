import React from 'react'
import { Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ConfirmModal(props) {
    const navigate = useNavigate()

    return (
        <Modal show={props.open}  onHide={()=> props.onCloseModal(false)} >
            <div className="modal-header border-0">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    Confirm Added
                </h5>
                <button
                    type="button"
                    onClick={() => navigate(props.path)}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body border-0">
                <p>
                   You can add another product by change some information
                </p>
            </div>
            <div className="modal-footer border-0">
                <button
                    type="button"
                    onClick={() => navigate(props.path)}
                    className="btn me-auto btn-secondary waves-effect waves-light"
                    data-dismiss="modal"
                >
                    Cancel
            </button>
                <button
                    onClick={()=> props.onCloseModal(false)}
                    type="button"
                    className="btn btn-primary waves-effect"
                >
                    Add More Same Product
            </button>
            </div>
        </Modal>
    )
}

export default ConfirmModal
