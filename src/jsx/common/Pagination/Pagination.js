import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import './style.scss'

const Pagination = ({setData, service,shouldUpdate})=>{
    const [dataItems, setDataItems] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1)
    useEffect(()=>{
        service?.getList().then(res=>{
            // if(res?.status === 200){
                setDataItems([...res.data?.data]) 
                let total= Math.ceil(res.data?.admins?.length / 10)
                setTotalPages(total)
                setPage(1)
            // }
          })
    },[shouldUpdate])

    useEffect(()=> {
        const startIndex = (page - 1) * 10;
        const endIndex = Math.min(startIndex + 10, dataItems.length);
        const itemsToShow = dataItems.slice(startIndex, endIndex);
        setData(itemsToShow)
    }, [dataItems, page, setData, totalPages])

    if(totalPages > 1){
        return(
            <Row className="pagination mt-3 px-2">
                <Col md={12} className="d-flex justify-content-between">
                    <span>Page{' '}
                        <strong> {page} of {totalPages}</strong>
                    </span>
                    <span className="table-index">
                        Go to page : {' '}
                            <input 
                                type="number" 
                                className="ml-2"
                                style={{
                                    borderRadius: '0.3rem',
                                    background: '#fff',
                                    border: '1px solid hsl(0, 0%, 80%)',
                                    color: 'initial',
                                    height: '39px',
                                    padding: '8px',
                                    width: '5rem'
                                }}
                                max={totalPages}
                                defaultValue={page} 
                                onChange = {e => { 
                                    const pageNumber = Number(e.target.value) <= totalPages ? Number(e.target.value) : 1
                                    setPage(pageNumber)
                                }} 
                            />
                    </span>
                </Col>
                <Col md={12} className="text-center">	
                    <div className="filter-pagination  mt-3">
                        <button className=" previous-button" onClick={() => setPage(1)} disabled={page === 1 }>{'<<'}</button>
                                    
                        <button className="previous-button" onClick={() => setPage(prev=> prev-1)} disabled={page === 1}>
                            Previous
                        </button>
                        <button className="next-button" onClick={() => setPage(prev=> prev+1)} disabled={page === totalPages}>
                            Next
                        </button>
                        <button className=" next-button" onClick={() => setPage(totalPages)} disabled={page === totalPages}>{'>>'}</button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Pagination;