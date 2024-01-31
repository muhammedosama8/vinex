import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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

    const print = () => {
        const printWindow = window.open("", "_blank");
        let itemsText = ``;
        for (let i = 0; i < product?.variant?.length; i++) {
            if(product?.variant[i].variant?.name_en === 'color'){
                itemsText += `<p style="margin-bottom: 0.5rem">
                ${lang === 'en' ? product?.variant[i].variant?.name_en : product?.variant[i].variant?.name_ar}: <span style="
                    background: ${product?.variant[i].variant_value?.value_en};
                    height: 24px;
                    width: 24px;
                    display: inline-block;
                    margin: 0 4px;
                "></span>
                </p>`
            } else{
                itemsText += `<p style="margin-bottom: 0.5rem">
                ${lang === 'en' ? product?.variant[i].variant?.name_en : product?.variant[i].variant?.name_ar}: ${lang === 'en' ? product?.variant[i].variant_value?.value_en : product?.variant[i].variant_value?.value_ar}
                </p>`
            }
        }

        let htmlCode = `<html>
        <head>
            <title>${Translate[lang]?.invoice}</title>
        </head>
        <body style="direction: ${lang==='en' ? 'ltr' : 'rtl'};">
        <div>
        <div>
            <div style="background-color: rgb(222 222 222 / 21%); border: 1px solid #c3c1c1; border-radius: 12px; padding: 13px; text-align: center">
                <img src=${logo} alt="logo" style="width: 5rem;" />
            </div>
            <div style="margin-top: 1rem; text-align: center">
                <p style="margin-bottom: 0.5rem">${Translate[lang].welcome} ${order?.user?.f_name} ${order?.user?.l_name}</p>
                <h3 style="margin: 0">${Translate[lang].application_submitted}</h3>
            </div>
            <div style="margin-top: 1rem">
                <div style="text-align: center">
                    <p style="margin-bottom: 0.5rem">${Translate[lang].details} ${Translate[lang].product}</p>
                </div>
                <div>
                    <div style="text-align: center; width: 50%; margin-top: 1rem">
                    <div style="display: flex; justify-content: space-between; border: 1px solid #dedede; padding: 15px 25px">
                        <div>
                            <img src=${product?.images?.length ? product?.images[0]?.url : ''} alt="product" style="width: 8rem" />
                        </div>
                        <div className="details">
                            <p style="margin-bottom: 0.5rem">${lang === 'en' ? product?.name_en : product?.name_ar}</p>
                            <p style="margin-bottom: 0.5rem">${Translate[lang].quantity}: ${location?.state?.sub_carts[0]?.amount}</p>
                            <p style="margin-bottom: 0.5rem">${Translate[lang].price}: ${order?.sub_total}</p>
                            ${itemsText}
                        </div>
                    </div>
                    </div>
                </div>

                <div style="margin-top: 1rem; display: flex; justify-content: space-between ;background-color: rgb(222 222 222 / 21%); border: 1px solid #c3c1c1; border-radius: 12px; padding: 13px;">
                    <p style="margin: 0">${Translate[lang].order_id}: ${order?.id}</p>
                    <p style="margin: 0">${Translate[lang].day}: ${order?.day?.split('T')[0]}</p>
                </div>

                <div style="padding-top: 1rem; display: flex">
                    <div style="width: 33.333333%; padding-left: 1rem ; padding-right: 1rem">
                            <div style="background-color: #dedede; padding-top: 1rem; padding-bottom: 1rem; padding-left: 1rem ; padding-right: 1rem">
                                <h4 style="margin: 0">${Translate[lang].details} ${Translate[lang].address}</h4>
                            </div>
                            <div style="background-color: rgb(222 222 222 / 21%); padding-top: 1.5rem; padding-bottom: 1.5rem; padding-left: 1rem ; padding-right: 1rem">
                                <p style="margin-bottom: 0.5rem">${Translate[lang].street}: ${order?.user_address?.street}</p>
                                <p style="margin-bottom: 0.5rem">${Translate[lang].house_number}: ${order?.user_address?.houseNumber}</p>
                                <p style="margin-bottom: 0.5rem">${Translate[lang].block}: ${order?.user_address?.block}</p>
                                <p style="margin-bottom: 0.5rem">${Translate[lang].address_name}: ${order?.user_address?.addressName}</p>
                            </div>
                    </div>
                    <div style="width: 66.666666%; padding-left: 1rem ; padding-right: 1rem">
                            <div style="background-color: #dedede; padding-top: 1rem; padding-bottom: 1rem; padding-left: 1rem ; padding-right: 1rem">
                                <h4 style="margin: 0">${Translate[lang].details} ${Translate[lang].order}</h4>
                            </div>
                            <div style="background-color: rgb(222 222 222 / 21%); padding-top: 1.5rem; padding-bottom: 1.5rem; padding-left: 1rem ; padding-right: 1rem ">
                                <p style="margin-bottom: 0.5rem">${Translate[lang].total_price}: ${order?.total}</p>
                                <p style="margin-bottom: 0.5rem">${Translate[lang].phone}: ${order?.user?.phone}</p>
                                <p style="margin-bottom: 0.5rem">${lang === 'en' ? product?.description_en : product?.description_ar}</p>
                            </div>
                    </div>
                </div>
                <div style="text-align: center;">
                    <p style="margin: 0; font-size: 14px">${Translate[lang].thanks} ${websiteName}</p>
                    <p style="margin: 0; font-size: 14px">Powered by leap solutions kw</p>
                </div>
            </div>
        </div>
    </div>
        </body>
        </html>
        `;
        printWindow.document.write(htmlCode);
    
        printWindow.document.close();
    
        setTimeout(() => {
          printWindow.print();
        }, 1000);
    };

    return<>
    <div className="mb-3" style={{textAlign: 'end'}}>
        <Button variant='primary' onClick={print}>{Translate[lang].print}</Button>
    </div>
    <Card>
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
                    <Col md={4} sm={6}>
                    <div className="product-card d-flex p-3 justify-content-between align-items-center">
                        <div className="prod-img">
                            <img src={product?.images?.length ? product?.images[0]?.url : ''} alt="product" style={{width: '8rem'}} />
                        </div>
                        <div className="details">
                            <p className="mb-1">{lang === 'en' ? product?.name_en : product?.name_ar}</p>
                            <p className="mb-1">{Translate[lang].quantity}: {location?.state?.sub_carts[0]?.amount}</p>
                            <p className="mb-1">{Translate[lang].price}: {order?.sub_total}</p>
                            {product?.variant?.map(res=>{
                                if(res.variant?.name_en === 'color'){
                                    return <p className="mb-1">{lang === 'en' ? res.variant?.name_en : res.variant?.name_ar}: <span style={{
                                        background: res.variant_value?.value_en,
                                        height: '24px',
                                        width: '24px',
                                        display: 'inline-block',
                                        margin: '0 4px'
                                    }}></span></p>
                                }
                                return <p className="mb-1">
                                    {lang === 'en' ? res.variant?.name_en : res.variant?.name_ar}: {lang === 'en' ? res.variant_value?.value_en : res.variant_value?.value_ar}
                                </p>
                            })}
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
                                <p className="mb-1">{Translate[lang].phone}: {order?.user?.phone}</p>
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
    </>
}
export default Invoice;