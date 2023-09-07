import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminService from "../../../services/AdminService";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";

const Admins = () =>{
    const [admins, setAdmins] =useState(null)
    const [hasData, setHasData] =useState(null)
    const [search, setSearch] =useState(null)
    const [ shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] =useState(false)
    const navigate = useNavigate()
    const adminService = new AdminService()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const lang = useSelector(state=> state.auth?.lang)

    return(
        <>
        <div className="d-flex justify-content-between mb-3 align-items-center"> 
          <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 33px 18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}, ${Translate[lang]?.phone} `}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div> 
          {isExist('admin') && <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/admins/add-admins')}>
              {Translate[lang]?.add_admin}
          </Button>}
        </div>

        <Card>
            <Card.Body className={`${hasData === 0 ? 'text-center' :''}`}>
              {loading && <div style={{height: '300px'}}>
                <Loader />
              </div>}
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr>
                    <th className="px-2">
                      <strong>I.D</strong>
                    </th>
                    <th className="px-2">
                      <strong>{Translate[lang]?.name}</strong>
                    </th>
                    <th className="px-2">
                      <strong>{Translate[lang]?.email}</strong>
                    </th>
                    <th className="px-2">
                      <strong>{Translate[lang]?.phone}</strong>
                    </th>
                    <th className="px-2">
                      <strong>{Translate[lang]?.permissions}</strong>
                    </th>
                    <th className="px-2">
                      <strong>{Translate[lang]?.status}</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {admins?.length > 0 && admins?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    />
                  })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData/>}
              <Pagination
                  setData={setAdmins}
                  service={adminService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                />
            </Card.Body>
          </Card>
        </>
    )
}
export default Admins;