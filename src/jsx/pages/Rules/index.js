import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import Select from 'react-select'
import { Rules } from "../../Enums/Rules";
import AdminService from "../../../services/AdminService";

const Permission = () =>{
    const [formData, setFormData]= useState({
        admin: '',
        rules: []
    })
    const [adminsOptions, setAdminsOptions]= useState([])
    const [rules, setRules] = useState({})
    const adminService = new AdminService()

    useEffect(()=>{
        adminService.getList().then(res=>{
          if(res.status === 200){
            let admins = res.data?.admins?.map(admin=>{
                return {
                    id: admin.id,
                    value: admin.id,
                    label: `${admin.f_name} ${admin.l_name}`,
                    rules: admin.admin_roles,
                    data: admin
                }
            })
            setAdminsOptions(admins)
          }
        })
    },[])

    // useEffect(()=>{
    //     let values = {}
    //     Rules.map(rul=> values[rul.value] = false)
    //     setRules({...values})
    // },[])

    useEffect(()=> {
        if(!!formData.admin){
            if(formData.admin.rules?.length === 0){
                let values = {}
                Rules.map(rul=> values[rul.value] = false)
                setFormData({...formData, rules: values})
            }else{
                setFormData({...formData, rules: formData.admin.rules})
            }
        }
    },[formData.admin])

    const onSubmit = (e) =>{
        e.preventDefault();
        let data ={
            email: formData?.admin?.data?.email,
            f_name: formData?.admin?.data?.f_name,
            l_name: formData?.admin?.data?.l_name,
            phone: formData?.admin?.data?.phone,
            rules: formData?.rules
        }
    }

    return<form onSubmit={onSubmit}>
        <Card>
            <Card.Body>
                <div className='form-row mb-3'>
                    <div className='form-group w-100'>
                        <lable>Admin</lable>
                        <Select
                            value={formData.admin}
                            name="admin"
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
                                        checked={formData.rules[rul.value]}
                                        onChange={()=> setFormData({...formData, rules: {...formData.rules, [rul.value]: true}})}
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
                                        checked={Object.keys(formData.rules).length > 0 && !formData.rules[rul.value]}
                                        name={rul.value} 
                                        onChange={()=> setFormData({...formData, rules: {...formData.rules, [rul.value]: false}})}
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