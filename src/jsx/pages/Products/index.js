import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../../common/Search";
import CardItem from "./CardItem";

const Products = () =>{
    const [products, setProducts] =useState([])
    const [addModal, setAddModal] =useState([])
    const [search, setSearch] =useState(null)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
      let products =[
        {id: 1, name: 'product 1', category: 'Category one', price: 280, quantity: 9, status: true},
        {id: 2, name: 'product 2', category: 'Category two', price: 380, quantity: 20, status: false},
        {id: 3, name: 'product 3', category: 'Category one', price: 180, quantity: 40, status: true},
        {id: 4, name: 'product 4', category: 'Category two', price: 80, quantity: 44, status: false},
      ]
      setProducts([...products])
    },[])

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
          {isExist('products') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/products/add-products')}>
              Add Product
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
                      <strong>Quantity</strong>
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
                    />
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
    )
}
export default Products;