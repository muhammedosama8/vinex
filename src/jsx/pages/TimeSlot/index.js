import { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import TimeSlotService from "../../../services/TimeSlotService"
import NoData from "../../common/NoData"
import Pagination from "../../common/Pagination/Pagination"
import CardItem from "./CardItem"

const TimeSlot = () =>{
    const [timeSlot, setTimeSlot] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [isDeleted, setIsDeleted] =useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const timeSlotService = new TimeSlotService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
        timeSlotService.getList().then(res=>{
            if(res.status === 200){
                console.log(res)
                setTimeSlot(res.data.data)
                setHasData(1)
            }
        })
    },[shouldUpdate])
  return (
    <>
        {/* <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div></div>
          {isExist('categories') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              Add Categories
          </Button>}
        </div> */}
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
                    <th>
                      <strong>From</strong>
                    </th>
                    <th>
                      <strong>To</strong>
                    </th>
                    <th>
                      <strong>Capacity</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {timeSlot?.map((item, index) =>{
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
{console.log(timeSlot)}
      {/* {addModal && 
        <AddCategoriesModal 
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />} */}
    </>
  );
}
export default TimeSlot;