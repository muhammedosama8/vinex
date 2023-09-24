import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import CurrencyService from "../../../../services/CurrencyService";
import NoData from "../../../common/NoData";
import AddCurrencyModal from "./AddCurrencyModal";
import CardItem from "./CardItem";
import './style.scss'
import { Translate } from "../../../Enums/Tranlate";
import Loader from "../../../common/Loader";

const Currency = () => {
    const [currency, setCurrency] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] =useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const currencyService = new CurrencyService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
      let params = {}
      if(!!search) params['search'] = search
      currencyService?.getList(params).then(res=>{
        if(res?.status === 200){
            setCurrency([...res.data?.data]) 
            if(res.data?.data?.length > 0){
                setHasData(1)
            } else {
                setHasData(0)
            }
        }
        setLoading(false)
    })
    },[shouldUpdate, search])
  
  return (
    <Fragment>
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
              style={{position: 'absolute',zIndex:'99', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          {isExist('currency') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              {Translate[lang]?.add} {Translate[lang]?.currency}
          </Button>}
        </div>
      
      <Row>
        <Col lg={12}>
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
                      <strong>{Translate[lang]?.country_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.rate}</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {currency?.map((item, index) =>{
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
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddCurrencyModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}
    </Fragment>
  );
};

export default Currency;
