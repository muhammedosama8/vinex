import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { SocialMediaLinks } from "../../../Enums/SocialMedia";

const SocialMedia = ()=>{
    const [links, setLinks] = useState({})

    useEffect(()=>{
        let values={}
        SocialMediaLinks?.map(link=> values[link.value]= '')
        setLinks({...values})
    },[])

    const inputHandler =(e)=>{
        setLinks({...links,[e.target.name]: e.target.value})
    }

    const onSubmit = (e)=> {
        e.preventDefault()
    }

    return(<>
    <Card className="position-relative">
        <Card.Body>
            <form onSubmit={onSubmit}>
                <Row className="mb-3">
                {SocialMediaLinks?.map((link, index)=>{
                    return<Col md={12} className='mb-3'>
                        <label className="text-label">{link.label}:</label>
                        <input
                            type="text"
                            name={link.value}
                            className="form-control"
                            placeholder={`${link.label} Link`}
                            value={links[link?.value]}
                            onChange={(e)=> inputHandler(e)}
                        />
                    </Col>
                })}
                </Row>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
            </form>
        </Card.Body>
    </Card>
    </>)
}
export default SocialMedia;