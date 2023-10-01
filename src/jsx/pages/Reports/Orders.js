import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";

const Orders = ({item, index,type}) =>{
    const [cost, setCost] = useState()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        let calcCost = item?.sub_carts?.map(res=> res.product?.cost).reduce((total, cost) => total + cost, 0);
        setCost(calcCost)
    },[])

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>                    
            <td>{item.user.f_name || '-'} {item.user.l_name}</td>
            <td>{item.user.email || '-'}</td>
            <td style={{direction: 'ltr'}}>{item.user.country_code}{item.user.phone}</td>
            <td>{item.total}</td>
            {type==='sales' && <td>{item.total-cost}</td>}
            <td>{item?.day?.split('T')[0] || '-'}</td>
            <td>{item.interval_hour?.from?.split(':')[0] || '-'}:{item.interval_hour?.from?.split(':')[1] || '-'}</td>
            <td>{item.interval_hour?.to?.split(':')[0] || '-'}:{item.interval_hour?.to?.split(':')[1] || '-'}</td>
            <td>{Translate[lang][item.payment_method]}</td>
            <td>{item?.payments[0]?.Ref || '-'}</td>
            <td>{item?.payments[0]?.invoice_id || '-'}</td>
            <td>{item?.payments[0]?.PostDate || '-'}</td>
            <td>{item?.payments[0]?.createdAt?.split('T')[0] || '-'}</td>
            <td>
                <Badge
                    variant={`${item.status === 'delivered' ? 'success' : 
                                item.status === 'canceled' ? 'danger' :
                                item.status === 'ordered' ? 'primary' :
                                item.status === 'process' ? 'warning' :
                                item.status === 'shipped' ? 'info' : ''}  light`}
                >
                    {Translate[lang][item.status]}
                </Badge>
            </td>
        </tr>
    )
}
export default Orders;