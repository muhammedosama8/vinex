import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const CardItem = ({item, index}) =>{
    const [status, setStatus] = useState(null)

    useEffect(()=>{
        setStatus(item.status)
    },[item])

    const changeStatusToggle = (e)=>{
        setStatus(e.target.checked)
    }

    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{item.name}</td>
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
                          // variant="success"
                          className="light sharp i-false"
                        >
                          <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
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