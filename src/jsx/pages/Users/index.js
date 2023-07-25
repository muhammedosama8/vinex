import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import CardItem from "./CardItem";

const Users = () =>{
    const [users, setUsers] =useState([])

    useEffect(()=>{
      let users =[
        {id: 1, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9, status: true},
        {id: 2, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20, status: false},
        {id: 3, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40, status: true},
        {id: 4, name: 'na', email: 'na@gmail.com', phone: '01002123123', count_orders: 44, status: false},
      ]
      setUsers([...users])
    },[])

    return(
        <>
          <div className="d-flex mb-3 ">
            <div className="input-group w-50">
              <input type="text" style={{borderRadius: '1.25rem', color: 'initial', padding: '18px 16px'}} className="form-control" placeholder="Search by I.D, Name, Phone" />
              <div className="flaticon-381-search-2"
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translate(0, -50%)'}}
              ></div>
            </div>
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
            </Card.Body>
          </Card>
        </>
    )
}
export default Users;