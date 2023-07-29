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
import Search from "../../../common/Search";
import PageTitle from "../../../layouts/PageTitle";
import AddCategoriesModal from "./AddCategoriesModal";
import CardItem from "./CardItem";
import './style.scss'

const Categories = () => {
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [search, setSearch] = useState(null)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    const items = [
        {id: 1, name: 'Pants', status: true},
        {id: 2, name: 't-shirts', status: false},
    ]

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
                <tbody className="table-body">
                    {items?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                            setItem={setItem}
                            setAddModal={setAddModal}
                        />
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && <AddCategoriesModal item={item} addModal={addModal} setAddModal={()=> setAddModal(false)}/>}
    </Fragment>
  );
};

export default Categories;
