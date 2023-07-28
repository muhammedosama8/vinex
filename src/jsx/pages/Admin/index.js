import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminService from "../../../services/AdminService";
import CardItem from "./CardItem";

const Admins = () =>{
    const [admins, setAdmins] =useState([])
    const [addModal, setAddModal] =useState([])
    const [ shouldUpdate, setShouldUpdate] = useState(false)
    const navigate = useNavigate()
    const adminService = new AdminService()

    useEffect(()=>{
      adminService.getList().then(res=>{
        if(res.status === 200){
          setAdmins([...res.data?.admins]) 
        }
      })
    },[shouldUpdate])

    return(
        <>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="input-group w-50">
              <input type="text" style={{borderRadius: '1.25rem', color: 'initial', padding: '18px 16px'}} className="form-control" placeholder="Search by I.D, Name, Phone" />
              <div className="flaticon-381-search-2"
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translate(0, -50%)'}}
              ></div>
            </div>
          <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/admins/add-admins')}>
              Add Admin
          </Button>
        </div>

        <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="px-2">
                      <strong>I.D</strong>
                    </th>
                    <th className="px-2">
                      <strong>Name</strong>
                    </th>
                    <th className="px-2">
                      <strong>Email</strong>
                    </th>
                    <th className="px-2">
                      <strong>Phone</strong>
                    </th>
                    <th className="px-2">
                      <strong>Permission</strong>
                    </th>
                    <th className="px-2">
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {admins?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    setAddModal={setAddModal}
                    />
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
    )
}
export default Admins;