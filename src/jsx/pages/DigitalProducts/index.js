import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductsService from "../../../services/ProductsService";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";

const DigitalProducts = () =>{
    const [products, setProducts] =useState([])
    const [hasData, setHasData] =useState(0)
    const [search, setSearch] =useState(null)
    const [indexEdit, setIndexEdit] = useState(null)
    const [isDeleted, setIsDeleted] =useState(false)
    const [loading, setLoading] =useState(false)
    const [ shouldUpdate, setShouldUpdate] = useState(false)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const productsService = new ProductsService()

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 33px 18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}`}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          {isExist('products') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/digital-products/add-products')}>
          {Translate[lang]?.add} {Translate[lang]?.digital_products}
          </Button>}
        </div>
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
                      <strong>Image</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Category</strong>
                    </th>
                    <th>
                      <strong>Price</strong>
                    </th>
                    <th>
                      <strong>In Stock</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
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
              {(hasData === 0 && !loading) && <NoData />}
              <Pagination
                  setData={setProducts}
                  service={productsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  isDeleted={isDeleted}
                  setLoading={setLoading}
                  type={'digital'}
                />
            </Card.Body>
          </Card>
        </>
    )
}
export default DigitalProducts;