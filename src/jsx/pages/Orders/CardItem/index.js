import { useEffect, useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";

const CardItem = ({item, index, setModal, setItem}) =>{
    const [status, setStatus] = useState(null)

    useEffect(()=>{
        setStatus(item.status)
    },[item])

    const changeStatusToggle = ()=>{
        setModal(true)
        setItem(item)
    }

    const svg1 = (
        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <circle fill="#000000" cx="5" cy="12" r="2"></circle>
            <circle fill="#000000" cx="12" cy="12" r="2"></circle>
            <circle fill="#000000" cx="19" cy="12" r="2"></circle>
          </g>
        </svg>
    );
    
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
                          {svg1}
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