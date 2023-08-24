import { Button, Card, Col, Row } from "react-bootstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';
import '../style.scss'
import StaticPagesServices from "../../../../../services/StaticPagesService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Static = () =>{
    const [formData, setFormData] =useState([
        {
            title_en:'',
            title_ar:'',
            description_ar: EditorState.createEmpty(),
            description_en: EditorState.createEmpty(),
        }
    ])
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const [isEdit, setIsEdit] = useState()
    const staticPagesServices = new StaticPagesServices()

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

    useEffect(()=>{
        let params = {type: window.history?.state.usr}
        staticPagesServices.getList(params).then(res=>{
            if(res.status === 200){
                if(res.data.data?.length === 0){
                    setIsEdit(false)
                } else {
                    let data = res.data.data?.map(item =>{
                        return{
                            title_en: item.title_en,
                            title_ar: item.title_ar,
                            description_ar: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(item.description_ar))),
                            description_en: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(item.description_en))),
                        }
                    })
                    setIsEdit(true)
                    setFormData(data)
                }
            }
        })
    },[])
    const submit = () =>{
        let data ={
            type: window.history?.state.usr,
            static_page: formData.map(res=>{
                let en = draftToHtml(convertToRaw(res.description_en.getCurrentContent()))
                let ar = draftToHtml(convertToRaw(res.description_ar.getCurrentContent()))
                console.log(res)
                return{
                    ...res,
                    description_en: en,
                    description_ar: ar
                }
            })
        }
        staticPagesServices.create(data).then(res=>{
            if(res.status === 201){
                toast.success("Update Data Successfullly")
                setIsEdit(true)
            }
        })
    }

    return<>
    <Card>
        <Card.Body>
        <AvForm onValidSubmit={submit}>
            {formData?.map((item, index)=>{
                return <Row className="mb-5 position-relative" key={index}>
                    {index > 0 && <button className="delete border-0" disabled={isEdit} type="button" onClick={()=>{
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
                        disabled={isEdit}
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
                        disabled={isEdit}
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
                    <div className="editorField">
                        <Editor
                            // editorState ={editorState}
                            editorState ={item.description_en}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(e) => {
                                if(isEdit){
                                    return
                                }
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
                    <div className="editorField">
                        <Editor
                            // editorState ={editorState}
                            editorState ={item.description_ar}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(e) => {
                                if(isEdit){
                                    return
                                }
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
            
            {isExist('static_pages') && <div className="d-flex justify-content-between">
                <Button 
                    disabled={isEdit}
                    variant="secondary" 
                    onClick={()=>{
                    setFormData([...formData, {
                        title_en:'',
                        title_ar:'',
                        description_ar: EditorState.createEmpty(),
                        description_en: EditorState.createEmpty(),
                    }])
                }}>
                    Add New Details
                </Button>
                {!isEdit && <Button variant="primary" type="submit">
                    Submit
                </Button>}
                {isEdit && <Button variant="primary" type="button" onClick={()=>setIsEdit(false)}>
                    Edit
                </Button>}
            </div>}
        </AvForm>
        </Card.Body>
    </Card>
    </>
}
export default Static;