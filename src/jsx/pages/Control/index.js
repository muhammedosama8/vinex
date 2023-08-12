import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import BaseService from "../../../services/BaseService";
import uploadImg from '../../../images/upload-img.webp';

const Control = () => {
    const [logo, setLogo] = useState('')
    // const [loding, setLoading] = useState(false)

    const fileHandler = (e) => {
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

    return<Card>
    <Card.Body>
        <Row>
            <Col md={12}>
                <div className='form-group w-100'>
                    <label className="m-0">Logo</label>
                    <div className="image-placeholder">	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload`} /> 					
                            <label htmlFor={`imageUpload`}  name=''></label>
                        </div>
                            <div className="avatar-preview2 m-auto">
                                <div id={`imagePreview`}>
                                {!!logo && 
                                    <img alt='icon'
                                            d={`saveImageFile`} 
                                        className='w-100 h-100' 
                                        style={{borderRadius: '30px'}} 
                                        src={logo}
                                    />}
                                {!logo && 
                                    <img 
                                        id={`saveImageFile`} 
                                        src={uploadImg} alt='icon'
                                        style={{ width: '80px', height: '80px' }}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
            </Col>
        </Row>
    </Card.Body>
    </Card>
}
export default Control;