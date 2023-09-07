import React, { Fragment } from "react";
import { useState } from "react";
import {
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import SubCategoriesService from "../../../services/SubCategoriesService";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import AddSubCategoriesModal from "./AddSubCategoriesModal";
import CardItem from "./CardItem";
import './style.scss'

const SubCategories = () => {
    const [subCategories, setSubCategories] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState({})
    const [search, setSearch] = useState(null)
    const [hasData, setHasData] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const subCategoriesService = new SubCategoriesService()

  return (
    <Fragment>
        <div className="d-flex justify-content-between mb-3 align-items-center">
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
          {isExist('sub_categories') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              {Translate[lang]?.add} {Translate[lang]?.sub_categories}
          </Button>}
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
                      <strong>{Translate[lang]?.categories}</strong>
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
                  setLoading={setLoading}
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
