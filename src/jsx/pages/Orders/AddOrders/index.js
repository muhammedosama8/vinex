import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from 'react-select';
import {AvField, AvForm} from "availity-reactstrap-validation";
import CountryiesService from "../../../../services/CountriesService";
import { useNavigate } from "react-router-dom";
import CategoriesService from "../../../../services/CategoriesService";
import ProductsService from "../../../../services/ProductsService";
import SubCategoriesService from "../../../../services/SubCategoriesService";

const AddOrders = () =>{
    const [steps, setSteps] = useState(1)
    const [type, setType] = useState('exist')
    const [search, setSearch] = useState('')
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [formData, setFormData] = useState([{
        category: '',
        sub_category: '',
        subCategoryOptions: [],
        product: '',
        productsOptions: '',
        quantity: '',
        dynamicVariantOptions: [],
        variant: [],
        dynamicVariant: [],
        amount: ''
    }])
    const [promoCode, setPromoCode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [selectedUser, setSelectedUser] = useState({})
    const [user, setUser] = useState({
        f_name:'',
        l_name:'',
        email:'',
        phone:'',
        address:'',
        country_code: ''
    })
    const navigate = useNavigate()
    const [countriesOptions, setCountriesOptions] = useState([])
    const countryiesService = new CountryiesService()
    const categoriesService = new CategoriesService()

    useEffect(()=>{
        if(type === 'new'){
            countryiesService?.getList().then(res=>{
                if(res.status === 200){
                let data = res.data.data?.map(item=>{
                    return{
                        label: `${item.name_en} (${item?.country_code || ''})`,
                        name_en: item.name_en,
                        country_code: item?.country_code,
                        type: item.type
                    }
                })
                setCountriesOptions(data)
                }
            }) 
        }

        categoriesService.getList().then(res=>{
            if(res.data?.status === 200){
               let categories =  res.data?.meta?.data?.map(item=>{
                  return{
                     id: item?.id,
                     value: item?.id,
                     label: item.name_en
                  }
               })
               setCategoriesOptions(categories)
            }
        })
    },[])

    const getAllProductOptions = (index, category)=>{
        let params = category.value

        const subCategoriesReq = new SubCategoriesService().getListForCategory(params)
        const dynamicVariantsReq = new ProductsService().getDynamicVariant(params)
        const productsReq = new ProductsService().getAllProducts({category_id: params})

        Promise.all([subCategoriesReq, dynamicVariantsReq, productsReq]).then((response)=>{
            let sub_categories = []
            let dynamicVariant = []
            let products = []
            if(response[0].status === 200){
                let subCategories = response[0].data?.meta?.data?.map(item=>{
                    return{
                        id: item?.id,
                        value: item?.id,
                        label: item.name_en
                    }
                })
                sub_categories.push(...subCategories)
            }
            if(response[1].status === 200){
                let data = response[1].data?.data?.map(item=>{
                    return{
                        ...item,
                        label: `${item.name_en}  (${item.price})`,
                        value: item.id,
                    }
                })
                dynamicVariant.push(...data)
            }
            if(response[2].status === 200){
                let data = response[2].data?.meta?.data?.filter(res=> !res.isDeleted)?.map(res=>{
                    return{
                        ...res,
                        label: res.name_en,
                        value: res.id,
                    }
                })
                products.push(...data)
            }

            let update = formData.map((res,ind)=>{
                if(index === ind){
                    return{
                        ...res,
                        category: category,
                        subCategoryOptions: sub_categories,
                        productsOptions: products,
                        sub_category:'',
                        amount: 1,
                        dynamicVariantOptions: dynamicVariant
                    }
                } else {
                    return res
                }
            })
            setFormData(update)
        })
        
    }

    const getAllProductOptionsBySub = (index, category, sub_category) => {
        new ProductsService().getAllProducts({category_id: category.value, sub_category_id: sub_category.value }).then(res=>{
            if(res.status === 200){
                let update = formData.map((item, ind)=>{
                    if(ind === index){
                        return{
                            ...item,
                            sub_category: sub_category,
                            productsOptions: [...res.data.meta?.data?.filter(res2=> !res2.isDeleted)?.map(res3=>{
                                return{
                                    ...res3,
                                    label: res3.name_en,
                                    value: res3.id,
                                }
                            })]
                        }
                    } else {
                        return item
                    }
                })
                setFormData(update)
            }
        })
    }
console.log(formData)
    const firstNext = () => {
        setSteps(2)
    }

    const secondNext = () => {
        if(paymentMethod?.value === 'cash'){

        } else {
            let update = formData.filter(res=> !!res.product)
            setFormData(update)
            setSteps(3)
        }
    }

    const searchHandler = () => {
        setSelectedUser({ email: 'muhammed.o.nasser@gmail.com', phone: '01009170794' })
    }

    useEffect(()=>{
        if(!promoCode){

        }
    } ,[promoCode])
    return<>
    {steps === 1 && <Card>
        <Card.Body>
            <div className="d-flex" style={{justifyContent: 'space-evenly'}}>
                <Card className="m-0" 
                    onClick={()=>setType('exist')}
                    style={{
                        backgroundColor: type === 'exist' ? 'var(--primary)' : 'var(--light)',
                        cursor: 'pointer'
                    }}>
                    <Card.Body className="text-center">
                        <h3 className="m-0" style={{color: type === 'exist' ? '#fff' : '#3d4465'}}>Exist User</h3>
                        <i className="la la-user" style={{fontSize: '3rem', color: type === 'exist' ? '#fff' : '#3d4465'}}></i>
                    </Card.Body>
                </Card >
                <Card className="m-0" 
                    onClick={()=>setType('new')}
                    style={{
                       backgroundColor: type === 'new' ? 'var(--primary)' : 'var(--light)',
                        cursor: 'pointer'
                    }} >
                    <Card.Body className="text-center">
                        <h3 className="m-0" style={{color: type === 'new' ? '#fff' : '#3d4465'}}>New User</h3>
                        <i className="la la-user-plus" style={{fontSize: '3rem', color: type === 'new' ? '#fff' : '#3d4465'}}></i>
                    </Card.Body>
                </Card>
            </div>

            {type === 'exist' && <div style={{marginTop: '5rem'}}>
            <AvForm onValidSubmit={firstNext}>
                    <Row>
                        <Col md={10}>
                            <AvField label='Search'
                                placeholder='Search by Email or Phone'
                                type='text' value={search} name='search'
                                onChange={(e)=> setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={2} style={{ marginTop: 'auto', marginBottom: '16px' }}>
                            <Button 
                                variant="primary"
                                type="button" 
                                onClick={searchHandler}
                                disabled={!search}>
                                Search
                            </Button>
                        </Col>
                        {!!Object.keys(selectedUser).length && <Col md={6} >
                            <Card style={{
                                backgroundColor: type === 'new' ? 'var(--primary)' : 'var(--light)',
                                cursor: 'pointer'
                            }}>
                                <label className="m-0 d-flex p-4" style={{gap: '16px'}}>
                                    <input type='radio' checked={true} />
                                    <div>
                                        <i className="la la-user mr-2" style={{fontSize: '1.3rem'}}></i>
                                        <span>{selectedUser.email === search ? selectedUser.email : selectedUser.phone}</span>
                                    </div>
                                </label>
                            </Card>
                        </Col>}
                    </Row>
                    <Row className="mt-3 justify-content-between p-3">
                        <Button variant="secondary" type="button" onClick={()=> navigate('/orders')}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={!Object.keys(selectedUser).length}>
                            Next
                        </Button>
                    </Row>
                </AvForm>
            </div>}
            {type === 'new' && <div style={{marginTop: '5rem'}}>
                <AvForm onValidSubmit={firstNext}>
                    <Row>
                        <Col md={6}>
                            <AvField 
                                label='First Name'
                                placeholder='First Name'
                                type='text'
                                value={user.f_name}
                                name='f_name'
                                errorMessage="Please enter a valid Name"
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: 'This Field is required'
                                    },
                                }}
                                onChange={(e)=>{
                                    setUser({...user, f_name: e.target.value})
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField 
                                type='text'
                                label='Last Name'
                                placeholder='Last Name'
                                value={user.l_name}
                                name='l_name'
                                errorMessage="Please enter a valid Name"
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: 'This Field is required'
                                    },
                                }}
                                onChange={(e)=>{
                                    setUser({...user, l_name: e.target.value})
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField 
                                type='email'
                                label='Email'
                                placeholder='Email'
                                value={user.email}
                                name='email'
                                errorMessage="Please enter a valid Email"
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: 'This Field is required'
                                    },
                                }}
                                onChange={(e)=>{
                                    setUser({...user, email: e.target.value})
                                }}
                            />
                        </Col>
                        <Col md={3}>
                            <label className="text-label">Country Code</label>
                            <Select
                                value={user?.country_code}
                                name="country_code"
                                options={countriesOptions}
                                onChange={(e)=> setUser({...user, country_code: e})}
                            />
                        </Col>
                        <Col md={3}>
                            <AvField 
                                type='number'
                                label='Phone'
                                placeholder='Phone'
                                value={user.phone}
                                name='phone'
                                errorMessage="Please enter a valid Phone"
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: 'This Field is required'
                                    },
                                }}
                                onChange={(e)=>{
                                    setUser({...user, phone: e.target.value})
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <AvField 
                                type='text'
                                label='Address'
                                placeholder='Address'
                                value={user.address}
                                name='address'
                                errorMessage="Please enter a valid Address"
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: 'This Field is required'
                                    },
                                }}
                                onChange={(e)=>{
                                    setUser({...user, address: e.target.value})
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3 justify-content-between p-3">
                        <Button variant="secondary" type="button" onClick={()=> navigate('/orders')}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Next
                        </Button>
                    </Row>
                </AvForm>
            </div>}
        </Card.Body>
    </Card>}

    {steps === 2 && <Card>
        <Card.Body>
            <AvForm onValidSubmit={secondNext}>
                {formData?.map((data, index)=>{
                    return <Row key={index} 
                        style={{border: '1px solid var(--light)', padding:'18px 5px'}}
                        className={`${index > 0 ? 'mt-4 py-4 position-relative' : ''}`}>
                        {index > 0 && <button 
                            type="button"
                            onClick={()=>{
                                let update = formData?.filter((_, ind)=> ind !== index)
                                setFormData(update)
                            }}
                            style={{
                                position: 'absolute',
                                right: '21px',
                                zIndex: '2',
                                top: '12px',
                                background: 'var(--danger)',
                                border: '0',
                                borderRadius: '50%',
                                padding:' 2px 6px'
                            }}>
                            <i className="la la-times" style={{color: '#fff'}}></i>
                        </button>}
                        <Col md={6} className="mb-3">
                            <label className="text-label">Category</label>
                            <Select
                                value={data.category}
                                name="category"
                                options={categoriesOptions}
                                onChange={(e)=> {
                                    getAllProductOptions(index, e)
                                }}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <label className="text-label">SubCategory</label>
                            <Select
                                value={data.sub_category}
                                name="sub_category"
                                options={[...data.subCategoryOptions]}
                                noOptionsMessage={()=> 'Select Category First'}
                                onChange={(e)=> {
                                    getAllProductOptionsBySub(index, data.category, e)
                                }}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <label className="text-label">Product</label>
                            <Select
                                value={data.product}
                                name="product"
                                options={data.productsOptions}
                                noOptionsMessage={()=> 'Select Category First'}
                                onChange={(e)=> {
                                    let update = formData.map((res, ind)=>{
                                        if(ind === index){
                                            return {
                                                ...res,
                                                product: e
                                            }
                                        } else {
                                            return res
                                        }
                                    })
                                    setFormData(update)
                                }}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <AvField
                                label='Quantity'
                                type='number'
                                name='amount'
                                placeholder='Quantity'
                                value={data.amount}
                                min={1}
                                max={data.product?.amount}
                                onChange={(e)=>{
                                    let update = formData.map((res, ind)=>{
                                        if(ind === index){
                                            return {
                                                ...res,
                                                amount: +e.target.value
                                            }
                                        } else {
                                            return res
                                        }
                                    })
                                    setFormData(update)
                                }}
                            />
                        </Col>
                        {data?.product?.variant?.map(variant=>{
                            return <Col md={3}>
                                <label className="text-label mb-1 text-capitalize">{variant.variant.name_en} :</label>
                                <p style={{color:'#222'}}>{variant.variant_value?.value_en}</p>
                            </Col>
                        })}
                        {!!data.product && <Col md={2}>
                            <label className="text-label mb-1 text-capitalize">Weight :</label>
                            <p style={{color:'#222'}}>{data.product.weight}</p>
                        </Col>}
                        {data.dynamicVariantOptions?.length > 0 && <Col className="mb-3" md={12}>
                                <label className="text-label mb-2 d-block">Dynamic Variant</label>
                                <Select 
                                    options={data.dynamicVariantOptions?.filter(res=> !data.dynamicVariant?.some(res2=> res.label === res2.label))}
                                    name='dynamic_variant'
                                    isMulti={true}
                                    value={data.dynamicVariant}
                                    onChange={e=>{
                                        let update = formData?.map((res,ind)=>{
                                            if(ind === index){
                                                return{
                                                    ...res,
                                                    dynamicVariant: e
                                                }
                                            } else {
                                                return res
                                            }
                                        })
                                        setFormData(update)
                                    }}
                                />
                        </Col>}
                        
                        {!!data.product && <Col md={12}>
                        <div className="p-3 d-flex justify-content-between" style={{backgroundColor: 'var(--light)', borderRadius: '8px'}}>
                            <span style={{fontSize: '20px', fontWeight: '500'}}>
                                {data.product?.price} x{data?.amount} {data.dynamicVariant?.length > 0 && 
                                <span className="text"> + {data.dynamicVariant.reduce((total, product) => total + product.price, 0)}</span>}
                            </span>
                            <span style={{fontSize: '20px'}}>
                                Total :  <span className="text-primary" style={{fontWeight: '600'}}>{((+data.product?.price*data?.amount) + data.dynamicVariant.reduce((total, product) => total + product.price, 0))}</span>
                            </span>
                        </div>
                        </Col>}
                    </Row>
                })}
                {!!formData.filter(res=> !!res.product)?.length && <Row className="px-2 py-4 mt-3" style={{backgroundColor: 'var(--light)'}}>
                        <Col md={6} style={{borderRight: '1px solid #dedede'}}>
                            <Row>
                                <Col md={9} className='pr-0'>
                                    <AvField
                                        label='Coupon'
                                        type='text'
                                        name='promoCode'
                                        placeholder='Enter Coupon Code'
                                        value={promoCode}
                                        onChange={(e)=> setPromoCode(e.target.value)}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Button 
                                        variant='outline-secondary' 
                                        className="w-100 p-0"
                                        style={{marginTop:'29px', height: '42px'}}
                                        >
                                        Apply
                                    </Button>
                                </Col>
                                <Col md={12}>
                                    <label className="text-label">Payment Method</label>
                                    <Select
                                        value={paymentMethod}
                                        name="paymentMethod"
                                        options={[{label:'Cash', value:'cash'}, {label:'Visa', value:'visa'}]}
                                        onChange={(e)=> {
                                            setPaymentMethod(e)
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            {!!paymentMethod && <div className="mt-1 d-flex justify-content-between">
                                <label className="text-label">Payment Method</label>
                                <p className="mb-0">{paymentMethod?.label}</p>
                            </div>}
                            <div className="mt-1 d-flex justify-content-between">
                                <label className="text-label">SubTotal ({formData.filter(res=> !!res.product)?.length})</label>
                                <p className="mb-0">{formData.filter(res=> !!res.product).reduce((total, data) => total + ((data.product?.price*data?.amount) + data.dynamicVariant.reduce((total1, product) => total1 + product.price, 0)), 0)}</p>
                            </div>
                            <div className="mt-1 d-flex justify-content-between">
                                <label className="text-label">Shipping Fee</label>
                                <p className="mb-0">30</p>
                            </div>
                            <div className="mt-1 d-flex justify-content-between">
                                <label className="text-label">Coupon</label>
                                <p className="text-seccess mb-0">-34</p>
                            </div>
                            <div className="my-2" style={{height: '1px', background: '#dedede'}}></div>

                            <div className="mt-1 d-flex justify-content-between">
                                <label className="text-label" style={{fontWeight: '600'}}>Total</label>
                                <p className="text-success mb-0" style={{fontWeight: '600', fontSize: '18px'}}>{(formData.filter(res=> !!res.product).reduce((total, data) => total + ((data.product?.price*data?.amount) + data.dynamicVariant.reduce((total1, product) => total1 + product.price, 0)), 0) -34 +30)}</p>
                            </div>
                        </Col>
                        
                </Row>}
                <Button 
                    onClick={()=>{
                        setFormData([
                            ...formData,
                            {
                                category: '',
                                sub_category: '',
                                subCategoryOptions: [],
                                product: '',
                                productsOptions: '',
                                quantity: '',
                                dynamicVariantOptions: [],
                                variant: [],
                                dynamicVariant: [],
                                amount: ''
                            }
                        ])
                    }}
                    type='button'
                    variant="outline-primary" 
                    className="mt-3">
                    Add New Product
                </Button>
                
                <div className="mt-4 d-flex justify-content-between">
                    <Button variant="secondary" type="button" onClick={()=> navigate('/orders')}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={(!formData.filter(res=> !!res.product).length || !paymentMethod)}
                    >
                        {paymentMethod?.value === 'cash' ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </AvForm>
        </Card.Body>
    </Card>}

    {steps === 3 && <Card>
        <Card.Body>
            <h4>
                <i className="la la-cc-visa" style={{fontSize: '24px'}}></i> Payment Method
            </h4>
        </Card.Body>
    </Card>}
    </>
}
export default AddOrders;