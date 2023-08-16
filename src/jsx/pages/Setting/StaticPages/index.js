import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cover from '../../../../images/cover.jpg'
import './style.scss'
const pages = [
    { name: 'About', path:'/pages/about' },
    { name: 'Privacy', path:'/pages/privacy' },
    { name: 'FAQs', path:'/pages/faqs' }
]
const StaticPages = () =>{
    const navigate= useNavigate()
    return<>
    <Card>
        <Card.Body>
            <Row>
                {pages?.map((page,index)=>{
                    return <Col key={index} md={6}>
                        <Card className="pages-card" onClick={()=> navigate(page.path)}>
                            <h1>{page.name}</h1>
                        </Card>
                    </Col>
                })}
            </Row>
        </Card.Body>
    </Card>
    </>
}
export default StaticPages;