import {AvField, AvForm} from "availity-reactstrap-validation";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import PaymentService from "../../../../services/Payment";

const Payment = () =>{
    const [iban, setIban] = useState('')
    const paymentService = new PaymentService()

    const submit = ()=> {
        let data ={
            iban: iban
        }
        paymentService.create(data).then(res=>{
            if(res?.status === 201){
                toast.success('Iban Updated Successfully')
            }
        })
    }

    return <Card>
        <Card.Body>
            <AvForm onValidSubmit={submit}>
                <Row className="my-3">
                    <Col md={8}>
                        <AvField
                            label='Iban'
                            name='iban'
                            type='text'
                            placeholder='Enter Iben'
                            value={iban}
                            validate={{
                                required: {
                                    value:true,
                                    errorMessage: 'This Field is required'
                                },
                            }}
                            onChange={(e)=> setIban(e.target.value)}
                        />
                    </Col>
                </Row>
                <div className="d-flex justify-content-between">
                    <div></div>
                    <Button variant="primary">
                        Submit
                    </Button>
                </div>
            </AvForm>
        </Card.Body>
    </Card>
}
export default Payment;