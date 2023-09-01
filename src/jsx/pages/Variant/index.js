import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VariantService from "../../../services/VariantService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";
import './style.scss'

const Variant = () =>{
    const [variant, setVariant] = useState([])
    const [search, setSearch] = useState(null)
    const [hasData, setHasData] =useState(null)
    const [shouldUpdate, setShouldUpdate] =useState(false)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const variantService = new VariantService()


    return(
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
            {isExist('variant') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/variant/add-variant')}>
              Add Variant
          </Button>}
          </div>
        <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
              {hasData === 1 && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Variant</strong>
                    </th>
                    {/* <th>
                      <strong>STATUS</strong>
                    </th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {variant?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    shouldUpdate={shouldUpdate}
                    />
                  })}
                </tbody>
              </Table>}

              {hasData === 0 && <NoData />}

              <Pagination
                  setData={setVariant}
                  service={variantService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                />
            </Card.Body>
          </Card>
        </>
    )
}
export default Variant;
