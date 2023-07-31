import { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";
import PromoCodes from "./PromoCodes";

const FilterReport = ['Products', 'Orders', 'Users', 'PromoCodes']
const Reports = ()=> {
    let [reportType, setReportType] = useState(FilterReport[0])
    let date = new Date()
    let startDate = new Date(`1/${date.getMonth()+1}/${date.getFullYear()}`)
    let endDate = new Date(`1/${date.getMonth()+2}/${date.getFullYear()}`)
    let data = {
        Orders:{
            rows: ['Customer Name','Customer Email', 'Customer Phone', 'Total Price', 'Payment Method', 'Status'],
            data: [
                {id: 1, customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 280, payment_status: 'cash', status: 'Ordered'},
                {id: 2, customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 380, payment_status: 'visa', status: 'Processing'},
                {id: 3, customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 180, payment_status: 'cash', status: 'Shipped'},
                {id: 4, customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 80, payment_status: 'visa', status: 'Delivered'},
                {id: 5, customer_name: 'mu', customer_email: 'mu@gmail.com',customer_phone:'01000000', total_price: 80, payment_status: 'visa', status: 'Canceled'},
            ],
            service: ''
        },
        Products:{
            rows: ['Image','Name', 'Category', 'Price', 'In Stock'],
            data: [
                {id: 1, name: 'product 1', category: 'Category one', price: 280, quantity: 9},
                {id: 2, name: 'product 2', category: 'Category two', price: 380, quantity: 20},
                {id: 3, name: 'product 3', category: 'Category one', price: 180, quantity: 40},
                {id: 4, name: 'product 4', category: 'Category two', price: 80, quantity: 44},
            ],
            service: ''
        },
        Users: {
            rows: ['Name', 'Email', 'Mobile', 'Count Orders'],
            data: [
                {id: 1, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9},
                {id: 2, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20},
                {id: 3, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40},
                {id: 4, name: 'na', email: 'na@gmail.com', phone: '01002123123', count_orders: 44},
                {id: 5, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9},
                {id: 6, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20},
                {id: 7, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40},
                {id: 8, name: 'na', email: 'na@gmail.com', phone: '01002123123', count_orders: 44},
                {id: 9, name: 'mu', email: 'mu@gmail.com', phone: '01002123123', count_orders: 9},
                {id: 10, name: 'os', email: 'os@gmail.com', phone: '01002123123', count_orders: 20},
                {id: 11, name: 'fa', email: 'fa@gmail.com', phone: '01002123123', count_orders: 40},
              ],
            service: ''
        },
        PromoCodes:{
            rows: ['Name', 'Amount', 'Type', 'End Date', 'Max Usage', 'Count Usage'],
            data: [
                {id: 1, name: 'mu', amount: 5, type: 'Percentage', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: true},
                {id: 2, name: 'os', amount: 5, type: 'Fixed Amount', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: false},
                {id: 3, name: 'fa', amount: 5, type: 'Percentage', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: true},
                {id: 4, name: 'na', amount: 5, type: 'Fixed Amount', end_date: '9/4/2024', max_usage: 5, count_usage: 5, status: false},
              ],
            service: ''
        },
    }

    return(
        <>
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <div className="rangeDatePicker">
                    <label> Date Range</label>
                    <DateRangePicker initialSettings={{ startDate: startDate, endDate: endDate }} >
                        <input type="text" className="form-control w-100 input-daterange-timepicker" />
                    </DateRangePicker>
                </div>
                
                <div className="mt-3">
                    {FilterReport.map(data=>{
                        return <Button  
                                    variant={data === reportType ? 'success' : 'outline-success'} 
                                    className='h-75 mr-3' 
                                    onClick={()=> setReportType(data)}>
                                {data}
                            </Button>
                    })}
                </div>
            </div>
            <div>
                <Button variant="primary" className='mx-2' onClick={()=> {}}>
                    Export
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
                        <strong>{row}</strong>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data[reportType]?.data?.map((item, index)=>{
                    if(reportType === 'Orders'){
                        return <Orders item={item} index={index} />
                    } else if(reportType === 'Products'){
                        return <Products item={item} index={index} />
                    } else if(reportType === 'Users'){
                        return <Users item={item} index={index} />
                    } else if(reportType === 'PromoCodes'){
                        return <PromoCodes item={item} index={index} />
                    }
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

export default Reports;