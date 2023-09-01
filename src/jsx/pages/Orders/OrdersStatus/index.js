import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { Orders } from "../../../Enums/Orders";
import OrdersService from "../../../../services/OrdersService";

const OrdersStatus = ({modal, setModal, item, setShouldUpdate})=>{
    const [itemStatus, setItemStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const ordersService = new OrdersService()

    useEffect(() => {
        setItemStatus(item.status)
    },[item])

    const changeStatus = (order) =>{
        setItemStatus(order)
    }
    const submit = () =>{
        let data = {
            status: itemStatus.toLowerCase()
        }
        setLoading(true)
        ordersService.toggleStatus(item.id, data).then(res=>{
            if(res && res?.status === 200){
                setShouldUpdate(prev=> !prev)
                setModal(false)
            }
            setLoading(false)
        })
    }

    return(
        <Modal className="fade" show={modal} onHide={setModal}>
            <Modal.Header>
            <Modal.Title> Change Status</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={()=> setModal(false)}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                <div className="mt-2 mb-2">
                    {Orders?.map((order,index)=>{
                        return <div key={index}>
                            <input 
                                type='radio'
                                name='orders'
                                value={order}
                                checked={(itemStatus === order.toLowerCase())}
                                onChange={()=> changeStatus(order.toLowerCase())}
                                id={order}
                            />
                            <label for={order} className='mx-2'>{order}</label>
                        </div>
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={()=> setModal(false)} variant="danger light">
                Close
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                    onClick={()=> submit()}
                >Submit</Button>
            </Modal.Footer>
        </Modal>)
}

export default OrdersStatus;