import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardItem = ({item, index,setShouldUpdate}) =>{
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
                    <td>
                      <Link to={`/users/${item.id}/${item.name}`} 
                        style={{fontWeight: '800', textDecoration:'underline', textTransform: 'capitalize'}}>
                        {item.f_name} {item.l_name} 
                      </Link>
                    </td>
                    <td>
                      {item.email}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.count_orders}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${index}`}
                        checked={status}
                        disabled={!isExist('users')}
                        onChange={(e)=> changeStatusToggle(e)}
                      />
                    </td>
                    <td>
                     {isExist('users') && <Dropdown>
                        <Dropdown.Toggle
                          // variant="success"
                          className="light sharp i-false"
                        >
                          <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item>Edit</Dropdown.Item> */}
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>}
                    </td>
                  </tr>
    )
}
export default CardItem;