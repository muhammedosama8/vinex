import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import CategoriesService from "../../../services/CategoriesService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import AddCategoriesModal from "./AddCategoriesModal";
import CardItem from "./CardItem";
import './style.scss'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const categoriesService = new CategoriesService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

  return (
    <Fragment>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
          {isExist('categories') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              Add Categories
          </Button>}
        </div>
      
      <Row>
        <Col lg={12}>
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
                    {/* <th>
                      <strong>STATUS</strong>
                    </th> */}
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {categories?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setCategories}
                  service={categoriesService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddCategoriesModal 
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}
    </Fragment>
  );
};

export default Categories;
