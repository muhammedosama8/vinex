import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CardItem = ({item, index}) =>{
    const [status, setStatus] = useState(null)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

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
                      {item.amount}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.end_date}</td>
                    <td>{item.max_usage}</td>
                    <td>{item.count_usage}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${index}`}
                        checked={status}
                        disabled={!isExist('promo_code')}
                        onChange={(e)=> changeStatusToggle(e)}
                      />
                    </td>
                    <td>
                      {isExist('promo_code') && <Dropdown>
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
                      </Dropdown>}
                    </td>
                  </tr>
    )
}
export default CardItem;