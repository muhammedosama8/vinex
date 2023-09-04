import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrdersService from "../../../services/OrdersService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import { Translate } from "../../Enums/Tranlate";
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
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 33px 18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}, ${Translate[lang]?.phone}`}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          <div>
            {isExist('order') && <Button variant="primary" className='mx-2 h-75' onClick={()=> navigate('/orders/add-orders')}>
              {Translate[lang].add} {Translate[lang].orders}
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
                      <strong>{Translate[lang]?.customer_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.email}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.phone}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.total_price}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.payment_method}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.status}</strong>
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