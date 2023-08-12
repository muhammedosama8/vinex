import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PromoCodeService from "../../../services/PromoCodeService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";

const PromCodes = () =>{
    const [promCodes, setPromCodes] =useState([])
    const [search, setSearch] =useState(null)
    const [hasData, setHasData] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const promoCodeService = new PromoCodeService()

    return(
        <>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
            {isExist('promo_code') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/promo-codes/add-promo-codes')}>
              Add Promo Code
          </Button>}
          </div>
        <Card>
            <Card.Body className={`${hasData === 0 ? 'text-center' :''}`}>
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
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Type</strong>
                    </th>
                    <th>
                      <strong>End Date</strong>
                    </th>
                    <th>
                      <strong>Max Usage</strong>
                    </th>
                    <th>
                      <strong>Count Usage</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {promCodes?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    />
                  })}
                </tbody>
              </Table>}

              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setPromCodes}
                  service={promoCodeService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
              />
            </Card.Body>
          </Card>
        </>
    )
}
export default PromCodes;