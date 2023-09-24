import { useEffect, useRef, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
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
import { ExportCSV } from "./Exports";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";

const FilterReport = ['products', 'digital_products', 'orders', 'users', 'promo_codes', 'sales']
const data = {
    orders:{
        rows: ['customer_name','email', 'phone', 'total_price', 'delivery_day', 'from', 'to', 'payment_method', 'reference_id', 'invoice_id', 'post_date', 'createdAt', 'status']
    },
    products:{
        rows: ['image','name', 'category', 'price', 'in_stock']
    },
    digital_products:{
        rows: ['image','name', 'category', 'price', 'in_stock']
    },
    users: {
        rows: ['name', 'email', 'phone', 'orders']
    },
    promo_codes:{
        rows: ['name', 'quantity', 'type', 'start_date', 'end_date', 'max_usage', 'count_usage']
    },
    sales:{
        rows: ['customer_name','email', 'phone', 'total_price', 'net_profit', 'delivery_day', 'from', 'to', 'payment_method', 'reference_id', 'invoice_id', 'post_date', 'createdAt', 'status']
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
    let [search, setSearch] = useState('')
    let [loading, setLoading] = useState(false)
    let date = new Date()
    let [rangeDate, setRangeDate] = useState({
        from: '',
        to: ''
    })
    const lang = useSelector(state=> state.auth.lang)
    const productsService = new ProductsService()
    const ordersService = new OrdersService()
    const userService = new UserService()
    const promoCodeService = new PromoCodeService()
    const range = useRef()

    useEffect(()=>{
        setHasData(null)
        setLoading(true)
        let params = {}
        if(!!rangeDate.from && !!rangeDate.to){
            params={
                from: `${rangeDate.from}T00:00:00`,
                to: `${rangeDate.to}T00:00:00`
            }
        }
        
        if(reportType === 'products' || reportType === 'digital_products'){
            params['isDeleted'] = false
            params['type'] = reportType === 'products' ? 'normal' : 'digital'
            productsService.getList(params).then(res=>{
                if(res.status === 200){
                    setProducts(res.data?.meta?.data)
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    const exData = res.data?.meta?.data?.map(item=>{
                        return {
                            id: item.id, 
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
            ordersService.getList(params).then(res=>{
                if(res.status === 200){
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    setOrders(res.data?.meta?.data)

                    const exData = res.data?.meta?.data?.map(item=>{
                        let obj = {
                            order_id: item.id, 
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
            userService.getList(params).then(res=>{
                if(res.status === 200){
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    setUsers(res.data?.meta?.data)

                    const exData = res.data?.meta?.data?.map(item=>{
                        return {
                            id: item.id, 
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
            promoCodeService.getList(params).then(res=>{
                if(res.status === 200){
                    if(res.data?.meta?.data.length){
                        setHasData(2)
                    } else {
                        setHasData(1)
                    }
                    setPromoCodes(res.data?.meta?.data)

                    const exData = res.data?.meta?.data?.map(item=>{
                        return {
                            id: item.id, 
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
    },[reportType, rangeDate])

    const getDate= (theDate)=>{
        const date = new Date(theDate);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
        const year = date.getFullYear();

        if(month<10 && day < 10){
            return `${year}-0${month}-0${day}`;
        }
        if(month<10){
            return `${year}-0${month}-${day}`;
        }
        if(day<10){
            return `${year}-${month}-0${day}`;
        }
        return `${year}-${month}-${day}`;
    }

    const handleCallback=(start, end)=> {
        let startDate = start?._d
        let endDate = end?._d

        setRangeDate({
            from: getDate(startDate),
            to: getDate(endDate),
        })
    }

    return(
        <>
        <div className="reports d-flex justify-content-between align-items-center">
            <div className="input-grou w-50 position-relative">
                {(reportType === 'orders' || reportType === 'sales') && <><input 
                    type="text" 
                    style={{borderRadius: '8px',
                    color: 'initial',
                    padding: '18px 33px 18px 16px'}}
                    className="form-control"
                    placeholder={`${Translate[lang]?.search_by} ${Translate[lang]?.order_id}, ${Translate[lang]?.invoice_id}`}
                    value={search}
                    onChange={e=> setSearch(e.target.value)} 
                />
                <div className="flaticon-381-search-2"
                style={{position: 'absolute', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
                ></div>
                </>}
            </div>
            <div className="rangeDatePicker w-25 position-relative">
                <DateRangePicker onCallback={handleCallback} ref={range} >
                    <input type="text" className="form-control w-100 input-daterange-timepicker" />
                </DateRangePicker>
                <i 
                    className="la la-times position-absolute" 
                    style={{ top: '50%', left: '6px',cursor: 'pointer', transform: 'translate(0px, -50%)'}}
                    onClick={()=> {
                        range.current.setStartDate(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
                        range.current.setEndDate(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
                        if(!!rangeDate.from && !!rangeDate.to) setRangeDate({form:'', to:''})
                    }}
                ></i>
            </div>
        </div>
        <div className="reports d-flex justify-content-between align-items-center">
            <div className="mt-3">
                {FilterReport.map(data=>{
                    return <Button  
                                variant={data === reportType ? 'success' : 'outline-success'} 
                                className='h-75 mr-3 mb-2' 
                                onClick={()=> {
                                    setReportType(data)
                                    setRangeDate({from: '', to: ''})
                                    range.current.setStartDate(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
                                    range.current.setEndDate(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
                                }}>
                                {Translate[lang][data]}
                    </Button>
                })}
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
            <Card.Body className='text-center'>
              {hasData === 1 && <NoData />}
              {hasData === 2 && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>{(reportType === 'orders' || reportType === 'sales') ? Translate[lang]?.order_id : 'I.D'}</strong>
                    </th>
                    {data[reportType]?.rows?.map((row, index)=>{
                        return <th key={index}>
                        <strong>{Translate[lang][row]}</strong>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                    {((reportType === 'products' || reportType === 'digital_products') && hasData === 2) && products?.map((product, index)=>{
                        return <Products item={product} index={index} />
                    })}
                    
                    {((reportType === 'orders' || reportType === 'sales') && hasData === 2)&& orders?.map((order, index)=>{
                        return <Orders item={order} index={index} type={reportType} />
                    })}

                    {(reportType === 'users' && hasData === 2) && users?.map((user, index)=>{
                        return <Users item={user} index={index} />
                    })}

                    {(reportType === 'promo_codes' && hasData === 2) && promoCodes?.map((code, index)=>{
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
              </Table>}

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