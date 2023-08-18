import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CardItem = ({item, index,setShouldUpdate}) =>{
    const [status, setStatus] = useState(null)
    const navigate = useNavigate()
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
                      <p className="mb-0 user" onClick={()=> navigate(`/users/${item.id}/${item.f_name}`, {state:  item})}
                        style={{fontWeight: !!item.f_name && '800',opacity:'.75', textDecoration:!!item.f_name &&'underline', textTransform: 'capitalize'}}>
                        {item.f_name || '-'} {item.l_name} 
                      </p>
                    </td>
                    <td>
                      {item.email || '-'}
                    </td>
                    <td>
                      {item?.user_phones?.filter(res=> !!res.is_default)[0]?.country_code}{item?.user_phones?.filter(res=> !!res.is_default)[0]?.phone || '-'}
                    </td>
                    <td>{item.count_orders || '-'}</td>
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