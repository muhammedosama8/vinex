import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminService from "../../../services/AdminService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";

const Admins = () =>{
    const [admins, setAdmins] =useState(null)
    const [hasData, setHasData] =useState(null)
    const [search, setSearch] =useState(null)
    const [ shouldUpdate, setShouldUpdate] = useState(false)
    const navigate = useNavigate()
    const adminService = new AdminService()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    return(
        <>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name, Phone' />    
          {isExist('admin') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/admins/add-admins')}>
              Add Admin
          </Button>}
        </div>

        <Card>
            <Card.Body className={`${hasData === 0 ? 'text-center' :''}`}>
              {hasData === 1 && <Table responsive>
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
                  {admins?.length > 0 && admins?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    />
                  })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData/>}
              <Pagination
                  setData={setAdmins}
                  service={adminService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                />
            </Card.Body>
          </Card>
        </>
    )
}
export default Admins;