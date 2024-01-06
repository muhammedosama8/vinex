import { AvField, AvForm } from "availity-reactstrap-validation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import ControlService from "../../../../services/ControlServices";
import { Translate } from "../../../Enums/Tranlate";
import html2pdf from "html2pdf.js";

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    address: "",
    site: "",
    phone: "",
    items: [{ item: "", price: "" }],
  });
  const [logo, setLogo] = useState("");
  const lang = useSelector((state) => state.auth.lang);

  useEffect(() => {
    new ControlService().getDashboardLogo().then((res) => {
      if (res && !!res.data?.data) {
        setLogo(res.data?.data?.dashboard_logo);
      }
    });
  }, []);

  const handlerForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const totalPrice = formData?.items
      ?.reduce((accumulator, item) => accumulator + Number(item.price), 0)
      .toFixed(3);
    let itemsText = ``;
    let filter = formData.items?.filter((res) => res.item && res.price);
    for (let i = 0; i < filter?.length; i++) {
      // eslint-disable-next-line no-unused-vars
      itemsText += `<div style='display: flex;text-align: ${
        lang === "ar" ? "right" : "left"
      }'><p style='margin: 4px 0;width: 50%'>${i + 1}. ${
        filter[i].item
      }</p><p style='margin: 4px 0;width: 50%'>${filter[i].price}</p></div>`;
    }

    const printWindow = window.open("", "_blank");
    let htmlCode = `<html>
    <head>
        <title>${Translate[lang]?.invoice}</title>
    </head>
    <body id='pdf'>
    <div style="width: 85%;margin: auto; direction: ${
      lang === "ar" ? "rtl" : "ltr"
    } ">
        <div style="text-align: center;margin-top: 2rem;">
            <img src=${logo} alt='logo' width='200' style="margin-bottom: 8px" />
            <p style="margin: 4px 0;">${formData.address}</p>
            <p style="margin: 4px 0;">${formData.phone}</p>
            <p style="margin: 4px 0;">${formData.site}</p>
        </div>
        <div style="margin-top: 2rem;">
            <div style='display: flex;text-align: ${
              lang === "ar" ? "right" : "left"
            }'>
                <h3 style='width: 50%'>${Translate[lang]?.item}</h3>
                <h3 style='width: 50%'>${Translate[lang]?.price}</h3>
            </div>

            ${itemsText}
            
            </div>
            <div style=' margin-top: 3rem; text-align: ${
              lang === "ar" ? "right" : "left"
            }'>
                <h3 style='margin: 4px 0'>${Translate[lang].total_price}</h3>
                <h3 style='margin: 4px 0'>${totalPrice}</h3>
              </div>
        </div>
    </div>
    </body>
    </html>
    `;
    printWindow.document.write(htmlCode);

    printWindow.document.close();

    // // Create a PDF from the cloned element
    // html2pdf(htmlCode, {
    //   margin: 10,
    //   filename: "invoice.pdf",
    //   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    //   // output: () => {
    //   //   window.print();
    //   // },
    // });

    setTimeout(() => {
      printWindow.print();
    }, 1000);
  };

  const download = () => {
    const totalPrice = formData?.items
      ?.reduce((accumulator, item) => accumulator + Number(item.price), 0)
      .toFixed(3);
    let itemsText = ``;
    let filter = formData.items?.filter((res) => res.item && res.price);
    for (let i = 0; i < filter?.length; i++) {
      // eslint-disable-next-line no-unused-vars
      itemsText += `<div style='display: flex;text-align: ${
        lang === "ar" ? "right" : "left"
      }'><p style='margin: 4px 0;width: 50%'>${i + 1}. ${
        filter[i].item
      }</p><p style='margin: 4px 0;width: 50%'>${filter[i].price}</p></div>`;
    }

    let htmlCode = `
    <div style="width: 85%;margin: auto; direction: ${
      lang === "ar" ? "rtl" : "ltr"
    } ">
        <div style="text-align: center;margin-top: 2rem;">
            <img src=${logo} alt='logo' width='200' style="margin-bottom: 8px" />
            <p style="margin: 4px 0;">${formData.address}</p>
            <p style="margin: 4px 0;">${formData.phone}</p>
            <p style="margin: 4px 0;">${formData.site}</p>
        </div>
        <div style="margin-top: 2rem;">
            <div style='display: flex;text-align: ${
              lang === "ar" ? "right" : "left"
            }'>
                <h3 style='width: 50%'>${Translate[lang]?.item}</h3>
                <h3 style='width: 50%'>${Translate[lang]?.price}</h3>
            </div>

            ${itemsText}
            
            </div>
            <div style=' margin-top: 3rem; text-align: ${
              lang === "ar" ? "right" : "left"
            }'>
                <h3 style='margin: 4px 0'>${Translate[lang].total_price}</h3>
                <h3 style='margin: 4px 0'>${totalPrice}</h3>
              </div>
        </div>
    </div>
    `;

    setTimeout(() => {
      html2pdf(htmlCode, {
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        output: () => {
          setTimeout(() => {
            window.print();
          }, 1000);
        },
      });
    }, 1000);
  };
  return (
    <Card id="pdf">
      <CardBody>
        <div className="text-center">
          <img src={logo} alt="logo" width={200} className="mb-3" />
          <AvForm onValidSubmit={onSubmit}>
            <Row className="mb-1">
              <Col md={3}></Col>
              <Col md={6}>
                <AvField
                  type="text"
                  placeholder={Translate[lang]?.address}
                  value={formData.address}
                  name="address"
                  className="mx-3"
                  onChange={(e) => handlerForm(e)}
                />
              </Col>
              <Col md={3}></Col>
            </Row>
            <Row className="mb-1">
              <Col md={3}></Col>
              <Col md={6}>
                <AvField
                  type="number"
                  placeholder={Translate[lang]?.phone}
                  value={formData.phone}
                  name="phone"
                  className="mx-3"
                  onChange={(e) => handlerForm(e)}
                />
              </Col>
              <Col md={3}></Col>
            </Row>
            <Row className="mb-1">
              <Col md={3}></Col>
              <Col md={6}>
                <AvField
                  type="text"
                  placeholder={Translate[lang]?.site}
                  value={formData.site}
                  name="site"
                  className="mx-3"
                  onChange={(e) => handlerForm(e)}
                />
              </Col>
              <Col md={3}></Col>
            </Row>

            <Row className="mt-5">
              <Col
                md={6}
                className="mb-2"
                style={{
                  textAlign: lang === "ar" ? "right" : "left",
                }}
              >
                {Translate[lang]?.item}
              </Col>
              <Col
                md={6}
                className="mb-2"
                style={{ textAlign: lang === "ar" ? "right" : "left" }}
              >
                {Translate[lang]?.price}
              </Col>

              {formData.items?.map((item, index) => {
                return (
                  <>
                    <Col md={6}>
                      <AvField
                        type="text"
                        placeholder={`${Translate[lang]?.item} ${index + 1}`}
                        value={item.item}
                        name="item"
                        onChange={(e) => {
                          let update = formData.items?.map((res, ind) => {
                            if (index === ind) {
                              return {
                                ...res,
                                item: e.target.value,
                              };
                            } else {
                              return res;
                            }
                          });
                          setFormData({ ...formData, items: update });
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <AvField
                        type="number"
                        placeholder={`${Translate[lang]?.price} ${index + 1}`}
                        value={item.price}
                        name="price"
                        onChange={(e) => {
                          let update = formData.items?.map((res, ind) => {
                            if (index === ind) {
                              return {
                                ...res,
                                price: e.target.value,
                              };
                            } else {
                              return res;
                            }
                          });
                          setFormData({ ...formData, items: update });
                        }}
                      />
                    </Col>
                  </>
                );
              })}
              <Button
                outline
                style={{ margin: "0 15px" }}
                onClick={() => {
                  setFormData({
                    ...formData,
                    items: [...formData.items, { item: "", price: "" }],
                  });
                }}
              >
                {Translate[lang].add} {Translate[lang].item}
              </Button>
            </Row>

            <div
              className="mt-5"
              style={{
                textAlign: lang === "ar" ? "right" : "left",
              }}
            >
              <label className="mb-2">{Translate[lang].total_price}</label>
              <h5>
                {formData?.items
                  ?.reduce(
                    (accumulator, item) => accumulator + Number(item.price),
                    0
                  )
                  .toFixed(3)}
              </h5>
            </div>

            <div
              style={{
                textAlign: lang === "ar" ? "right" : "left",
              }}
            >
              <Button
                color="secondary"
                style={{ marginTop: "40px" }}
                type="button"
                onClick={() => {
                  download();
                }}
              >
                {Translate[lang].download}
              </Button>
              <Button
                color="primary"
                style={{ margin: "40px 12px 0" }}
                type="submit"
              >
                {Translate[lang].print}
              </Button>
            </div>
          </AvForm>
        </div>
      </CardBody>
    </Card>
  );
};
export default CreateInvoice;
