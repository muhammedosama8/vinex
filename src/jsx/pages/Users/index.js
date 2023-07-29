import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";

const Users = () =>{
    const [users, setUsers] =useState([])
    const [search, setSearch] =useState(null)
    const [shouldUpdate, setShouldUpdate] =useState(false)

    useEffect(()=>{
      let users =[
        {id: 1, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9, status: true},
        {id: 2, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20, status: false},
        {id: 3, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40, status: true},
        {id: 4, name: 'na', email: 'na@gmail.com', phone: '01002123123', count_orders: 44, status: false},
        {id: 5, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9, status: true},
        {id: 6, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20, status: false},
        {id: 7, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40, status: true},
        {id: 8, name: 'na', email: 'na@gmail.com', phone: '01002123123', count_orders: 44, status: false},
        {id: 9, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9, status: true},
        {id: 10, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20, status: false},
        {id: 11, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40, status: true},
      ]
      setUsers([...users])
    },[])

    return(
        <>
          <div className="d-flex mb-3 ">
            <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name, Phone' />
          </div>
        <Card>
            <Card.Body>
              <Table responsive>
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
                    <th>
                      <strong>Count Orders</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, index)=>{
                    return <CardItem 
                      key= {index}
                      index= {index}
                      item={item}
                    />
                  })}
                </tbody>
              </Table>

              {/* <Pagination 
                  setData={setUsers}
                  service=''
                  shouldUpdate={shouldUpdate}
                /> */}
            </Card.Body>
          </Card>
        </>
    )
}
export default Users;