import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";
import PromoCodes from "./PromoCodes";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import ProductsService from "../../../services/ProductsService";
import OrdersService from "../../../services/OrdersService";
import UserService from "../../../services/UserService";
import PromoCodeService from "../../../services/PromoCodeService";

const FilterReport = ['products', 'orders', 'users', 'promo_codes', 'sales']
const Reports = ()=> {
    let [reportType, setReportType] = useState(FilterReport[0])
    let [products, setProducts] = useState([])
    let [orders, setOrders] = useState([])
    let [users, setUsers] = useState([])
    let [promoCodes, setPromoCodes] = useState([])
    const lang = useSelector(state=> state.auth.lang)
    let date = new Date()
    let startDate = new Date(`1/${date.getMonth()+1}/${date.getFullYear()}`)
    let endDate = new Date(`1/${date.getMonth()+2}/${date.getFullYear()}`)
    const productsService = new ProductsService()
    const ordersService = new OrdersService()
    const userService = new UserService()
    const promoCodeService = new PromoCodeService()

    useEffect(()=>{
        if(reportType === 'products'){
            productsService.getList().then(res=>{
                if(res.status === 200){
                    setProducts(res.data?.meta?.data)
                }
            })
        }
        if(reportType === 'orders' || reportType === 'sales'){
            ordersService.getList().then(res=>{
                if(res.status === 200){
                    setOrders(res.data?.meta?.data)
                }
            })
        }
        if(reportType === 'users'){
            userService.getList().then(res=>{
                if(res.status === 200){
                    setUsers(res.data?.meta?.data)
                }
            })
        }
        if(reportType === 'promo_codes'){
            promoCodeService.getList().then(res=>{
                if(res.status === 200){
                    setPromoCodes(res.data?.meta?.data)
                }
            })
        }
    },[reportType])

    let data = {
        orders:{
            rows: ['customer_name','email', 'phone', 'total_price', 'delivery_day', 'from', 'to', 'payment_method', 'status']
        },
        products:{
            rows: ['image','name', 'category', 'price', 'in_stock']
        },
        users: {
            rows: ['name', 'email', 'phone', 'orders']
        },
        promo_codes:{
            rows: ['name', 'quantity', 'type', 'start_date', 'end_date', 'max_usage', 'count_usage']
        },
        sales:{
            rows: ['customer_name','email', 'phone', 'total_price', 'net_profit', 'delivery_day', 'from', 'to', 'payment_method', 'status']
        },
    }

    return(
        <>
        <div className="reports d-flex justify-content-between align-items-center">
            <div>
                <div className="rangeDatePicker">
                    {/* <label>{Translate[lang].date_range}</label>
                    <DateRangePicker initialSettings={{ startDate: startDate, endDate: endDate }} >
                        <input type="text" className="form-control w-100 input-daterange-timepicker" />
                    </DateRangePicker> */}
                </div>
                
                <div className="mt-3">
                    {FilterReport.map(data=>{
                        return <Button  
                                    variant={data === reportType ? 'success' : 'outline-success'} 
                                    className='h-75 mr-3 mb-2' 
                                    onClick={()=> setReportType(data)}>
                                    {Translate[lang][data]}
                            </Button>
                    })}
                </div>
            </div>
            <div>
                <Button variant="primary" className='mx-2' onClick={()=> {}}>
                    {Translate[lang].export}
                </Button>
            </div>
        </div>
        <Card className="mt-4">
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    {data[reportType]?.rows?.map((row, index)=>{
                        return <th key={index}>
                        <strong>{Translate[lang][row]}</strong>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                    {(reportType === 'products') && products?.map((product, index)=>{
                        return <Products item={product} index={index} />
                    })}
                    {(reportType === 'orders' || reportType === 'sales') && orders?.map((order, index)=>{
                        return <Orders item={order} index={index} type={reportType} />
                    })}
                    {(reportType === 'users') && users?.map((user, index)=>{
                        return <Users item={user} index={index} />
                    })}
                    {(reportType === 'promo_codes') && promoCodes?.map((code, index)=>{
                        return <PromoCodes item={code} index={index} />
                    })}
                  {/* {data[reportType]?.data?.map((item, index)=>{
                    if(reportType === 'Orders'){
                        return <Orders item={item} index={index} />
                    } else if(reportType === 'products'){
                        return <Products item={item} index={index} />
                    } else if(reportType === 'Users'){
                        return <Users item={item} index={index} />
                    } else if(reportType === 'PromoCodes'){
                        return <PromoCodes item={item} index={index} />
                    }
                  })} */}
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

export default Reports;