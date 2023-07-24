import { useEffect, useState } from "react";
import { Badge, Dropdown, Form } from "react-bootstrap";
import avatar1 from "../../../../images/1.jpg";
import DeleteModal from "../../../common/DeleteModal";
import { DropDownIcon } from "../../../common/icons";

const CardItem = ({item, index}) =>{
    const [status, setStatus] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

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
                    <td>
                        <img
                          src={avatar1}
                          className="rounded-lg"
                          width="40"
                          alt={item.id}
                        />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Badge variant="success light">{item.category}</Badge>
                    </td>
                    <td>{item.price} LE</td>
                    <td>{item.quantity}</td>
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
                          <Dropdown.Item>Edit</Dropdown.Item>
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