import { AvField, AvForm } from "availity-reactstrap-validation";
import { useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminService from "../../../services/AdminService";
import { Translate } from "../../Enums/Tranlate";

const PaymentLink = () => {
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const adminService = new AdminService();
  const lang = useSelector((state) => state.auth.lang);

  const submit = () => {
    let data = { price };
    setLoading(true);
    adminService.buy(data).then((res) => {
      if (res?.status === 201) {
        setUrl(res?.data?.data);
      }
      setLoading(false);
    });
  };

  const CopyToClipboardButton = ({ text }) => {
    const textAreaRef = useRef(null);

    const handleCopyClick = () => {
      if (textAreaRef.current) {
        textAreaRef.current.select();
        document.execCommand("copy");
        setCopied(true);
      }
    };

    return (
      <div>
        <textarea
          ref={textAreaRef}
          value={text}
          style={{ position: "absolute", left: "-9999px" }}
          readOnly
        />
        <Button
          variant={copied ? "secondary" : `outline-secondary`}
          onClick={handleCopyClick}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    );
  };

  return (
    <Card>
      <Card.Body>
        <AvForm onValidSubmit={submit}>
          <Row>
            <Col md={8}>
              <AvField
                label={`${Translate[lang]?.price}`}
                type="number"
                placeholder={Translate[lang]?.price}
                value={price}
                name="price"
                min="0.0000000000001"
                validate={{
                  required: {
                    value: true,
                    errorMessage: Translate[lang].field_required,
                  },
                }}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                loading={loading}
                type="submit"
                style={{ marginTop: "2rem" }}
              >
                {Translate[lang]?.submit}
              </Button>
            </Col>
          </Row>
          {url && (
            <Row
              style={{
                marginTop: "4rem",
                padding: "2rem 0",
                boxShadow: "0 0 5px #dedede",
                borderRadius: "8px",
                direction: "ltr",
                flexDirection: "row-reverse",
              }}
            >
              <Col md={2}>
                <CopyToClipboardButton text={url} />
              </Col>
              <Col md={10}>
                <p className="m-0" style={{ textAlign: "left" }}>
                  {url}
                </p>
              </Col>
            </Row>
          )}
        </AvForm>
      </Card.Body>
    </Card>
  );
};

export default PaymentLink;
