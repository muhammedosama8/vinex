import {AvField, AvForm} from "availity-reactstrap-validation";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentService from "../../../../services/Payment";
import Loader from "../../../common/Loader";
import { Translate } from "../../../Enums/Tranlate";

const Payment = () =>{
    const [iban, setIban] = useState('')
    const [loading, setLoading] = useState(false)
    const paymentService = new PaymentService()
    const lang = useSelector(state=> state.auth.lang)

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

    if(loading){
        return <Card className="py-5" style={{height: '300px'}}>
            <Card.Body>
                <Loader />
            </Card.Body>
      </Card>
    }

    return <Card>
        <Card.Body>
            <AvForm onValidSubmit={submit}>
                <Row className="my-3">
                    <Col md={8}>
                        <AvField
                            label={Translate[lang].iban}
                            name='iban'
                            type='text'
                            placeholder={Translate[lang].iban}
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
                    {Translate[lang].submit}
                    </Button>
                </div>
            </AvForm>
        </Card.Body>
    </Card>
}
export default Payment;