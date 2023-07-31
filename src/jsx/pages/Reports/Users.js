const Users = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>
                      {/* <Link to={`/users/${item.id}/${item.name}`} 
                        style={{fontWeight: '800', textDecoration:'underline', textTransform: 'capitalize'}}> */}
                        {item.name}
                      {/* </Link> */}
                    </td>
                    <td>
                      {item.email}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.count_orders}</td>
                  </tr>
    )
}
export default Users;