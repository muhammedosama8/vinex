import { useEffect, useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { DropDownIcon } from "../../../common/icons";

const CardItem = ({item, index, setModal, setItem}) =>{
    const [status, setStatus] = useState(null)

    useEffect(()=>{
        setStatus(item.status)
    },[item])

    const changeStatusToggle = ()=>{
        setModal(true)
        setItem(item)
    }
    
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{item.delivery_date}</td>
                    
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
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="light sharp i-false"
                        >
                          {DropDownIcon}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item>Edit</Dropdown.Item> */}
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
    )
}
export default CardItem;