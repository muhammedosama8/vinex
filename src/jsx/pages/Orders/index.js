import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import CardItem from "./CardItem";
import OrdersStatus from "./OrdersStatus";

const Orders = () =>{
    const [orders, setOrders] =useState([])
    const [item, setItem] =useState({})
    const [modal, setModal] =useState(false)
    const [shouldUpdate, setShouldUpdate] =useState(false)

    useEffect(()=>{
      let orders =[
        {id: 1, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 280, payment_status: 'cash', status: 'Ordered'},
        {id: 2, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 380, payment_status: 'visa', status: 'Processing'},
        {id: 3, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 180, payment_status: 'cash', status: 'Shipped'},
        {id: 4, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 80, payment_status: 'visa', status: 'Delivered'},
        {id: 4, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 80, payment_status: 'visa', status: 'Canceled'},
      ]
      setOrders([...orders])
    },[])

    const exportTable = ()=> {}

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="input-group w-50">
            <input type="text" style={{borderRadius: '1.25rem', color: 'initial', padding: '26px 16px'}} className="form-control" placeholder="Search by I.D, Name" />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute', right: '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          <Button variant="primary" className='me-2 h-75' onClick={()=> exportTable()}>
              Export
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
                      <strong>Delivery Date</strong>
                    </th>
                    <th>
                      <strong>Customer Name</strong>
                    </th>
                    <th>
                      <strong>Customer Email</strong>
                    </th>
                    <th>
                      <strong>Customer Phone</strong>
                    </th>
                    <th>
                      <strong>Total Price</strong>
                    </th>
                    <th>
                      <strong>Payment Status</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((item, index)=>{
                    return <CardItem 
                    index= {index}
                    item={item}
                    setItem={setItem}
                    setModal={setModal}
                    />
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          {modal && <OrdersStatus modal={modal} setModal={setModal} item={item} setShouldUpdate={setShouldUpdate}/>}
        </>
    )
}
export default Orders;