import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
// import DateRangePicker from "react-bootstrap-daterangepicker";
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
import { ExportCSV } from "./Exports";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";

const FilterReport = ['products', 'orders', 'users', 'promo_codes', 'sales']
const data = {
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

const Reports = ()=> {
    let [reportType, setReportType] = useState(FilterReport[0])
    let [products, setProducts] = useState([])
    let [orders, setOrders] = useState([])
    let [users, setUsers] = useState([])
    let [promoCodes, setPromoCodes] = useState([])
    let [exportData, setExportData] = useState([])
    let [hasData, setHasData] = useState(null)
    let [loading, setLoading] = useState(false)
    const lang = useSelector(state=> state.auth.lang)
    // let date = new Date()
    // let startDate = new Date(`1/${date.getMonth()+1}/${date.getFullYear()}`)
    // let endDate = new Date(`1/${date.getMonth()+2}/${date.getFullYear()}`)
    const productsService = new ProductsService()
    const ordersService = new OrdersService()
    const userService = new UserService()
    const promoCodeService = new PromoCodeService()

    // { Dessert: 'Cupcake', Calories: 305, Fat: 3.7, Carbs: 67, Protein: 4.3 },
    // { Dessert: 'Donut', Calories: 452, Fat: 25.0, Carbs: 51, Protein: 4.9 },
    // { Dessert: 'Eclair', Calories: 262, Fat: 16.0, Carbs: 24, Protein: 6.0 },

    useEffect(()=>{
        setHasData(null)
        setLoading(true)
        
        if(reportType === 'products'){
            productsService.getList().then(res=>{
                if(res.status === 200){
                    setProducts(res.data?.meta?.data)
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    const exData = res.data?.meta?.data?.map(item=>{
                        return {
                            name: lang ==='en' ? item.name_en : item.name_ar, 
                            category: lang ==='en' ? item.category.name_en :item.category.name_ar, 
                            price: item.price, 
                            in_stock: item.amount
                        }
                    })
                    setExportData(exData)
                }
                setLoading(false)
            })
        }
        if(reportType === 'orders' || reportType === 'sales'){
            ordersService.getList().then(res=>{
                if(res.status === 200){
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    setOrders(res.data?.meta?.data)

                    const exData = res.data?.meta?.data?.map(item=>{
                        let obj = {
                            customer_name: item.user.f_name ? `${item.user.f_name} ${item.user.l_name}` : '-', 
                            email: item.user.email || '-', 
                            phone: `${item.user.country_code}${item.user.phone}`, 
                            total_price: item.total,
                            delivery_day: item.day.split('T')[0],
                            from: `${item.interval_hour.from.split(':')[0]}:${item.interval_hour.from.split(':')[1]}`,
                            to: `${item.interval_hour.to.split(':')[0]}:${item.interval_hour.to.split(':')[1]}`,
                            payment_method: Translate[lang][item.payment_method],
                            status: Translate[lang][item.status],
                        }
                        if(reportType === 'sales') obj['net_profit'] = item.total-item?.sub_carts?.map(res=> res.product?.cost).reduce((total, cost) => total + cost, 0);
                        return obj
                    })
                    setExportData(exData)
                }
                setLoading(false)
            })
        }
        if(reportType === 'users'){
            userService.getList().then(res=>{
                if(res.status === 200){
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    setUsers(res.data?.meta?.data)

                    const exData = res.data?.meta?.data?.map(item=>{
                        return {
                            name: item.f_name ? `${item.f_name} ${item.l_name}` : '-', 
                            email: item.email || '-', 
                            phone: item.user_phones?.filter(res=> res?.is_default)[0] ? `${item.user_phones?.filter(res=> res?.is_default)[0]?.country_code}${item.user_phones?.filter(res=> res?.is_default)[0]?.phone}` : '-', 
                        }
                    })
                    setExportData(exData)
                }
                setLoading(false)
            })
        }
        if(reportType === 'promo_codes'){
            promoCodeService.getList().then(res=>{
                if(res.status === 200){
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    setPromoCodes(res.data?.meta?.data)

                    const exData = res.data?.meta?.data?.map(item=>{
                        return {
                            name: item.name, 
                            quantity: item.amount, 
                            type: Translate[lang][item.Type], 
                            start_date: item.createdAt.split('T')[0],
                            end_date: item.end_date.split('T')[0],
                            max_usage: item.max_usage,
                            count_usage: item.count_usage,
                        }
                    })
                    setExportData(exData)
                }
                setLoading(false)
            })
        }
    },[reportType])
console.log(exportData)
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
                {/* <Button variant="primary" className='mx-2' onClick={()=> {}}>
                    {Translate[lang].export}
                </Button> */}
                <ExportCSV 
                    fileName={reportType}
                    csvData={exportData}
                />
            </div>
        </div>
        {loading ? <Card style={{padding: '10rem 0'}} className="mt-4">
            <Card.Body>
                <Loader/>
            </Card.Body>
        </Card> : <Card className="mt-4">
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
                    {(reportType === 'products' && hasData === 2) && products?.map((product, index)=>{
                        return <Products item={product} index={index} />
                    })}
                    {(reportType === 'products' && hasData === 1) && <NoData />}

                    {((reportType === 'orders' || reportType === 'sales') && hasData === 2)&& orders?.map((order, index)=>{
                        return <Orders item={order} index={index} type={reportType} />
                    })}
                    {((reportType === 'orders' || reportType === 'sales') && hasData === 1) && <NoData />}

                    {(reportType === 'users' && hasData === 2) && users?.map((user, index)=>{
                        return <Users item={user} index={index} />
                    })}
                    {(reportType === 'users' && hasData === 1) && <NoData />}

                    {(reportType === 'promo_codes' && hasData === 2) && promoCodes?.map((code, index)=>{
                        return <PromoCodes item={code} index={index} />
                    })}
                    {(reportType === 'promo_codes' && hasData === 1) && <NoData />}
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
        </Card>}
        </>
    )
}

export default Reports;