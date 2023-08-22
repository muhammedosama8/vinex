import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import './style.scss'

const Pagination = ({setData, service,shouldUpdate,isDeleted, setHasData})=>{
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1)
    const [pageShow, setPageShow] = useState(1)

    useEffect(()=> {
        service?.getList({offset: (page-1)*10, limit: 10, isDeleted: isDeleted}).then(res=>{
            if(res?.status === 200){
                setData([...res.data?.meta?.data]) 
                let total= Math.ceil(res.data?.meta?.totalLength / 10)
                setTotalPages(total)
                if(res.data?.meta?.totalLength > 0){
                    setHasData(1)
                } else {
                    setHasData(0)
                }
            }
        })
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },[page, shouldUpdate])

    useEffect(()=>{
        if(page > 1) setPage(1)
    },[shouldUpdate])

    useEffect(()=>{
        setPage(1)
    },[isDeleted])

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
                                min={'1'}
                                max={totalPages}
                                defaultValue={pageShow} 
                                value={pageShow} 
                                onChange = {e => { 
                                    setPageShow(e.target.value)
                                    if(!!e.target.value && parseInt(e.target.value) > 0 && parseInt(e.target.value) <= totalPages){
                                        setPage(e.target.value)
                                    }
                                }} 
                            />
                    </span>
                </Col>
{console.log(typeof page)}
                <Col md={12} className="text-center">	
                    <div className="filter-pagination  mt-3">
                        <button className=" previous-button" onClick={() => {
                            setPage(1)
                            setPageShow(1)
                        }} disabled={parseInt(page) === 1 }>{'<<'}</button>
                                    
                        <button className="previous-button" onClick={() => {
                            setPage(prev=> parseInt(prev)-1)
                            setPageShow(page-1)
                        }} disabled={parseInt(page) === 1 }>
                            Previous
                        </button>
                        <button className="next-button" onClick={() => {
                            setPage(prev=> parseInt(prev)+1)
                            setPageShow(page+1)
                        }} disabled={parseInt(page) === totalPages}>
                            Next
                        </button>
                        <button className=" next-button" onClick={() => {
                            setPage(parseInt(totalPages))
                            setPageShow(parseInt(totalPages))
                        }} disabled={parseInt(page) === totalPages}>{'>>'}</button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Pagination;