import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Translate } from "../../../Enums/Tranlate";
import './style.scss'
const pages = [
    { name: 'About',type: 'about',label: 'about', path:'/pages/about' },
    { name: 'Privacy',type: 'Privacy', label: 'privacy', path:'/pages/privacy' },
    { name: 'FAQs',type: 'faqs', label: 'faqs', path:'/pages/faqs' }
]
const StaticPages = () =>{
    const navigate= useNavigate()
    const lang = useSelector(state=> state.auth.lang)
    return<>
    <Card>
        <Card.Body>
            <Row>
                {pages?.map((page,index)=>{
                    return <Col key={index} md={6}>
                        <Card className="pages-card" onClick={()=> navigate(page.path, {state: page.type})}>
                            <h1>{Translate[lang][page.label]}</h1>
                        </Card>
                    </Col>
                })}
            </Row>
        </Card.Body>
    </Card>
    </>
}
export default StaticPages;