import { useEffect, useState } from "react";
import { Badge, Card, Table, Dropdown, Form, Button  } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductsService from "../../../../services/ProductsService";
import DeleteModal from "../../../common/DeleteModal";
import Loader from "../../../common/Loader";
import NoData from "../../../common/NoData";
import { Translate } from "../../../Enums/Tranlate";
import CardItem from "./CardItem";
import CustomProductsService from "../../../../services/CustomProductsService";
import Pagination from "../../../common/Pagination/Pagination";

const EveryProduct = () =>{
    const [products, setProducts] =useState([])
    const [hasData, setHasData] =useState(null)
    const [search, setSearch] =useState(null)
    const [loading, setLoading] =useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [isDeleted, setIsDeleted] =useState(false)
    const [ shouldUpdate, setShouldUpdate] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const customProductsService = new CustomProductsService()

    return <>
    <div className="d-flex align-items-center mb-3 ">
          <Button variant={isDeleted ? 'secondary' : 'primary'} className='mx-2' onClick={()=> setIsDeleted(false)}>
            {Translate[lang]?.active}
          </Button>
          <Button variant={!isDeleted ? 'secondary' : 'primary'} onClick={()=> setIsDeleted(true)}>
            {Translate[lang]?.not_active}
          </Button>
        </div>
        <Card>
    <Card.Body className={`${hasData === 0 && 'text-center'} `}>
    {loading && <div style={{height: '300px'}}>
        <Loader />
      </div>}
      {(hasData === 1 && !loading) && <Table responsive>
        <thead>
          <tr className='text-center'>
            <th>
              <strong>I.D</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.image}</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.name}</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.category}</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.variant}</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.price}</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.in_stock}</strong>
            </th>
            <th>
              <strong>{Translate[lang]?.status}</strong>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {products?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    setIndexEdit={setIndexEdit}
                    indexEdit={indexEdit}
                    />
                  })}
        </tbody>
      </Table>}
      {hasData === 0 && <NoData />}
      <Pagination
                  setData={setProducts}
                  service={customProductsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  isDeleted={isDeleted}
                  setLoading={setLoading}
                  type={'normal'}
                  search={search}
                  id={location?.state}
                />
    </Card.Body>
  </Card>
  </>
}
export default EveryProduct;