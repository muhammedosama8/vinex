import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";
import '../style.scss'

const UserProfile =()=>{
    const [edit, setEdit] = useState(false)
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState({})
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
        setUser({
            ...window?.history?.state?.usr,
            phone: window?.history?.state?.usr.user_phones?.filter(res=> res.is_default)[0]?.phone
        })
        
        let orders =[
            {id: 1,order: 't-shirt', quantity: '3', total_price: 280, payment_status: 'cash', status: 'Ordered'},
            {id: 2,order: 't-shirt', quantity: '3', total_price: 380, payment_status: 'visa', status: 'Processing'},
            {id: 3,order: 't-shirt', quantity: '3', total_price: 180, payment_status: 'cash', status: 'Shipped'},
            {id: 4,order: 't-shirt', quantity: '3', total_price: 80, payment_status: 'visa', status: 'Delivered'},
            {id: 5,order: 't-shirt', quantity: '3', total_price: 80, payment_status: 'visa', status: 'Canceled'},
          ]
          setOrders([...orders])
    },[])

    const onSubmit = (e) =>{
        e.preventDefault();
        setEdit(false)
    }

    const handleInput = (e) =>{
        setUser({...user, [e.target.name]: e.target.value})
    }
    return(<div>
        {!edit && <Card>
            <Card.Body>
                <Row>
                    <Col md={6} className='mb-2'>
                        <h4>{Translate[lang]?.first_name}</h4>
                        <p>{user.f_name}</p>
                    </Col>
                    <Col md={6} className='mb-2'>
                        <h4>{Translate[lang]?.last_name}</h4>
                        <p>{user.l_name}</p>
                    </Col>
                    <Col md={6} className='mb-2'>
                        <h4>{Translate[lang]?.email}</h4>
                        <p className="mb-0">{user.email}</p>
                    </Col>
                    <Col md={6}>
                        <h4>{Translate[lang]?.phone}</h4>
                        <p className="mb-0">{user.phone}</p>
                    </Col>
                </Row>
                {/* {isExist('users') && <button className="edit" onClick={()=> setEdit(true)}>
                    <i className="la la-edit"></i>
                </button>} */}
            </Card.Body>
        </Card>}
        {!edit && <Card>
            <Card.Body>
                <h4>{Translate[lang]?.orders}</h4>
                <Row>
                <Table responsive>
                    <thead>
                    <tr className='text-center'>
                        <th>
                        <strong>I.D</strong>
                        </th>
                        <th>
                        <strong>Type</strong>
                        </th>
                        <th>
                        <strong>Quantity</strong>
                        </th>
                        <th>
                        <strong>Total Price</strong>
                        </th>
                        <th>
                        <strong>Payment Method</strong>
                        </th>
                        <th>
                        <strong>STATUS</strong>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((item, index)=>{
                        return <tr key={index} className='text-center'>
                        <td>
                        <strong>{item.id}</strong>
                        </td>                    
                        <td>{item.order}</td>
                        <td>{item.quantity}</td>
                        <td>{item.total_price}</td>
                        <td>{item.payment_status}</td>
                        <td>
                        <Badge
                            variant={`${item.status === 'Delivered' ? 'success' : 
                                    item.status === 'Canceled' ? 'danger' :
                                    item.status === 'Ordered' ? 'primary' :
                                    item.status === 'Processing' ? 'warning' :
                                    item.status === 'Shipped' ? 'info' : ''}  light`}
                        >
                            {item.status}
                        </Badge>
                        </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
                </Row>
            </Card.Body>
        </Card>}
        {edit && <Card>
            <Card.Body>
                <form onSubmit={onSubmit}>
                <Row>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">{Translate[lang]?.first_name}</label>
                        <input 
                            type='text' 
                            className="form-control"
                            name='f_name' 
                            placeholder={Translate[lang]?.first_name}
                            value={user.f_name}
                            required
                            onChange={(e)=> handleInput(e)}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">{Translate[lang]?.last_name}</label>
                        <input 
                            type='text' 
                            className="form-control"
                            name='l_name' 
                            placeholder={Translate[lang]?.last_name}
                            value={user.l_name}
                            required
                            onChange={(e)=> handleInput(e)}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">{Translate[lang]?.email}</label>
                        <input 
                            type='email' 
                            className="form-control"
                            placeholder={Translate[lang]?.email}
                            name='email' 
                            value={user.email}
                            required
                            onChange={(e)=> handleInput(e)}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">{Translate[lang]?.phone}</label>
                        <input 
                            type='number' 
                            className="form-control"
                            placeholder={Translate[lang]?.phone}
                            name='phone' 
                            value={user.phone}
                            required
                            onChange={(e)=> handleInput(e)}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">{Translate[lang]?.address}</label>
                        <input 
                            type='text' 
                            className="form-control"
                            placeholder={Translate[lang]?.address}
                            name='address' 
                            value={user.address}
                            required
                            onChange={(e)=> handleInput(e)}
                        />
                    </Col>

                    <div className='col-md-12 d-flex justify-content-between mt-4'>
                        <div>
                        <Button variant="secondary" onClick={()=> setEdit(false)}>
                        {Translate[lang]?.cancel}
                        </Button>
                        </div>
                        <div>
                        <Button 
                            variant="primary" 
                            className="light"
                            type="submit">
                            {Translate[lang]?.submit}
                        </Button>
                        </div>
                    </div>
                </Row>
                </form>
            </Card.Body>
        </Card>}
    </div>)
}
export default UserProfile;