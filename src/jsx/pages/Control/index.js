import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import BaseService from "../../../services/BaseService";
import uploadImg from '../../../images/upload-img.png';
import { toast } from "react-toastify";
import ControlService from "../../../services/ControlServices";

const Control = () => {
    const [websiteLogo, setWebsiteLogo] = useState('')
    const [mobileLogo, setMobileLogo] = useState('')
    const [dashboardLogo, setDashboardLogo] = useState('')
    const [color, setColor] = useState('#444444')
    const [loding, setLoading] = useState(false)
    const controlService = new ControlService()

    const fileHandler = (e, setLogo) => {
        // setLoading(true)
        let files = e.target.files
        const filesData = Object.values(files)
 
        if (filesData.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res.data.status){
                    setLogo(res.data.url)
                    // setFiles(filesData[0])
                }
                // setLoading(false)
            })
        }
    }

    useEffect(()=>{
        controlService.getList().then(res=>{
            setColor(res.data.data.main_color)
            setDashboardLogo(res.data.data.dashboard_logo)
            setMobileLogo(res.data.data.mobile_logo)
            setWebsiteLogo(res.data.data.website_logo)
        })
    }, [])

    const submit = () =>{
        let data = {
            mobile_logo: mobileLogo,
            website_logo: websiteLogo,
            dashboard_logo: dashboardLogo,
            main_color: color
        }
        setLoading(true)
        controlService?.create(data).then(res=>{
            if(res.data.status === 201){
                toast.success('Control Updated Successfully')
            }
            setLoading(false)
        })
    }

    return<Card>
    <Card.Body>
        <Row>
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">Website Logo</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setWebsiteLogo)} id={`imageUpload1`} /> 					
                            <label htmlFor={`imageUpload1`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-auto">
                                <div id={`imagePreview1`} className='position-relative'>
                                    {!!websiteLogo && <button 
                                        onClick={()=> setWebsiteLogo('')}
                                        style={{
                                            color: 'red',
                                            zIndex: '1',
                                            position: 'absolute',
                                            right: '16px',
                                            top: '16px',
                                            border: '0',
                                            padding: '1px 6px',
                                            borderRadius: '50%',
                                            fontSize: '20px'
                                        }}>
                                        <i className="la la-trash"></i>
                                    </button>}
                                {!!websiteLogo && 
                                    <img alt='icon'
                                            id={`saveImageFile1`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={websiteLogo}
                                    />}
                                {!websiteLogo && 
                                    <img 
                                        id={`saveImageFile1`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">Mobile Logo</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setMobileLogo)} id={`imageUpload2`} /> 					
                            <label htmlFor={`imageUpload2`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-100 m-auto">
                                <div id={`imagePreview2`} className='position-relative'>
                                    {!!mobileLogo && <button 
                                        onClick={()=> setMobileLogo('')}
                                        style={{
                                            color: 'red',
                                            zIndex: '1',
                                            position: 'absolute',
                                            right: '16px',
                                            top: '16px',
                                            border: '0',
                                            padding: '1px 6px',
                                            borderRadius: '50%',
                                            fontSize: '20px'
                                        }}>
                                        <i className="la la-trash"></i>
                                    </button>}
                                {!!mobileLogo && 
                                    <img alt='icon'
                                            id={`saveImageFile2`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={mobileLogo}
                                    />
                                }
                                {!mobileLogo && 
                                    <img 
                                        id={`saveImageFile2`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                }
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">Dashoard Logo</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setDashboardLogo)} id={`imageUpload3`} /> 					
                            <label htmlFor={`imageUpload3`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-100 m-auto">
                                <div id={`imagePreview3`} className='position-relative'>
                                    {!!dashboardLogo && <button 
                                        onClick={()=> setDashboardLogo('')}
                                        style={{
                                            color: 'red',
                                            zIndex: '1',
                                            position: 'absolute',
                                            right: '16px',
                                            top: '16px',
                                            border: '0',
                                            padding: '1px 6px',
                                            borderRadius: '50%',
                                            fontSize: '20px'
                                        }}>
                                        <i className="la la-trash"></i>
                                    </button>}
                                {!!dashboardLogo && 
                                    <img alt='icon'
                                           id={`saveImageFile3`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={dashboardLogo}
                                    />}
                                {!dashboardLogo && 
                                    <img 
                                        id={`saveImageFile3`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
            <Col md={6} className='mt-3'>
                <div className='form-group w-100'>
                    <label className="d-block">Color</label>
                    <input 
                        type='color' 
                        value={color} 
                        style={{
                            height: '40px',
                            width: '62px'
                        }}
                        onChange={(e)=> setColor(e.target.value)} />
                </div>
            </Col>
        </Row>
        <div className="d-flex justify-content-end mt-5">
           <Button variant="primary" onClick={submit} disabled={loding}>
                Submit
           </Button>
        </div>
    </Card.Body>
    </Card>
}
export default Control;