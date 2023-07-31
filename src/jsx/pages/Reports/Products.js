import { Badge } from "react-bootstrap";
import avatar1 from "../../../images/1.jpg";

const Products = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>
                        <img
                          src={avatar1}
                          className="rounded-lg"
                          width="40"
                          alt={item.id}
                        />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Badge variant="success light">{item.category}</Badge>
                    </td>
                    <td>{item.price} LE</td>
                    <td>{item.quantity}</td>
                  </tr>
    )
}
export default Products;