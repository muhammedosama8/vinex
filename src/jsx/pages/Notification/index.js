import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import CardItem from "./CardItem";

const Notification = ()=>{
    const [notification, setNotification] = useState([])
    const [hasData, setHasData] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const navigate = useNavigate()
    useEffect(()=>{
        setNotification([
            {id: 1,name_ar: 'اشعار ١',name_en: 'notification 1', message_ar: 'رساله ١', message_en: 'message 1'},
            {id: 2,name_ar: 'اشعار ٢',name_en: 'notification 2', message_ar: 'رساله ٢', message_en: 'message 2'},
            {id: 3,name_ar: 'اشعار ٣',name_en: 'notification 3', message_ar: 'رساله ٣', message_en: 'message 3'},
            {id: 4,name_ar: 'اشعار ٤',name_en: 'notification 4', message_ar: 'رساله ٤', message_en: 'message 4'},
        ])
        setHasData(1)
    },[])
    return(
        <>
        <div className="d-flex mb-3 justify-content-end">
            {isExist('notification') && <Button 
                variant='primary'
                onClick={()=>{
                    navigate('add-notification')
                }}>
                Add Notification
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
                      <strong>Title</strong>
                    </th>
                    <th>
                      <strong>Message</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {notification?.map((item, index) =>{
                        return <CardItem
                            index= {index}
                            key= {index}
                            item={item}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setNotification}
                  service={categoriesService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  isDeleted={isDeleted}
              /> */}
            </Card.Body>
        </Card>
        </>
    )
}

export default Notification;