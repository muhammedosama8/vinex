import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../../common/Search";
import CardItem from "./CardItem";
import './style.scss'

const Variant = () =>{
    const [variant, setVariant] = useState([])
    const [search, setSearch] = useState(null)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
        let variant =[
          {id: 1, name: 'mu', status: true},
          {id: 2, name: 'os', status: false},
          {id: 3, name: 'fa', status: true},
          {id: 4, name: 'na', status: false},
        ]
        setVariant([...variant])
      },[])

    return(
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
            {isExist('variant') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/variant/add-variant')}>
              Add Variant
          </Button>}
          </div>
        <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {variant?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    />
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
    )
}
export default Variant;