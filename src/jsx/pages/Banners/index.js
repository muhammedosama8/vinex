import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import uploadImg from '../../../images/upload-img.webp';
import './style.scss'

const Banners = () =>{
    const [files, setFiles] = useState([{},{},{},{},{}])
    console.log(files)
    const [errors, setErrors] = useState([
        {img1:false, link1: false},
        {img2:false, link2: false},
        {img3:false, link3: false},
        {img4:false, link4: false},
        {img5:false, link5: false},
    ])
    const [formData, setFormData] = useState([
        {img1:'', link1: ''},
        {img2:'', link2: ''},
        {img3:'', link3: ''},
        {img4:'', link4: ''},
        {img5:'', link5: ''},
    ])
    const fileHandler = (e, index) => {
        let update = files?.map((file,updateIndex) => {
            if(updateIndex === index-1){
                return e.target.files[0]
            } else{
                return file
            }
        })
        setFiles([...update])
		setTimeout(function(){
			var src = document.getElementById(`saveImageFile${index}`)?.getAttribute("src");
            let updateFormData = formData.map((item, ind)=>{
                if(item.hasOwnProperty(`img${index}`)){
                    let img = `img${index}`
                    return {
                        ...item,
                        [img]: src,
                    }
                } else {
                    return {...item}
                }
            } )
			setFormData([...updateFormData])
		}, 200);
    }

    const onSubmit = () => {

    }
    return(<>
        
            {formData?.map((data, index)=>{
                return <Card className="p-4" key={index}>
                    <Row>
                    <Col md={12}>
                    <h4>Banner {index+1}</h4>
                    <div className="image-placeholder">	
                        <div className="avatar-edit">
                            <input type="file" onChange={(e) => fileHandler(e,index+1)} id={`imageUpload${index+1}`} /> 					
                            <label htmlFor={`imageUpload${index+1}`}  name=''></label>
                        </div>
                        <div className="avatar-preview">
                            <div id={`imagePreview${index+1}`}>
                            {files[index]?.name && <img id={`saveImageFile${index+1}`} src={URL.createObjectURL(files[index])} alt='icon' />}
                            {!files[index]?.name && <img id={`saveImageFile${index+1}`} src={uploadImg} alt='icon'
                                style={{
                                    width: '80px',
                                    height: '80px',
                                }}
							/>}
                            </div>
                        </div>
                    </div>
                    <div className='form-row mt-3'>
                        <div className='form-group w-100 d-flex align-items-center m-0'>
                            <label style={{width: '65px'}} className='m-0'>Link {index+1}:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder={`link...`}
                                value={data[`link${index+1}`]}
                                style={{height: '50px', color: 'initial'}}
                                required
                                onChange={(e) => {
                                    let updateFormData = formData.map((item, ind)=>{
                                        if(item.hasOwnProperty(`img${index+1}`)){
                                            let link = `link${index+1}`
                                            return {
                                                ...item,
                                                [link]: e.target.value,
                                            }
                                        } else {
                                            return {...item}
                                        }
                                    } )
                                    setFormData([...updateFormData])
                                }}
                            />
                        </div>
                    </div>
                    </Col>
                    </Row>
                </Card>
                })}
        <div className="d-flex     justify-content-end">
            <Button 
                variant="primary" 
                className="px-5"
                onClick={()=> onSubmit()}
            >Submit</Button>
        </div>
    </>)
}
export default Banners;