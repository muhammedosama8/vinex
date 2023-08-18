import React, { Fragment } from "react";
import { useState } from "react";
import {
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import SubCategoriesService from "../../../services/SubCategoriesService";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search";
import AddSubCategoriesModal from "./AddSubCategoriesModal";
import CardItem from "./CardItem";
import './style.scss'

const SubCategories = () => {
    const [subCategories, setSubCategories] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [search, setSearch] = useState(null)
    const [hasData, setHasData] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const subCategoriesService = new SubCategoriesService()

  return (
    <Fragment>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <Search search={search} setSearch={setSearch} placeholder='Search by I.D, Name' />
          {isExist('sub_categories') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              Add SubCategories
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
                      <strong>Categories</strong>
                    </th>
                    {/* <th>
                      <strong>STATUS</strong>
                    </th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                    {subCategories?.map((item, index) =>{
                        return <CardItem 
                            key={index}
                            index= {index}
                            item={item}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            subCategoriesService= {subCategoriesService}
                            setShouldUpdate={setShouldUpdate} 
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setSubCategories}
                  service={subCategoriesService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                />
            </Card.Body>
        </Card>

      {addModal && 
        <AddSubCategoriesModal 
          item={item} 
          setShouldUpdate={setShouldUpdate} 
          addModal={addModal} 
          setAddModal={()=> setAddModal(false)}
      />}
    </Fragment>
  );
};

export default SubCategories;
