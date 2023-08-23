import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../../services/NotificationService";
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
    const notificationService = new NotificationService()

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
              <Pagination
                  setData={setNotification}
                  service={notificationService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
              />
            </Card.Body>
        </Card>
        </>
    )
}

export default Notification;