import { useEffect, useState } from "react";
import {AvField, AvForm} from "availity-reactstrap-validation";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import AreasService from "../../../../services/AreasServices";
import SettingService from "../../../../services/SettingServices";
import { toast } from "react-toastify";

const inital = {
    delivery_possibility: true,
    delivery_fee: '',
    cash_in_delivery: '',
    delivery_all_area: true,
    shipping_fee: '',
    areas: []
}
const Delivery = () => {
    const [formData, setFormData] = useState(inital)
    const [loading, setLoading] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const areasService = new AreasService()
    const settingService = new SettingService()

    const formDataHandler = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        settingService.getList().then(res=>{
            let response = res.data.data
            if(response){
                let data = {
                    delivery_possibility: response.delivery_possibility,
                    delivery_fee: response.delivery_fee,
                    cash_in_delivery: response.cash_in_delivery,
                    delivery_all_area: response.delivery_all_area,
                    shipping_fee: response.shipping_fee
                }
                setIsAdd(false)
                setFormData({...data})
            } else {
                setIsAdd(true)
            }
        })
    },[])

    useEffect(()=>{
        if(!formData.delivery_all_area){
            areasService.getList(1).then(res=>{
                let data = res.data.data?.map(are=>{
                    return{
                        ...are,
                        delivery_fee: are?.delivery_fee
                    }
                })
                setFormData({...formData, areas: [...data]})
            })
        }
    }, [formData.delivery_all_area])

    const submit = () =>{
        let data = {
            delivery_possibility: true,
            delivery_all_area: formData.delivery_all_area,
            cash_in_delivery: parseFloat(formData.cash_in_delivery),
            delivery_fee: parseFloat(formData.delivery_fee),
            shipping_fee: parseFloat(formData.shipping_fee)
        }
        data['area_fees'] = formData.areas?.map(area=>{
            return{
                delivery_fee: area.delivery_fee,
                id: area.id
            }
        })
        setLoading(true)
        settingService.create(data).then(res=>{
            setLoading(false)
            if(res?.status === 201){
                toast.success('Delivery Updated Successfully')
                setIsAdd(false)
            }
        })
    }

    return <Card>
        <Card.Body>
            <AvForm onValidSubmit={submit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <label className="text-label">Possible Delivery</label>
                        <Form.Check
                            type="switch"
                            id={`delivery_possibility`}
                            checked={formData.delivery_possibility}
                           onChange={(e)=> setFormData({...formData, delivery_possibility: e.target.checked})}
                        />
                    </Col>
                    {formData.delivery_possibility && <Col md={6}>
                        <label className="text-label">Type of Area</label>
                        <div className="d-flex mt-2" style={{gap: '24px'}}>
                            <label className="text-label">Per Area</label>
                            <Form.Check
                                type="switch"
                                id={`delivery_all_area`}
                                checked={formData.delivery_all_area}
                                onChange={(e)=> setFormData({...formData, delivery_all_area: e.target.checked})}
                            />
                            <label className="text-label">All Area</label>
                        </div>
                    </Col>}
                </Row>
                {formData.delivery_possibility && <Row>
                    <Col md={6}>
                        <AvField
                            label='Cash in Delivery Fees'
                            placeholder='Cash in Delivery Fees'
                            type='number'
                            name='cash_in_delivery'
                            errorMessage="Please Enter a Valid Value"
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: 'This Field is required'
                                },
                            }}
                            value={formData.cash_in_delivery}
                            onChange={(e)=> formDataHandler(e)}
                        />
                    </Col>
                    <Col md={6}>
                        <AvField
                            label='Delivery Fees'
                            placeholder='Delivery Fees'
                            type='number'
                            name='delivery_fee'
                            errorMessage="Please Enter a Valid Value"
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: 'This Field is required'
                                },
                            }}
                            value={formData.delivery_fee}
                            onChange={(e)=> formDataHandler(e)}
                        />
                    </Col>
                    <Col md={6}>
                        <AvField
                            label='Shipping Fee: (Price per Kg)'
                            placeholder='Shipping Fee (Price per Kg)'
                            type='number'
                            name='shipping_fee'
                            // errorMessage="Please Enter a Valid Value"
                            // validate={{
                            //     required: {
                            //         value: true,
                            //         errorMessage: 'This Field is required'
                            //     },
                            // }}
                            value={formData.shipping_fee}
                            onChange={(e)=> formDataHandler(e)}
                        />
                    </Col>
                    {!formData.delivery_all_area && <Row className="my-3 px-3">
                        {formData.areas?.map((area,index)=>{
                        return <Col md={3}>
                            <AvField
                            label={area.name_en}
                            placeholder='Delivery Fee'
                            type='number'
                            name={`${area.delivery_fee}`}
                            errorMessage="Please Enter a Valid Value"
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: 'This Field is required'
                                },
                            }}
                            min={0}
                            value={area.delivery_fee}
                            onChange={(e)=> {
                                let update = formData.areas?.map((are,ind)=>{
                                    if(ind === index){
                                        return{
                                            ...are,
                                            delivery_fee: e.target.value
                                        }
                                    } else{
                                        return are
                                    }
                                })
                                setFormData({...formData, areas: update})
                            }}
                        />
                        </Col>
                    })}
                    </Row>}
                    {/* <Col md={6}>
                        <AvField
                            label='Amount'
                            placeholder='Amount'
                            type='text'
                            name='amount'
                            errorMessage="Please Enter a Valid Value"
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: 'This Field is required'
                                },
                            }}
                            value={formData.amount}
                            onChange={(e)=> formDataHandler(e)}
                        />
                    </Col> */}
                </Row>}
                <div className="d-flex justify-content-between mt-4">
                    <Button variant="secondary" type="button" onClick={()=> setFormData(inital)}>Cancel</Button>
                    {isAdd && <Button variant="primary" type="submit" disabled={loading}>Submit</Button>}
                    {!isAdd && <Button variant="primary" type="button" onClick={()=> setIsAdd(true)} >Edit</Button>}
                </div>
            </AvForm>
        </Card.Body>
    </Card>
}
export default Delivery;