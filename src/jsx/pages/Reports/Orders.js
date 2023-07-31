import { Badge } from "react-bootstrap";

const Orders = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>                    
            <td>{item.customer_name}</td>
            <td>{item.customer_email}</td>
            <td>{item.customer_phone}</td>
            <td>{item.total_price}</td>
            <td>{item.payment_status}</td>
            <td>
                <Badge
                    variant={`${item.status === 'Delivered' ? 'success' : 
                                item.status === 'Canceled' ? 'danger' :
                                item.status === 'Ordered' ? 'primary' :
                                item.status === 'Processing' ? 'warning' :
                                item.status === 'Shipped' ? 'info' : ''}  light`}
                >
                    {item.status}
                </Badge>
            </td>
        </tr>
    )
}
export default Orders;