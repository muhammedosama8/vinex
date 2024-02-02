import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ControlService from "../../../services/ControlServices";
import OrdersService from "../../../services/OrdersService";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";
import OrdersStatus from "./OrdersStatus";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [item, setItem] = useState({});
  const [modal, setModal] = useState(false);
  const [hasData, setHasData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const navigate = useNavigate();
  const ordersService = new OrdersService();
  const controlService = new ControlService();
  const Auth = useSelector((state) => state.auth?.auth);
  const lang = useSelector((state) => state.auth?.lang);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
  const [websiteName, setWebsiteName] = useState('')
  const [logo, setLogo] = useState('')

  useEffect(()=>{
    controlService.getList().then(res=>{
        if(res?.status === 200){
            setWebsiteName(res.data?.data?.website_title)
            setLogo(res.data?.data?.dashboard_logo)
        }
    })
  },[])

  const printOrders = () => {
    const printWindow = window.open("", "_blank");
    let pages = ``;

    for( let i = 0 ; i < selectedOrders?.length; i++){
      let itemsText = ``;
      let product = selectedOrders[i]?.sub_carts[0]?.product
      for (let i = 0; i < product?.variant?.length; i++) {
        if(product?.variant[i].variant?.name_en === 'color'){
            itemsText += `<p style="margin-bottom: 0.5rem">
            ${lang === 'en' ? product?.variant[i].variant?.name_en : product?.variant[i].variant?.name_ar}: <span style="
                background: ${product?.variant[i].variant_value?.value_en};
                height: 24px;
                width: 24px;
                display: inline-block;
                margin: 0 4px;
            "></span>
            </p>`
        } else{
            itemsText += `<p style="margin-bottom: 0.5rem">
            ${lang === 'en' ? product?.variant[i].variant?.name_en : product?.variant[i].variant?.name_ar}: ${lang === 'en' ? product?.variant[i].variant_value?.value_en : product?.variant[i].variant_value?.value_ar}
            </p>`
        }
      }
      pages += `<div style="min-height: 100vh; margin-bottom: 1rem">
      <div>
          <div style="background-color: rgb(222 222 222 / 21%); border: 1px solid #c3c1c1; border-radius: 12px; padding: 8px; text-align: center">
              <img src=${logo} alt="logo" style="width: 4rem;" />
          </div>
          <div style="margin-top: 1rem; text-align: center">
              <p style="margin-bottom: 0.5rem">${Translate[lang].welcome} ${selectedOrders[i]?.user?.f_name} ${selectedOrders[i]?.user?.l_name}</p>
              <h3 style="margin: 0">${Translate[lang].application_submitted}</h3>
          </div>
          <div style="margin-top: 1rem">
              <div style="text-align: center">
                  <p style="margin-bottom: 0.5rem">${Translate[lang].details} ${Translate[lang].product}</p>
              </div>
              <div>
                  <div style="text-align: center; width: 50%; margin-top: 1rem">
                  <div style="display: flex; justify-content: space-between; border: 1px solid #dedede; padding: 15px 25px">
                      <div>
                          <img src=${selectedOrders[i]?.sub_carts[0]?.product?.images?.length ? selectedOrders[i]?.sub_carts[0]?.product?.images[0]?.url : ''} alt="product" style="width: 8rem" />
                      </div>
                      <div className="details">
                          <p style="margin-bottom: 0.5rem">${lang === 'en' ? selectedOrders[i]?.sub_carts[0]?.product?.name_en : selectedOrders[i]?.sub_carts[0]?.product?.name_ar}</p>
                          <p style="margin-bottom: 0.5rem">${Translate[lang].quantity}: ${selectedOrders[i]?.sub_carts[0]?.amount}</p>
                          <p style="margin-bottom: 0.5rem">${Translate[lang].price}: ${selectedOrders[i]?.sub_total}</p>
                          ${itemsText}
                      </div>
                  </div>
                  </div>
              </div>
  
              <div style="margin-top: 1rem; display: flex; justify-content: space-between ;background-color: rgb(222 222 222 / 21%); border: 1px solid #c3c1c1; border-radius: 12px; padding: 13px;">
                  <p style="margin: 0">${Translate[lang].order_id}: ${selectedOrders[i]?.id}</p>
                  <p style="margin: 0">${Translate[lang].day}: ${selectedOrders[i]?.day?.split('T')[0]}</p>
              </div>
  
              <div style="padding-top: 1rem; display: flex">
                  <div style="width: 33.333333%; padding-left: 1rem ; padding-right: 1rem">
                          <div style="background-color: #dedede; padding-top: 1rem; padding-bottom: 1rem; padding-left: 1rem ; padding-right: 1rem">
                              <h4 style="margin: 0">${Translate[lang].details} ${Translate[lang].address}</h4>
                          </div>
                          <div style="background-color: rgb(222 222 222 / 21%); padding-top: 1rem; padding-bottom: 1rem; padding-left: 1rem ; padding-right: 1rem">
                              <p style="margin-bottom: 0.5rem">${Translate[lang].street}: ${selectedOrders[i]?.user_address?.street}</p>
                              <p style="margin-bottom: 0.5rem">${Translate[lang].house_number}: ${selectedOrders[i]?.user_address?.houseNumber}</p>
                              <p style="margin-bottom: 0.5rem">${Translate[lang].block}: ${selectedOrders[i]?.user_address?.block}</p>
                              <p style="margin-bottom: 0.5rem">${Translate[lang].address_name}: ${selectedOrders[i]?.user_address?.addressName}</p>
                          </div>
                  </div>
                  <div style="width: 66.666666%; padding-left: 1rem ; padding-right: 1rem">
                          <div style="background-color: #dedede; padding-top: 1rem; padding-bottom: 1rem; padding-left: 1rem ; padding-right: 1rem">
                              <h4 style="margin: 0">${Translate[lang].details} ${Translate[lang].order}</h4>
                          </div>
                          <div style="background-color: rgb(222 222 222 / 21%); padding-top: 1rem; padding-bottom: 1rem; padding-left: 1rem ; padding-right: 1rem ">
                              <p style="margin-bottom: 0.5rem">${Translate[lang].total_price}: ${selectedOrders[i]?.total}</p>
                              <p style="margin-bottom: 0.5rem">${Translate[lang].phone}: ${selectedOrders[i]?.user?.phone}</p>
                              <p style="margin-bottom: 0.5rem">${lang === 'en' ? product?.description_en : product?.description_ar}</p>
                          </div>
                  </div>
              </div>
              <div style="text-align: center;margin-top: 1rem">
                  <p style="margin: 0; font-size: 14px">${Translate[lang].thanks} ${websiteName}</p>
                  <p style="margin: 0; font-size: 14px">Powered by leap solutions kw</p>
              </div>
          </div>
      </div>
      </div>`
    }

    let htmlCode = `<html>
    <head>
        <title>${Translate[lang]?.invoice}</title>
    </head>
    <body style="direction: ${lang==='en' ? 'ltr' : 'rtl'};">
    ${pages}
    </body>
    </html>
    `;
    printWindow.document.write(htmlCode);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 1000);
};

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <div className="input-group w-50">
          <input
            type="text"
            style={{
              borderRadius: "8px",
              color: "initial",
              padding: "18px 33px 18px 16px",
            }}
            className="form-control"
            placeholder={`${Translate[lang]?.search_by} ${Translate[lang]?.order_id}, ${Translate[lang]?.name}, ${Translate[lang]?.phone}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="flaticon-381-search-2"
            style={{
              position: "absolute",
              zIndex: "99",
              right: lang === "en" && "16px",
              left: lang === "ar" && "16px",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          ></div>
        </div>
        <div>
        {isExist("order") && (
            <Button
              variant="outline-secondary"
              className={`mx-2 h-75 `}
              style={{
                cursor: !selectedOrders?.length ? 'not-allowed' : 'pointer'
              }}
              disabled={!selectedOrders?.length}
              onClick={printOrders}
            >
              {Translate[lang].print} <i className="la la-print" />
            </Button>
          )}
          {isExist("order") && (
            <Button
              variant="primary"
              className="mx-2 h-75"
              onClick={() => navigate("/orders/add-orders")}
            >
              {Translate[lang].add} {Translate[lang].orders}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body className={`${hasData === 0 ? "text-center" : ""}`}>
          {loading && (
            <div style={{ height: "300px" }}>
              <Loader />
            </div>
          )}
          {hasData === 1 && !loading && (
            <Table responsive>
              <thead>
                <tr className="text-center">
                  <th>
                    <strong>{Translate[lang]?.order_id}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.customer_name}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.email}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.phone}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.address}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.total_price}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.delivery_day}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.from}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.to}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.payment_method}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.reference_id}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.invoice_id}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.post_date}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.createdAt}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.status}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.details}</strong>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((item, index) => {
                  return (
                    <CardItem
                      key={index}
                      index={index}
                      item={item}
                      setItem={setItem}
                      setModal={setModal}
                      selectedOrders={selectedOrders}
                      setSelectedOrders={setSelectedOrders}
                    />
                  );
                })}
              </tbody>
            </Table>
          )}
          {hasData === 0 && <NoData />}
          <Pagination
            setData={setOrders}
            service={ordersService}
            shouldUpdate={shouldUpdate}
            setHasData={setHasData}
            setLoading={setLoading}
            search={search}
          />
        </Card.Body>
      </Card>
      {modal && (
        <OrdersStatus
          modal={modal}
          setModal={setModal}
          item={item}
          setShouldUpdate={setShouldUpdate}
        />
      )}
    </>
  );
};
export default Orders;
