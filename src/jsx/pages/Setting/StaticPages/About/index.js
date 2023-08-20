import { Button, Card, Col, Row } from "react-bootstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import { EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './style.scss'

import 'draft-js/dist/Draft.css';
import EditorField from "./Editor";

const About = () =>{
    const [formData, setFormData] =useState([
        {
            title_en:'',
            title_ar:'',
            description_ar:EditorState.createEmpty(),
            description_en: EditorState.createEmpty(),
        }
    ])

    const changeInput = (e,name,index) =>{
        let update = formData.map((item,ind)=>{
            if(index === ind){
                return{
                    ...item,
                    [name]: e.target.value
                }
            } else{
                return item
            }
        })
        setFormData(update)
    }

    const submit = () =>{}

    return<>
    <Card>
        <Card.Body>
        <AvForm onValidSubmit={submit}>
            {formData?.map((item, index)=>{
                return <Row className="mb-5 position-relative" key={index}>
                    {index > 0 && <button className="delete border-0" type="button" onClick={()=>{
                        let update = formData.filter((_,ind) => ind !== index)
                        setFormData(update)
                    }}>
                        <i className="la la-times"></i>
                    </button>}
                <Col md={6} className="form-group mb-2">
					<AvField
						label ='English Title'
						name ={`title_en${index}`}
						type="text" 
						value={item.title_en}
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
						placeholder='Title'
						onChange={(e) => changeInput(e,'title_en',index)}
					/>
				</Col>
                <Col md={6} className="form-group mb-2">
					<AvField
						label ='Arabic Title'
					    name ={`title_ar${index}`}
						type="text" 
						value={item.title_ar}
						validate={{
							required: {
								value:true,
								errorMessage: 'This Field is required'
							},
						}}
						placeholder='Title'
						onChange={(e) => changeInput(e,'title_ar',index)}
					/>
				</Col>
                <Col md={6} className="form-group mb-2">
                    <label className="d-block">English Description</label>
					{/* <textarea
						name ='description_en'
						type="text" 
                        className="description"
						value={item.description_en}
						required
						placeholder='Description'
						onChange={(e) => changeInput(e,index)}
					/> */}
                    <div className="editorField">
                        <Editor
                            // editorState ={editorState}
                            editorState ={item.description_en}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(e) => {
                                let update = formData.map((item,ind)=>{
                                    if(index === ind){
                                        return{
                                            ...item,
                                            description_en: e
                                        }
                                    } else{
                                        return item
                                    }
                                })
                                setFormData(update)
                            }}
                        />
                    </div>
				</Col>
                <Col md={6} className="form-group mb-2">
                    <label className="d-block">Arabic Description</label>
					{/* <textarea
						name ='description_ar'
						type="text" 
                        className="description"
						value={item.description_ar}
						required
						placeholder='Description'
						onChange={(e) => changeInput(e,index)}
					/> */}
                    <div className="editorField">
                        <Editor
                            // editorState ={editorState}
                            editorState ={item.description_ar}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(e) => {
                                let update = formData.map((item,ind)=>{
                                    if(index === ind){
                                        return{
                                            ...item,
                                            description_ar: e
                                        }
                                    } else{
                                        return item
                                    }
                                })
                                setFormData(update)
                            }}
                        />
                    </div>
				</Col>
            </Row>
            })}
            
            <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={()=>{
                    setFormData([...formData, {
                        title_en:'',
                        title_ar:'',
                        description_ar:'',
                        description_en:'',
                    }])
                }}>
                    Add New Details
                </Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </AvForm>
        </Card.Body>
    </Card>
    </>
}
export default About;