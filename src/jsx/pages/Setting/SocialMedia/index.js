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
    // const [selectedSocial, setSelectedSocial] = useState([])
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

    const onSubmit = (e)=> {
        e.preventDefault()
        // const result = areAllValuesFilled(links);
        // if(result) return
        // if(!links.facebook && !links.instagram && !links.snapchat && !links.tiktok
        //     && !links.twitter && !links.whatsapp){
        //         toast.error('Enter Value')
        //         return
        // }
        let data = {}
        if(!!links.facebook) data['facebook'] = links.facebook
        if(!!links.instagram) data['instagram'] = links.instagram
        if(!!links.snapchat) data['snapchat'] = links.snapchat
        if(!!links.tiktok) data['tiktok'] = links.tiktok
        if(!!links.twitter) data['twitter'] = links.twitter
        if(!!links.whatsapp) data['whatsapp'] = links.whatsapp
        if(!!links.whatsapp) data['telegram'] = links.telegram
        if(!!links.whatsapp) data['linked_in'] = links.linked_in
        if(!!links.whatsapp) data['paly_store'] = links.paly_store
        if(!!links.whatsapp) data['app_store'] = links.app_store

        setLoading(true)
        socialMediaService?.create(data)?.then(res=>{
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
                    return <Col md={6} className='mb-3' key={index}>
                        <label className="text-label">
                            {/* <input
                                type='checkbox'
                                className="mr-2"
                                name='social'
                                disabled={(!selectedSocial.includes(link.label) && selectedSocial?.length === 5) || !isAdd }
                                // value={selectedSocial.includes[link.label}
                                onChange={(e)=> {
                                    if(e.target.checked){
                                        if(selectedSocial?.length === 5) {
                                            return
                                        }
                                        setSelectedSocial([...selectedSocial, link.label])
                                    } else {
                                        let update= selectedSocial?.filter(res=> res !== link.label)
                                        setSelectedSocial(update)
                                    }
                                }}
                            /> */}
                            {link.label}:
                        </label>
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