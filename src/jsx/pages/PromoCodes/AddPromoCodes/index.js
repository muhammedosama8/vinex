import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select'
import { toast } from "react-toastify";
import PromoCodeService from "../../../../services/PromoCodeService";

const AddPromoCodes = () => {
   const location = useLocation();
   const stateData = location.state;
   const [formData, setFormData] = useState({
        name: '',
        amount: '',
        type: '',
        end_date: '',
        max_usage: '',
        count_usage: '',
   })
   const [isAdd, setIsAdd] = useState(false)
   const [loading, setLoading] = useState(false)
   const promoCodeService = new PromoCodeService()
   const navigate = useNavigate()
   const [ typesOptions, setTypesOptions]= useState([])

   const handlerText = (e)=>{
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   useEffect(()=>{
      setTypesOptions([
         {label: 'Percentage', value: 'percentage'},
         {label: 'Fixed Amount', value: 'fixed'},
      ])
      if(stateData){
         setFormData({
            name: stateData.item?.name,
            amount: stateData.item?.amount,
            type: typesOptions?.filter(res=> res.value === stateData.item?.Type)[0],
            end_date: stateData.item?.end_date.split('T')[0],
            max_usage: stateData.item?.max_usage || '',
            count_usage: stateData.item?.count_usage || '',
         })
         setIsAdd(false)
      } else {
         setIsAdd(true)
      }
   },[])

   const onSubmit = (e) =>{
        e.preventDefault()
        let data = {
         name: formData.name,
         amount: parseInt(formData?.amount),
         Type: formData?.type?.value,
         end_date: formData?.end_date,
         max_usage: parseInt(formData?.max_usage) || 0,
         count_usage: parseInt(formData?.count_usage) || 0
        }
         setLoading(true)
         if(isAdd){
            promoCodeService.create(data).then(res=>{
               if(res?.status === 201){
                  toast?.success('Promocode Added Succssefully')
                  navigate('/promo-codes')
               }
               setLoading(false)
           })
         } else {
            promoCodeService.update(stateData?.item?.id, data).then(res=>{
               if(res?.status === 200){
                  toast?.success('Promocode Updated Succssefully')
                  navigate('/promo-codes')
               }
              })
              setLoading(false)
            }
   }

   return(<Card>
      <Card.Body>
        <form onSubmit={onSubmit}>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Name*</label>
                  <input
                     type="text"
                     name="name"
                     className="form-control"
                     placeholder="Name"
                     required
                     value={formData.name}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Amount*</label>
                  <input
                     type="number"
                     className="form-control"
                     name="amount"
                     placeholder="Amount"
                     required
                     value={formData.amount}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Type*</label>
                  <Select
                     value={formData.type}
                      name="type"
                      options={typesOptions}
                      onChange={(e)=> setFormData({...formData, type: e})}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">End Date</label>
                  <input
                     type="date"
                     className="form-control"
                     id="end_date"
                     name="end_date"
                     value={formData.end_date}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Max Usage</label>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="Max Usage"
                     name="max_usage"
                     value={formData.max_usage}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Count Usage</label>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="Count Usage"
                     name="count_usage"
                     value={formData.count_usage}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-end">
            <Button variant="primary" disabled={loading} type="submit">Submit</Button>
         </div>
      </form>
      </Card.Body>
   </Card>)
}

export default AddPromoCodes;