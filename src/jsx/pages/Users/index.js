import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import UserService from "../../../services/UserService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";

const Users = () =>{
    const [users, setUsers] =useState([])
    const [hasData, setHasData] =useState(null)
    const [search, setSearch] =useState(null)
    // const [isDeleted, setIsDeleted] =useState(false)
    const [shouldUpdate, setShouldUpdate] =useState(false)
    const userService = new UserService()

    return(
        <>
          <div className="d-flex mb-3 justify-content-between">
            <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name, Phone' />
            <Button variant="secondary">
              Export Sheet
            </Button>
          </div>
          {/* <div className="d-flex align-items-center mb-3 ">
          <Button variant={isDeleted ? 'secondary' : 'primary'} className='mr-2' onClick={()=> setIsDeleted(false)}>
            Active
          </Button>
          <Button variant={!isDeleted ? 'secondary' : 'primary'} onClick={()=> setIsDeleted(true)}>
            Not-Active
          </Button>
        </div> */}
        <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
              {hasData === 1 && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Email</strong>
                    </th>
                    <th>
                      <strong>Mobile</strong>
                    </th>
                    {/* <th>
                      <strong>Count Orders</strong>
                    </th> */}
                    <th>
                      <strong>Active</strong>
                    </th>
                    <th>
                      <strong>Deleted</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, index)=>{
                    return <CardItem 
                      key= {index}
                      index= {index}
                      item={item}
                      setShouldUpdate={setShouldUpdate}
                    />
                  })}
                </tbody>
              </Table>}

              {hasData === 0 && <NoData />}

              <Pagination
                  setData={setUsers}
                  service={userService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  // isDeleted={isDeleted}
                />
            </Card.Body>
          </Card>
        </>
    )
}
export default Users;