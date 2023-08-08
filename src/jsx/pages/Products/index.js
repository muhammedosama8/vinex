import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductsService from "../../../services/ProductsService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import CardItem from "./CardItem";

const Products = () =>{
    const [products, setProducts] =useState([])
    const [hasData, setHasData] =useState(null)
    const [addModal, setAddModal] =useState([])
    const [search, setSearch] =useState(null)
    const [ shouldUpdate, setShouldUpdate] = useState(false)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const productsService = new ProductsService()

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
          {isExist('products') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/products/add-products')}>
              Add Product
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
                    setAddModal={setAddModal}
                    setShouldUpdate={setShouldUpdate}
                    />
                  })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setProducts}
                  service={productsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                />
            </Card.Body>
          </Card>
        </>
    )
}
export default Products;