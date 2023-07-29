import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import '../style.scss'

const Profile =()=>{
    const [edit, setEdit] = useState(false)
    const [orders, setOrders] = useState([])
    const path = window.location.pathname
    const id = path?.split('/')[2]
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
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
    return(<div>
        {!edit && <Card>
            <Card.Body>
                <Row>
                    <Col md={6} className='mb-2'>
                        <h4>Name</h4>
                        <p>Muhammed Osama</p>
                    </Col>
                    <Col md={6} className='mb-2'>
                        <h4>Email</h4>
                        <p>muhammed@gmail.com</p>
                    </Col>
                    <Col md={6}>
                        <h4>Phone</h4>
                        <p>01004545333</p>
                    </Col>
                    <Col md={6}>
                        <h4>Address</h4>
                        <p>12 gmal street, Giza, Cairo</p>
                    </Col>
                </Row>
                {isExist('users') && <button className="edit" onClick={()=> setEdit(true)}>
                    <i className="la la-edit"></i>
                </button>}
            </Card.Body>
        </Card>}
        {!edit && <Card>
            <Card.Body>
                <h4>Orders</h4>
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
                        <label className="text-label">Name</label>
                        <input 
                            type='text' 
                            className="form-control"
                            name='name' 
                            placeholder="Name"
                            value='Muhammed Osama'
                            required
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">Email</label>
                        <input 
                            type='email' 
                            className="form-control"
                            placeholder="Email"
                            name='name' 
                            value='muhammed@gmail.com'
                            required
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">Phone</label>
                        <input 
                            type='number' 
                            className="form-control"
                            placeholder="Phone"
                            name='phone' 
                            value='01007656888'
                            required
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <label className="text-label">Address</label>
                        <input 
                            type='text' 
                            className="form-control"
                            placeholder="Address"
                            name='address' 
                            value='12 gmal street, Giza, Cairo'
                            required
                        />
                    </Col>

                    <div className='col-md-12 d-flex justify-content-between mt-4'>
                        <div>
                        <Button variant="secondary" onClick={()=> setEdit(false)}>
                            Cancel
                        </Button>
                        </div>
                        <div>
                        <Button 
                            variant="primary" 
                            className="light"
                            type="submit">
                            Submit
                        </Button>
                        </div>
                    </div>
                </Row>
                </form>
            </Card.Body>
        </Card>}
    </div>)
}
export default Profile;