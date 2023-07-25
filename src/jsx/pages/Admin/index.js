import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";

const Admins = () =>{
    const [admins, setAdmins] =useState([])
    const [addModal, setAddModal] =useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      let admins =[
        {id: 1, name: 'muhammed', email: 'muhammed@gmail.com', phone: '01000000',permission: 'Owner', status: true},
        {id: 2, name: 'osama', email: 'osama@gmail.com', phone: '01000000',permission: 'employee', status: false},
        {id: 3, name: 'nasser', email: 'nasser@gmail.com', phone: '01000000',permission: 'employee', status: true},
      ]
      setAdmins([...admins])
    },[])

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
                      <strong>Phone</strong>
                    </th>
                    <th>
                      <strong>Permission</strong>
                    </th>
                    <th>
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