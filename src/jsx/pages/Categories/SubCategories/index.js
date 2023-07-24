import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../../layouts/PageTitle";
import AddSubCategoriesModal from "./AddSubCategoriesModal";
import CardItem from "./CardItem";
import './style.scss'

const SubCategories = () => {
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})

    const items = [
        {id: 1, name: 'any name', category: 'one', status: true},
        {id: 2, name: 'any name', category: 'two' ,status: false},
    ]

  return (
    <Fragment>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="input-group w-50">
              <input type="text" style={{borderRadius: '1.25rem', color: 'initial', padding: '18px 16px'}} className="form-control" placeholder="Search by I.D, Name" />
              <div className="flaticon-381-search-2"
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translate(0, -50%)'}}
              ></div>
          </div>
        <Button variant="primary" className='me-2 h-75' onClick={()=> { 
            setItem({})
            setAddModal(true) }}>
            Add SubCategories
        </Button>
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
                      <strong>Categories</strong>
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
                            key={index}
                            index= {index}
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

      {addModal && <AddSubCategoriesModal item={item} addModal={addModal} setAddModal={()=> setAddModal(false)}/>}
    </Fragment>
  );
};

export default SubCategories;
