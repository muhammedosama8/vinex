import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import '../style.scss'

const Profile =()=>{
    const [edit, setEdit] = useState(false)
    const path = window.location.pathname
    const id = path?.split('/')[2]

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
                <button className="edit" onClick={()=> setEdit(true)}>
                    <i className="la la-edit"></i>
                </button>
            </Card.Body>
        </Card>}
        {!edit && <Card>
            <Card.Body>
                <h4>Orders</h4>
                <Row>
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