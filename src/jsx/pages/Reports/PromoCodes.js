const PromoCodes = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.amount}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.end_date}</td>
                    <td>{item.max_usage}</td>
                    <td>{item.count_usage}</td>
                  </tr>
    )
}
export default PromoCodes;