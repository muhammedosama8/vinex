import { useEffect, useState } from "react";
import { Badge, Card, Table, Dropdown, Form  } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductsService from "../../../../services/ProductsService";
import DeleteModal from "../../../common/DeleteModal";
import Loader from "../../../common/Loader";
import NoData from "../../../common/NoData";
import Pagination from "../../../common/Pagination/Pagination";
import { Translate } from "../../../Enums/Tranlate";
import CardItem from "./CardItem";

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
    const productsService = new ProductsService()

    useEffect(()=> {
        let code = Number(location?.state)
        setLoading(true)
        productsService.getCustomProducts(code)?.then(res=>{
            if(res?.status === 200){
                setProducts(res?.data?.meta?.data)
                if(res?.data?.meta?.data?.length > 0){
                    setHasData(1)
                } else{
                    setHasData(0)
                }
            }
            setLoading(false)
        })
    },[shouldUpdate])

    return <Card>
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
    </Card.Body>
  </Card>
}
export default EveryProduct;