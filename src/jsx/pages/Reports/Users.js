const Users = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
                    <td style={{padding: '12px 20px'}}>
                      <strong>{item.id}</strong>
                    </td>
                    <td>
                      {item.f_name || '-'} {item.l_name}
                    </td>
                    <td>
                      {item.email || '-'}
                    </td>
                    <td style={{direction: 'ltr'}}>{item.user_phones?.filter(res=> res?.is_default)[0] ? `${item.user_phones?.filter(res=> res?.is_default)[0]?.country_code}${item.user_phones?.filter(res=> res?.is_default)[0]?.phone}` : '-'}</td>
                    <td>{item.count_orders || '0'}</td>
                  </tr>
    )
}
export default Users;