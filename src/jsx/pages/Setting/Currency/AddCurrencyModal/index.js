import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import Select from 'react-select'
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import CountryiesService from "../../../../../services/CountriesService";
import CurrencyService from "../../../../../services/CurrencyService";

const AddCurrencyModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        rate: '',
        country: '',
    })
    const [isAdd, setIsAdd] = useState(false)
    const [ countriesOptions, setCountriesOptions] = useState([])
    const countriesService = new CountryiesService()
    const currencyService = new CurrencyService()

    useEffect(()=> {
        countriesService?.getList().then(res=>{
            if(res.data?.status === 200){
                let countries =  res.data?.data?.filter(c=> c?.id !== 1)?.map(item=>{
                   return{
                      id: item?.id,
                      value: item?.id,
                      label: item.name_en
                   }
                })
                setCountriesOptions(countries)
             }
        })
    },[])

    useEffect(() => {
        if(Object.keys(item).length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                country: {
                    ...item.country,
                    label: `${item.country?.name_en}`,
                    value: item.country.id
                },
                id: item?.id,
                rate: item.rate,
            })
        }
    },[item])

    const submit = () =>{
        if(!formData?.country){
            return
        }
        
        setLoading(true)
        if(isAdd){
            let data ={
                currency: [{
                    rate: parseFloat(formData?.rate),
                    country_id: formData.country?.value
                }]
            }
            currencyService?.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('Currency Added Successfully')
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
                setLoading(false)
            })
        } else {
            let data ={
                rate: parseFloat(formData?.rate),
                country_id: formData.country?.value
            }
            currencyService?.update(formData?.id, data)?.then(res=>{
                if(res?.status === 200){
                    toast.success('Currency Updated Successfully')
                    setAddModal()
                    setShouldUpdate(prev=> !prev)
                }
                setLoading(false)
            })
        }
    }

    return(
        <Modal className="fade" show={addModal} onHide={setAddModal}>
            <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? 'Add': 'Edit'} Currency</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={setAddModal}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                
                    <Row>
                        <Col md={12}>
                            <div className='form-group w-100'>
                            <label>Country</label>
                            <Select
                                value={formData.country}
                                name="country"
                                options={countriesOptions}
                                onChange={(e)=> setFormData({...formData, country: e})}
                            />
                            </div>
                        </Col>
                        <Col md={12}>
                            <AvField
                                    label='Rate'
                                    type='number'
                                    placeholder='Rate'
                                    bsSize="lg"
                                    name='rate'
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: 'This Field is required'
                                        }
                                    }}
                                    value={formData.rate}
                                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                                />
                        </Col>
                    </Row>
                
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
                Close
            </Button>
            <Button 
                disabled={loading}
                variant="primary" 
                type='submit'
                >{isAdd ? "Add" : "Edit"}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddCurrencyModal;