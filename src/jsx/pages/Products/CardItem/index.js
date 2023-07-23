import { useEffect, useState } from "react";
import { Badge, Dropdown, Form } from "react-bootstrap";
import avatar1 from "../../../../images/1.jpg";

const CardItem = ({item, index}) =>{
    const [status, setStatus] = useState(null)

    useEffect(()=>{
        setStatus(item.status)
    },[item])

    const changeStatusToggle = (e)=>{
        setStatus(e.target.checked)
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
                    <td>
                        <img
                          src={avatar1}
                          className="rounded-lg"
                          width="40"
                          alt={item.id}
                        />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Badge variant="success light">{item.category}</Badge>
                    </td>
                    <td>{item.price} LE</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${index}`}
                        checked={status}
                        onChange={(e)=> changeStatusToggle(e)}
                      />
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
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
    )
}
export default CardItem;