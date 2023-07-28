import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../../../common/DeleteModal";
import AdminService from "../../../../services/AdminService";

const CardItem = ({item, index,setShouldUpdate}) =>{
    const [status, setStatus] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate()
    const adminService = new AdminService()

    useEffect(()=>{
        setStatus(!item.isBlocked)
    },[item])

    const changeStatusToggle = (e)=>{
      let data = {
        "isBlocked": status
      }
      adminService.toggleStatus(item.id, data).then(res=>{
        if(res.status === 200){
          setStatus(!status)
        }
      })
    }
    
    return(
        <tr key={index}>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{`${item.f_name} ${item.l_name}`}</td>
                    <td>
                      {item.email}
                    </td>
                    <td>{item.phone}</td>
                    <td>
                      {item?.permission ? item.permission : ''}
                    </td>
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
                          // variant="success"
                          className="light sharp i-false"
                        >
                          <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=> navigate(`/admins/edit-admin/${item.id}/${item.f_name}`, {state: {edit: true, id: item.id, item: item}})}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={()=> setDeleteModal(true)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.f_name}
                      deletedItem={item}
                      modelService={adminService}
                      setShouldUpdate={setShouldUpdate}
                      onCloseModal={setDeleteModal}
                    />}
                  </tr>
    )
}
export default CardItem;