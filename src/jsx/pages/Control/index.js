import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import BaseService from "../../../services/BaseService";
import uploadImg from '../../../images/upload-img.png';
import { toast } from "react-toastify";
import ControlService from "../../../services/ControlServices";
import { useDispatch, useSelector } from "react-redux";
import { setLogo } from "../../../store/actions/AuthActions";
import Loader from "../../common/Loader";
import { Translate } from "../../Enums/Tranlate";

const Control = () => {
    const [websiteLogo, setWebsiteLogo] = useState('')
    const [mobileLogo, setMobileLogo] = useState('')
    const [dashboardLogo, setDashboardLogo] = useState('')
    const [color, setColor] = useState('#444444')
    const [labelColor, setLabelColor] = useState('#444444')
    const [title, setTitle] = useState('')
    const [loding, setLoading] = useState(false)
    const [lodingImg1, setLoadingImg1] = useState(null)
    const [lodingImg2, setLoadingImg2] = useState(null)
    const [lodingImg3, setLoadingImg3] = useState(null)
    const disabled = useDispatch()
    const controlService = new ControlService()
    const lang = useSelector(state=> state.auth.lang)

    const fileHandler = (e, setLogo, setLoadingImg) => {
        setLoadingImg(true)
        let files = e.target.files
        const filesData = Object.values(files)
 
        if (filesData.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res.data.status){
                    setLogo(res.data.url)
                    // setFiles(filesData[0])
                }
                setLoadingImg(false)
            })
        }
    }

    useEffect(()=>{
        setLoading(true)
        controlService.getList().then(res=>{
            if(res){
                setColor(res.data.data.main_color)
                setDashboardLogo(res.data.data.dashboard_logo)
                setMobileLogo(res.data.data.mobile_logo)
                setWebsiteLogo(res.data.data.website_logo)
                setTitle(res.data.data.website_title)
                setLabelColor(res.data.data.label_color)
            }
            setLoading(false)
        })
    }, [])

    const submit = () =>{
        let data = {
            mobile_logo: mobileLogo,
            website_logo: websiteLogo,
            dashboard_logo: dashboardLogo,
            main_color: color,
            website_title: title,
            label_color: labelColor
        }
        setLoading(true)
        controlService?.create(data).then(res=>{
            if(res && res?.data?.status === 201){
                toast.success('Control Updated Successfully')
                disabled(setLogo(dashboardLogo))
            }
            setLoading(false)
        })
    }

    if(loding){
        return <Card style={{padding: '10rem 0'}}>
            <Card.Body>
                <Loader />
            </Card.Body>
        </Card>
    }

    return<Card>
    <Card.Body>
        <Row>
            <Col md={6} className='mb-5'>
                <label className="d-block">{Translate[lang].website_title}</label>
                <input
                    type='text'
                    value={title}
                    placeholder={Translate[lang].website_title}
                    style={{
                        padding: '8px',
                        border: '1px solid #dedede',
                        borderRadius: '5px'
                    }}
                    className='w-100'
                    onChange={(e)=> setTitle(e.target.value)}
                />
            </Col>
            <Col md={6} className='mb-5 d-flex' style={{justifyContent: 'space-evenly'}}>
                <div className='form-group'>
                    <label className="d-block">{Translate[lang].color}</label>
                    <input 
                        type='color' 
                        value={color} 
                        style={{
                            height: '40px',
                            width: '62px'
                        }}
                        onChange={(e)=> setColor(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label className="d-block">{Translate[lang].label_color}</label>
                    <input 
                        type='color' 
                        value={labelColor} 
                        style={{
                            height: '40px',
                            width: '62px'
                        }}
                        onChange={(e)=> setLabelColor(e.target.value)} />
                </div>
            </Col>
            
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">{Translate[lang].website_logo}</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setWebsiteLogo, setLoadingImg1)} id={`imageUpload1`} /> 					
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
                                {(!!websiteLogo && !lodingImg1 )&& 
                                    <img alt='icon'
                                            id={`saveImageFile1`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={websiteLogo}
                                    />}
                                {(!websiteLogo && !lodingImg1) && 
                                    <img 
                                        id={`saveImageFile1`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                    />}
                                {lodingImg1 && <Loader />}
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">{Translate[lang].mobile_logo}</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setMobileLogo, setLoadingImg2)} id={`imageUpload2`} /> 					
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
                                {(!!mobileLogo && !lodingImg2) && 
                                    <img alt='icon'
                                            id={`saveImageFile2`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={mobileLogo}
                                    />
                                }
                                {(!mobileLogo && !lodingImg2) && 
                                    <img 
                                        id={`saveImageFile2`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                }
                                {lodingImg2 && <Loader />}
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">{Translate[lang].dashboard_logo}</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setDashboardLogo, setLoadingImg3)} id={`imageUpload3`} /> 					
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
                                {(!!dashboardLogo && !lodingImg3) && 
                                    <img alt='icon'
                                           id={`saveImageFile3`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={dashboardLogo}
                                    />}
                                {(!dashboardLogo && !lodingImg3) && 
                                    <img 
                                        id={`saveImageFile3`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                />}
                                {lodingImg3 && <Loader />}
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
        </Row>
        <div className="d-flex justify-content-end mt-5">
           <Button variant="primary" onClick={submit} disabled={loding}>
           {Translate[lang].submit}
           </Button>
        </div>
    </Card.Body>
    </Card>
}
export default Control;