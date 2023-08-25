import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrdersService from "../../../services/OrdersService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";
import OrdersStatus from "./OrdersStatus";

const Orders = () =>{
    const [orders, setOrders] =useState([])
    const [item, setItem] =useState({})
    const [modal, setModal] =useState(false)
    const [hasData, setHasData] =useState(null)
    const [search, setSearch] =useState(null)
    const [shouldUpdate, setShouldUpdate] =useState(false)
    const navigate= useNavigate()
    const ordersService = new OrdersService()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
      let orders =[
        {id: 1, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 280, payment_status: 'cash', status: 'Ordered'},
        {id: 2, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 380, payment_status: 'visa', status: 'Processing'},
        {id: 3, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 180, payment_status: 'cash', status: 'Shipped'},
        {id: 4, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 80, payment_status: 'visa', status: 'Delivered'},
        {id: 5, delivery_date: '1/7/2025', customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 80, payment_status: 'visa', status: 'Canceled'},
      ]
      setOrders([...orders])
    },[])

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name, Phone' />
          <div>
            {/* <Button variant="secondary" className='mx-2 h-75' onClick={()=> exportTable()}>
                Export
            </Button> */}
            {isExist('order') && <Button variant="primary" className='mx-2 h-75' onClick={()=> navigate('/orders/add-orders')}>
              Add Order
            </Button>}
          </div>
        </div>

        <Card>
            <Card.Body className={`${hasData === 0 ? 'text-center' :''}`}>
              {hasData === 1 && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
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
                      <strong>Payment Method</strong>
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
                    key= {index}
                    index= {index}
                    item={item}
                    setItem={setItem}
                    setModal={setModal}
                    />
                  })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setOrders}
                  service={ordersService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                />
            </Card.Body>
          </Card>
          {modal && <OrdersStatus modal={modal} setModal={setModal} item={item} setShouldUpdate={setShouldUpdate}/>}
        </>
    )
}
export default Orders;