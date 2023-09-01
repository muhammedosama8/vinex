import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import Select from 'react-select'
import { Rules } from "../../Enums/Rules";
import AdminService from "../../../services/AdminService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changeAdminRules } from "../../../store/actions/AuthActions";
import { useNavigate } from "react-router-dom";

const Permission = () =>{
    const [formData, setFormData]= useState({
        admin: '',
        rules: []
    })
    const [adminsOptions, setAdminsOptions]= useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const adminService = new AdminService()
    const Auth = useSelector(state=> state.auth?.auth)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const [shouldUpdate, setShouldUpdate]= useState(false)
    let id = window.location.pathname.split('/rules/')[1]

    useEffect(()=>{
        adminService.getList().then(res=>{
          if(res?.status === 200){
            let admins = res.data?.meta?.data?.map(admin=>{
                let adminRes = {
                    id: admin.id,
                    value: admin.id,
                    label: `${admin.f_name} ${admin.l_name}`,
                    rules: admin.admin_roles,
                    data: admin
                }
                if(!!id && Number(id) === Number(admin.id)){
                    setFormData({rules: [], admin: {...adminRes}})
                }
                return {...adminRes}
            })
            setAdminsOptions(admins)
          }
        })
    },[shouldUpdate])

    useEffect(()=> {
        if(formData.admin.rules?.length !== 0){
            let rules = formData.admin.rules?.map(rul=> rul['role'])
            const filterData = (value) => rules?.includes(value);
            const update = Rules.filter(({value}) => filterData(value))?.map(rul=> rul['value']);

            setFormData({...formData, rules: update})
        }
    },[formData.admin])

    const onSubmit = (e) =>{
        e.preventDefault();
        let id= formData?.admin?.id
        let data ={
            // email: formData?.admin?.data?.email,
            f_name: formData?.admin?.data?.f_name,
            l_name: formData?.admin?.data?.l_name,
            // phone: formData?.admin?.data?.phone,
            rules: formData.rules
        }

        adminService.update(id,data).then(res=>{
            if(res?.status === 200){
                dispatch(changeAdminRules(formData.rules))
                localStorage.setItem('LeapAdminRules', JSON.stringify(formData.rules));
                toast.success(`Added Rules for ${formData?.admin?.label}`)
                window.scrollTo(0,0)
                setFormData({admin: '', rules: []})
                if(!!id){
                    setShouldUpdate(prev=> !prev)
                    navigate('/admins')
                }
            }
        })
    }

    return<form onSubmit={onSubmit}>
        <Card>
            <Card.Body>
                <div className='form-row mb-3'>
                    <div className='form-group w-50'>
                        <lable>Admin</lable>
                        <Select
                            value={formData.admin}
                            name="admin"
                            options={adminsOptions}
                            onChange={(e)=> setFormData({rules: [], admin: e})}
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
                                    <strong>{rul.label}</strong>
                                </th>
                                <th className="text-center">
                                    <input 
                                        type='radio'
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            accentColor: 'rgb(254, 69, 0)'
                                        }}
                                        name={rul.value} 
                                        checked={formData?.rules?.includes(rul?.value)}
                                        onChange={()=> setFormData({...formData, rules: [...formData.rules, rul.value]})}
                                    />
                                </th>
                                <th className="text-center">
                                    <input 
                                        type='radio' 
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            accentColor: 'rgb(254, 69, 0)'
                                        }}
                                        checked={Object.keys(formData?.admin).length > 0 && !formData.rules?.includes(rul.value)}
                                        name={rul.value} 
                                        onChange={()=> {
                                            let update = formData?.rules?.filter(res=> res!==rul.value)
                                            setFormData({...formData, rules: [...update ]})
                                        }}
                                    />
                                </th>
                            </tr>
                        })}
                    </tbody>
                </Table>
                {isExist('rules') &&<div className="d-flex justify-content-end mt-5">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>}
            </Card.Body>
        </Card>
    </form>
}
export default Permission;