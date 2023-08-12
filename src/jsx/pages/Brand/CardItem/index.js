import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import BrandsService from "../../../../services/BrandsService";
import DeleteModal from "../../../common/DeleteModal";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    // const [status, setStatus] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const brandsService = new BrandsService()

    // useEffect(()=>{
    //     setStatus(item.status)
    // },[item])

    // const changeStatusToggle = (e)=>{
    //     setStatus(e.target.checked)
    // }

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>{item.name_en}</td>
            {/* <td>
                <Form.Check
                    type="switch"
                    id={`custom-switch${index}`}
                    checked={status}
                    disabled={!isExist('categories')}
                    onChange={(e)=> changeStatusToggle(e)}
                />
            </td> */}
            <td>
                {isExist('brands') && <Dropdown>
                    <Dropdown.Toggle
                        // variant="success"
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> Edit</Dropdown.Item>
                        <Dropdown.Item onClick={()=> setDeleteModal(true)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.name_en}
                      deletedItem={item}
                      modelService={brandsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;