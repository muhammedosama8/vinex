import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import NotificationService from "../../../../services/NotificationService";
import DeleteModal from "../../../common/DeleteModal";
import SendModal from "../SendModal";

const CardItem = ({item, index, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const [send, setSend] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const notificationService = new NotificationService()

    return(
        <tr key={index} className='text-center'>
            <td>
                {item.id}
            </td>
            <td>{item.title_en}</td>
            <td>
                {item.description_en}
            </td>
            <td>
                {isExist('notification') && <Dropdown>
                    <Dropdown.Toggle
                        // variant="success"
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> setSend(true)}> Send </Dropdown.Item>
                        <Dropdown.Item onClick={()=> setDeleteModal(true)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </td>

            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.title_en}
                      deletedItem={item}
                      modelService={notificationService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            
            {send && <SendModal 
                modal={send}
                setModal={()=> setSend(false)}
                item={item}
            />}
            </tr>
    )
}
export default CardItem;