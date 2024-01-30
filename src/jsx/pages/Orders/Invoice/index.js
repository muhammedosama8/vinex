import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ControlService from "../../../../services/ControlServices";
import { Translate } from "../../../Enums/Tranlate";
import './style.scss'

const Invoice = () =>{
    const [websiteName, setWebsiteName] = useState('')
    const [logo, setLogo] = useState('')
    const [order, setOrder] = useState({})
    const [product, setProduct] = useState({})
    const lang = useSelector(state=> state.auth?.lang)
    const location = useLocation()
    const controlService = new ControlService()

    useEffect(()=>{
        setOrder(location?.state)
        setProduct(location?.state?.sub_carts[0]?.product)
    },[])

    useEffect(()=>{
        controlService.getList().then(res=>{
            if(res?.status === 200){
                setWebsiteName(res.data?.data?.website_title)
                setLogo(res.data?.data?.dashboard_logo)
            }
        })
    },[])

    return<Card>
        <Card.Body>
            <div className="invoice-header text-center">
                <img src={logo} alt="logo" />
            </div>
            <div className="invoice-title text-center mt-4">
                <p className="mb-1">{Translate[lang].welcome} {order?.user?.f_name} {order?.user?.l_name}</p>
                <h3>{Translate[lang].application_submitted}</h3>
            </div>
            <div className="invoice-details mt-4">
                <div className="text-center">
                    <p className="mb-1">{Translate[lang].details} {Translate[lang].product}</p>
                </div>
                <Row>
                    <Col md={4} sm={6} className="text-center">
                    <div className="product-card">
                        <div className="prod-img">
                            {/* <img src={order?.sub_carts[0]?.product} alt="product" /> */}
                        </div>
                        <div className="details">
                            <p className="mb-1">{lang === 'en' ? product?.name_en : product?.name_ar}</p>
                            <p className="mb-1">{Translate[lang].quantity}: {location?.state?.sub_carts[0]?.amount}</p>
                            <p className="mb-1">{Translate[lang].price}: {order?.sub_total}</p>
                        </div>
                    </div>
                    </Col>
                </Row>

                <div className="invoice-header py-4 mt-4 d-flex justify-content-between">
                    <p className="mb-0">{Translate[lang].order_id}: {order?.id}</p>
                    <p className="mb-0">{Translate[lang].day}: {order?.day?.split('T')[0]}</p>
                </div>

                <Row className="mt-4">
                    <Col md={4} sm={6}>
                            <div style={{background: '#dedede'}} className='py-3 px-3'>
                                <h4>{Translate[lang].details} {Translate[lang].address}</h4>
                            </div>
                            <div className="details py-4 px-3" style={{background: 'rgb(222 222 222 / 21%)'}}>
                                <p className="mb-1">{Translate[lang].street}: {order?.user_address?.street}</p>
                                <p className="mb-1">{Translate[lang].house_number}: {order?.user_address?.houseNumber}</p>
                                <p className="mb-1">{Translate[lang].block}: {order?.user_address?.block}</p>
                                <p className="mb-1">{Translate[lang].address_name}: {order?.user_address?.addressName}</p>
                            </div>
                    </Col>
                    <Col md={8} sm={6}>
                            <div style={{background: '#dedede'}} className='py-3 px-3'>
                                <h4>{Translate[lang].details} {Translate[lang].order}</h4>
                            </div>
                            <div className="details py-4 px-3" style={{background: 'rgb(222 222 222 / 21%)'}}>
                                <p className="mb-1">{Translate[lang].total_price}: {order?.total}</p>
                                <p className="mb-1">{lang === 'en' ? product?.description_en : product?.description_ar}</p>
                            </div>
                    </Col>
                </Row>
                <div className="text-center mt-5">
                    <p className="mb-0 fs-14">{Translate[lang].thanks} {websiteName}</p>
                    <p className="mb-0 fs-14">Powered by leap solutions kw</p>
                </div>
            </div>
        </Card.Body>
    </Card>
}
export default Invoice;