import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import BaseService from "../../../services/BaseService";
import uploadImg from '../../../images/upload-img.png';
import { toast } from "react-toastify";

const Control = () => {
    const [logo1, setLogo1] = useState('')
    const [logo2, setLogo2] = useState('')
    const [logo3, setLogo3] = useState('')
    const [color, setColor] = useState('')
    // const [loding, setLoading] = useState(false)

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

    const submit = () =>{
    }

    return<Card>
    <Card.Body>
        <Row>
            <Col md={4}>
                <div className='form-group w-100'>
                    <label className="m-0">Website Logo</label>
                    <div className="image-placeholder ml-0" style={{width: '15rem'}}>	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e, setLogo1)} id={`imageUpload1`} /> 					
                            <label htmlFor={`imageUpload1`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-auto">
                                <div id={`imagePreview1`} className='position-relative'>
                                    {!!logo1 && <button 
                                        onClick={()=> setLogo1('')}
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
                                {!!logo1 && 
                                    <img alt='icon'
                                            id={`saveImageFile1`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={logo1}
                                    />}
                                {!logo1 && 
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
                            <input type="file" onChange={(e) => fileHandler(e, setLogo2)} id={`imageUpload2`} /> 					
                            <label htmlFor={`imageUpload2`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-100 m-auto">
                                <div id={`imagePreview2`} className='position-relative'>
                                    {!!logo2 && <button 
                                        onClick={()=> setLogo2('')}
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
                                {!!logo2 && 
                                    <img alt='icon'
                                            id={`saveImageFile2`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={logo2}
                                    />
                                }
                                {!logo2 && 
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
                            <input type="file" onChange={(e) => fileHandler(e, setLogo3)} id={`imageUpload3`} /> 					
                            <label htmlFor={`imageUpload3`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-100 m-auto">
                                <div id={`imagePreview3`} className='position-relative'>
                                    {!!logo3 && <button 
                                        onClick={()=> setLogo3('')}
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
                                {!!logo3 && 
                                    <img alt='icon'
                                           id={`saveImageFile3`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={logo3}
                                    />}
                                {!logo3 && 
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
           <Button variant="primary" onClick={submit}>
                Submit
           </Button>
        </div>
    </Card.Body>
    </Card>
}
export default Control;