import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SocialMediaService from "../../../../services/SocialMediaService";
import { SocialMediaLinks } from "../../../Enums/SocialMedia";

const SocialMedia = ()=>{
    const [links, setLinks] = useState({})
    const [loading, setLoading] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const socialMediaService = new SocialMediaService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
        socialMediaService?.getList()?.then(res=>{
            if(res.status === 200 && res.data?.data){
                setLinks({...res.data?.data})
                setIsAdd(false)
            } else{
                let values={}
                SocialMediaLinks?.map(link=> values[link.value]= '')
                setLinks({...values})
                setIsAdd(true)
            }
        })
    },[])

    const inputHandler =(e)=>{
        setLinks({...links,[e.target.name]: e.target.value})
    }

    function areAllValuesFilled(object) {
        for (let key in object) {
          if (!object[key]) {
            return false;
          }
        }
        return true;
      }

    const onSubmit = (e)=> {
        e.preventDefault()
        // const result = areAllValuesFilled(links);
        // if(result) return

        setLoading(true)
        socialMediaService?.create(links)?.then(res=>{
            if(res.status === 201){
                toast?.success('Added Social Links Successfully')
                setIsAdd(false)
            }
            setLoading(false)
        }).catch(error=> toast.error(error))
    }

    return(<>
    <Card>
        <Card.Body className="position-relative">
            <form onSubmit={onSubmit}>
                <Row className="mb-3">
                {SocialMediaLinks?.map((link, index)=>{
                    return<Col md={6} className='mb-3'>
                        <label className="text-label">{link.label}:</label>
                        <input
                            type="text"
                            name={link.value}
                            disabled={!isAdd}
                            style={{
                                background: !isAdd ? 'rgb(238 238 238)' : '#fff'
                            }}
                            className="form-control"
                            placeholder={`${link.label} Link`}
                            value={links[link?.value]}
                            onChange={(e)=> inputHandler(e)}
                        />
                    </Col>
                })}
                </Row>
            {isExist('social_media') && <div className="d-flex justify-content-end">
                {isAdd && <Button variant="primary" type="submit" disabled={loading}>
                    Submit
                </Button>}
                {!isAdd && <Button variant="primary" type="button" onClick={()=> setIsAdd(true)}>
                    Edit
                </Button>}
            </div>}
            </form>
        </Card.Body>
    </Card>
    </>)
}
export default SocialMedia;