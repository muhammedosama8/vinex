import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";

const PromoCodes = ({item, index}) =>{
  const lang = useSelector(state=> state.auth.lang)
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.amount}
                    </td>
                    <td>{Translate[lang][item.Type]}</td>
                    <td>{item.createdAt.split('T')[0]}</td>
                    <td>{item.end_date.split('T')[0]}</td>
                    <td>{item.max_usage}</td>
                    <td>{item.count_usage}</td>
                  </tr>
    )
}
export default PromoCodes;