import { useState } from "react";
import { Button } from "react-bootstrap";

const AddPromoCodes = () => {
    const [promoCode, setPromoCode] = useState({
        name: '',
        amount: '',
        type: '',
        end_date: '',
        max_usage: '',
        count_usage: '',
    })

    const handlerText = (e)=>{
        setPromoCode({...promoCode, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault()
    }

    return(<>
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
                     value={promoCode.name}
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
                     value={promoCode.amount}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Type*</label>
                  <select className="form-control" name="type"
                            value={promoCode.type}
                            onChange={(e)=> handlerText(e)}>
                    <option value="">Please select</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed_amount">Fixed Amount</option>
                </select>
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">End Date*</label>
                  <input
                     type="date"
                     className="form-control"
                     id="end_date"
                     name="end_date"
                     required
                     value={promoCode.end_date}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Max Usage*</label>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="Max Usage"
                     name="max_usage"
                     required
                     value={promoCode.max_usage}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Count Usage*</label>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="Count Usage"
                     name="count_usage"
                     required
                     value={promoCode.count_usage}
                     onChange={(e)=> handlerText(e)}
                  />
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-end">
            <Button variant="primary">Submit</Button>
         </div>
      </form>
    </>)
}

export default AddPromoCodes;