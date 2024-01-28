import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Translate } from "../../../Enums/Tranlate";

const OrderDetails = () => {
    const [formData, setFormData] = useState({})
    const history = useLocation();
    const lang = useSelector(state=> state.auth.lang)

  useEffect(()=>{
    setFormData(history.state)
  },[])

  return <>
  <Card>
    <Card.Body>
    <Table responsive>
              <thead>
                <tr className="text-center">
                  <th>
                    <strong>I.D</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.name}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.price}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.amount}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.total_price}</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData?.sub_carts?.map((cart, index)=>{
                    return <tr key={index} className="text-center">
                        <td>{cart.id}</td>
                        <td>{lang === 'en' ? cart.product.name_en : cart.product.name_ar}</td>
                        <td>{cart.product.price}</td>
                        <td>{cart.amount}</td>
                        <td>{Number(cart.amount)*Number(cart.product.price)}</td>
                    </tr>
                })}
              </tbody>
            </Table>
    </Card.Body>
  </Card>
    
  </>;
};
export default OrderDetails;
