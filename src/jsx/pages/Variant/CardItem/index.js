import { useEffect, useState } from "react";
import { Badge, Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VariantService from "../../../../services/VariantService";
import DeleteModal from "../../../common/DeleteModal";

const CardItem = ({item, index, setShouldUpdate}) =>{
    const [status, setStatus] = useState(null)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const [deleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate()
    const variantService= new VariantService()

    useEffect(()=>{
        setStatus(item.status)
    },[item])

    const changeStatusToggle = (e)=>{
        setStatus(e.target.checked)
    }

    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{item.name_en}</td>
                    <td style={{display: 'grid', gap:'10px',gridTemplateColumns: 'auto auto auto'}}>
                      {item.variants?.map((variant, index)=>{
                        return <Badge variant="primary light" className="mr-2">
                          {variant?.name_en}
                        </Badge>
                      })}
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${index}`}
                        disabled={!isExist('variant')}
                        checked={status}
                        onChange={(e)=> changeStatusToggle(e)}
                      />
                    </td>
                    <td>
                      {isExist('variant') && <Dropdown>
                        <Dropdown.Toggle
                          // variant="success"
                          className="light sharp i-false"
                        >
                          <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=> navigate(`/variant/add-variant/${item.id}`)}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={()=> setDeleteModal(true)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>}
                    </td>
                    {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.name_en}
                      deletedItem={item}
                      modelService={variantService}
                      setShouldUpdate={setShouldUpdate}
                      onCloseModal={setDeleteModal}
                    />}
                  </tr>
    )
}
export default CardItem;