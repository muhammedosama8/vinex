import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import Select from 'react-select'
import { Rules } from "../../Enums/Rules";

const Permission = () =>{
    const [formData, setFormData]= useState({})
    const [adminsOptions, setAdminsOptions]= useState([])
    const [rules, setRules] = useState({})

    useEffect(()=>{
        let values = {}
        Rules.map(rul=> values[rul.value] = 'read')
        setRules({...values})
    },[])

    const onSubmit = (e) =>{
        e.preventDefault();
    }

    return<form onSubmit={onSubmit}>
        <Card>
            <Card.Body>
                <div className='form-row mb-3'>
                    <div className='form-group w-100'>
                        <lable>Admin</lable>
                        <Select
                            value={formData.category}
                            name="categories"
                            options={adminsOptions}
                            onChange={(e)=> setFormData({...formData, admin: e})}
                        />
                    </div>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="w-50">
                                <strong> Rule</strong>
                            </th>
                            <th className="w-25 text-center"> 
                                <strong>Full Permission</strong>
                            </th>
                            <th className="w-25 text-center">
                                <strong>Read Only</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Rules?.map((rul,index)=>{
                            return <tr key={index}>
                                <th>
                                <strong>{rul.label}</strong></th>
                                <th className="text-center">
                                    <input 
                                        type='radio'
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            accentColor: '#FE634E'
                                        }}
                                        name={rul.value} 
                                        onChange={()=> setRules({...rules, [rul.value]: 'full'})}
                                    />
                                </th>
                                <th className="text-center">
                                    <input 
                                        type='radio' 
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            accentColor: '#FE634E'
                                        }}
                                        name={rul.value} 
                                        onChange={()=> setRules({...rules, [rul.value]: 'read'})}
                                    />
                                </th>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end mt-5">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Card.Body>
        </Card>
    </form>
}
export default Permission;