import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import CategoriesService from "../../../../services/CategoriesService";
import DeleteModal from "../../../common/DeleteModal";
import EditTimeSlotModal from "../EditModal";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    // const [status, setStatus] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const categoriesService = new CategoriesService()

    // const changeStatusToggle = (e)=>{
    //     setStatus(e.target.checked)
    // }

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                <strong>{item.name}</strong>
            </td>
            <td>{item.from || '-'}</td>
            <td>{item.to || '-'}</td>
            <td>{item.capacity || '-'}</td>
            <td>
                <Form.Check
                    type="switch"
                    id={`custom-switch${index}`}
                    checked={item.isOpen}
                    // disabled={!isExist('time_slot')}
                    // onChange={(e)=> changeStatusToggle(e)}
                />
            </td>
            <td>
                {isExist('time_slot') && <Dropdown>
                    <Dropdown.Toggle
                        // variant="success"
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> {
                            setEditModal(true)
                        }}> Edit</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </td>

            {editModal &&
                <EditTimeSlotModal 
                    modal={editModal}
                    setModal={()=> setEditModal(false)}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                />
            }
            </tr>
    )
}
export default CardItem;