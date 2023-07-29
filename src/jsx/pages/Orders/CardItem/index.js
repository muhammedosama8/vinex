import { useEffect, useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import DeleteModal from "../../../common/DeleteModal";

const CardItem = ({item, index, setModal, setItem}) =>{
    const [status, setStatus] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
        setStatus(item.status)
    },[item])

    const changeStatusToggle = ()=>{
      if(!isExist('orders')){
        return
      }
      setModal(true)
      setItem(item)
    }
    
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>                    
                    <td>{item.customer_name}</td>
                    <td>{item.customer_email}</td>
                    <td>{item.customer_phone}</td>
                    <td>{item.total_price}</td>
                    <td>{item.payment_status}</td>
                    <td>
                      <Badge
                        onClick={changeStatusToggle} 
                        variant={`${item.status === 'Delivered' ? 'success' : 
                                  item.status === 'Canceled' ? 'danger' :
                                  item.status === 'Ordered' ? 'primary' :
                                  item.status === 'Processing' ? 'warning' :
                                  item.status === 'Shipped' ? 'info' : ''}  light`}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      {isExist('orders') && <Dropdown>
                        <Dropdown.Toggle
                          // variant="success"
                          className="light sharp i-false"
                        >
                          <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item>Edit</Dropdown.Item> */}
                          <Dropdown.Item onClick={()=> setDeleteModal(true)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>}
                    </td>
                    {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.customer_name}
                      deletedItem={item.id}
                      // modelService={}
                      onCloseModal={setDeleteModal}
                    />}
        </tr>
    )
}
export default CardItem;