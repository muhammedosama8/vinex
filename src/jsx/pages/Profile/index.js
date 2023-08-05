import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {AvField, AvForm} from "availity-reactstrap-validation";
import { useState } from "react";
import AdminService from "../../../services/AdminService";
import { toast } from "react-toastify";
import BaseService from "../../../services/BaseService";

const Profile = () =>{
    const Auth = useSelector(state=> state.auth?.auth?.admin)
    const [admin, setAdmin] = useState(Auth)
    const [isAdd, setIsAdd] = useState(false)
    const adminService = new AdminService()

    const handlerText = (e)=>{
        setAdmin({...admin, [e.target.name]: e.target?.value})
    }

    const submit = ()=>{
        let data = {
            f_name: admin.f_name,
            l_name: admin.l_name,
            phone: admin.phone,
            email: admin.email,
            rules: admin?.admin_roles
        }
        if(!!admin.avatar) data['avatar']= admin.avatar
        adminService?.update(admin?.id, data)?.then(res=>{
            if(res?.data?.status === 200){
                toast.success('Profile Updated Successfully')
                setIsAdd(true)
            }
        })
    }

    const fileHandler = (e) => {
        let filesAll = e.target.files
        const filesData = Object.values(filesAll)
        
        new BaseService().postUpload(filesData[0]).then(res=>{
            if(res.data.status){
                setAdmin({...admin, avatar: res.data.url})
            }
        })
    }

    return<>
        <Card>
            <Card.Body>
                <AvForm onValidSubmit={submit}>
                    <Row>
                        <Col md={12} className='mb-3'>
                            <div>
                                {!!admin?.avatar ? 
                                    <img src={admin?.avatar} 
                                        alt='profile' 
                                        style={{width: '96px', height: '96px', borderRadius: '50%'}} /> 
                                    :
                                <div>
                                    <i className="la la-user" 
                                        style={{
                                            fontSize: '6rem',
                                            border: '1px solid #dedede',
                                            borderRadius: '50%'
                                        }}>
                                    </i>
                                    {isAdd && 
                                        <input 
                                            type='file' 
                                            onChange={(e)=>fileHandler(e)} 
                                            style={{
                                                position: 'absolute',
                                                left: '14px',
                                                width: '94px',
                                                height: '94px',
                                                opacity: '0'
                                            }}
                                        />}
                                </div>}
                            </div>
                        </Col>
                        <Col md={6}>
                            <AvField
                                label='First Name'
                                type='text'
                                placeholder='First Name'
                                bsSize="lg"
                                name='f_name'
                                disabled={!isAdd}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: '/^[A-Za-z0-9 ]+$/',
                                        errorMessage: `Name format is invalid`
                                    }
                                }}
                                value={admin.f_name}
                                onChange={(e)=> handlerText(e)}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label='Last Name'
                                type='text'
                                placeholder='Last Name'
                                bsSize="lg"
                                name='l_name'
                                disabled={!isAdd}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: '/^[A-Za-z0-9 ]+$/',
                                        errorMessage: `Name format is invalid`
                                    }
                                }}
                                value={admin.l_name}
                                onChange={(e)=> handlerText(e)}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label='Email'
                                type='email'
                                placeholder='Email'
                                bsSize="lg"
                                disabled={!isAdd}
                                name='email'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    }
                                }}
                                value={admin.email}
                                onChange={(e)=> handlerText(e)}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label='Phone'
                                type='number'
                                placeholder='Phone'
                                bsSize="lg"
                                disabled={!isAdd}
                                name='phone'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'This Field is required'
                                    },
                                    pattern: {
                                        value: '/^[0-9 ]+$/',
                                        errorMessage: `Phone format is invalid`
                                    }
                                }}
                                value={admin.phone}
                                onChange={(e)=> handlerText(e)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4 text-right">
                        <Col md={12}>
                            {isAdd && <Button type="submit" variant="primary">
                                Update
                            </Button>}
                            {!isAdd && <Button type="button" variant="primary" onClick={()=> setIsAdd(true)}>
                                Edit
                            </Button>}
                        </Col>
                    </Row>
                </AvForm>
            </Card.Body>
        </Card>
    </>
}
export default Profile;