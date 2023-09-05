import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Translate } from "../../../../Enums/Tranlate"
import './style.scss'

const Pagination = ({setData, service,shouldUpdate, setHasData})=>{
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1)
    const lang= useSelector(state=> state.auth.lang)

    useEffect(()=> {
        service?.getList().then(res=>{
            if(res?.status === 200){
                setData([...res.data?.data]) 
                let total= Math.ceil(res.data?.data?.length / 10)
                setTotalPages(total)
                if(res.data?.data?.length > 0){
                    setHasData(1)
                } else {
                    setHasData(0)
                }
            }
          })
    },[page, shouldUpdate])

    useEffect(()=>{
        if(page > 1) setPage(1)
    },[shouldUpdate])

    if(totalPages > 1){
        return(
            <Row className="pagination mt-3 px-2">
                <Col md={12} className="d-flex justify-content-between">
                    <span>{Translate[lang].page}{' '}
                        <strong> {page} {Translate[lang].of} {totalPages}</strong>
                    </span>
                    <span className="table-index">
                    {Translate[lang].go_to_page} : {' '}
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
                                defaultValue={page} 
                                onChange = {e => { 
                                    if(!!e.target.value && Number(e.target.value) > 0 && Number(e.target.value) <= totalPages){
                                        setPage(e.target.value)
                                    }
                                }} 
                            />
                    </span>
                </Col>

                <Col md={12} className="text-center">	
                    <div className="filter-pagination  mt-3">
                        <button className=" previous-button" onClick={() => setPage(1)} disabled={page === 1 }>{'<<'}</button>
                                    
                        <button className="previous-button" onClick={() => setPage(prev=> prev-1)} disabled={page === 1}>
                            {Translate[lang].previous}
                        </button>
                        <button className="next-button" onClick={() => setPage(prev=> prev+1)} disabled={page === totalPages}>
                            {Translate[lang].next}
                        </button>
                        <button className=" next-button" onClick={() => setPage(totalPages)} disabled={page === totalPages}>{'>>'}</button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Pagination;