import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import avatar1 from "../../../images/1.jpg";

const Products = ({item, index}) =>{
  const lang = useSelector(state=> state.auth.lang)
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>
                        <img
                          src={item.images[0]?.url}
                          className="rounded-lg"
                          width="40"
                          alt={item.id}
                        />
                    </td>
                    <td>{lang ==='en' ? item.name_en : item.name_ar}</td>
                    <td>
                      <Badge variant="success light">{lang ==='en' ? item.category.name_en :item.category.name_ar}</Badge>
                    </td>
                    <td>{item.price} LE</td>
                    <td>{item.amount}</td>
                  </tr>
    )
}
export default Products;