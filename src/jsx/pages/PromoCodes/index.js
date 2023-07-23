import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";

const PromCodes = () =>{
    const [promCodes, setPromCodes] =useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      let promCodes =[
        {id: 1, name: 'mu', amount: 5, type: 'Percentage', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: true},
        {id: 2, name: 'os', amount: 5, type: 'Fixed Amount', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: false},
        {id: 3, name: 'fa', amount: 5, type: 'Percentage', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: true},
        {id: 4, name: 'na', amount: 5, type: 'Fixed Amount', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: false},
      ]
      setPromCodes([...promCodes])
    },[])

    return(
        <>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <div className="input-group w-50">
              <input type="text" style={{borderRadius: '1.25rem', color: 'initial', padding: '26px 16px'}} className="form-control" placeholder="Search by I.D, Name" />
              <div className="flaticon-381-search-2"
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translate(0, -50%)'}}
              ></div>
            </div>
            <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/promo-codes/add-promo-codes')}>
              Add Promo Codes
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
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Type</strong>
                    </th>
                    <th>
                      <strong>End Date</strong>
                    </th>
                    <th>
                      <strong>Max Usage</strong>
                    </th>
                    <th>
                      <strong>Count Usage</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {promCodes?.map((item, index)=>{
                    return <CardItem 
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
export default PromCodes;