import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../common/DeleteModal";
import { DropDownIcon } from "../../../common/icons";

const CardItem = ({item, index}) =>{
    const [status, setStatus] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate()

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
                    <td>{item.name}</td>
                    <td>
                      {item.email}
                    </td>
                    <td>{item.phone}</td>
                    <td>
                        <Form.Check
                        type="switch"
                        id={`custom-switch${index}`}
                        checked={status}
                        onChange={(e)=> changeStatusToggle(e)}
                      />
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="light sharp i-false"
                        >
                          {DropDownIcon}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=> navigate(`/admins/edit-admin/${item.id}`)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={()=> setDeleteModal(true)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.name}
                      deletedItem={item.id}
                      // modelService={}
                      onCloseModal={setDeleteModal}
                    />}
                  </tr>
    )
}
export default CardItem;