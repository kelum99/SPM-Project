import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  Form,
  InputNumber,
  Layout,
  Typography,
  Select,
  Divider,
  message,
  Button,
  Row,
  Col
} from 'antd';
import {
  DollarOutlined,
  CalendarOutlined,
  PrinterOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import useRequest from '../../services/RequestContext';
import './ProfessionalOrderStyles.css';
import { jsPDF } from 'jspdf';

const { Text } = Typography;

const DetailText = (props) => {
  return (
    <div className="detailText">
      <Text strong className="detailKey">
        {props.title} :
      </Text>
      <Text strong className="detailValue">
        {props.value}
      </Text>
    </div>
  );
};

const PaymentHandler = (props) => {
  const { Option } = Select;
  const componentRef = useRef(null);
  const { request } = useRequest();
  const [form] = Form.useForm();
  const [payment, setPayment] = useState({});
  const [currentPayment, setCurrentPayment] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [values, setValues] = useState();
  let doc;

  const setRecord = () => {
    console.log('xxx', props?.record);
    setValues(props?.record);
    setCurrentPayment(
      props?.record?.payment.map((val) => val.amount).reduce((prev, curr) => prev + curr)
    );
    setPaymentStatus(props?.record?.orderStatus);
  };

  useEffect(() => {
    setRecord();
  }, [props.record]);

  const updatePayment = async () => {
    try {
      if (payment.amount > 0) {
        values.payment.push(payment);
      }
      values.paymentStatus = paymentStatus;
      setCurrentPayment(
        values.payment.map((val) => val.amount).reduce((prev, curr) => prev + curr)
      );
      const res = await request.patch(
        `professionalOrders/professionalOrderPayment/${values?._id}`,
        values
      );
      if (res) {
        message.success('Payment update success');
        form.resetFields();
        setRecord();
      }
    } catch (e) {
      console.log('error updating', e);
    }
  };

  const downloadPDF = () => {
    doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [1700, 1000]
    });
    doc.html(document.getElementById('printdiv'), {
      callback: function (pdf) {
        pdf.save('PaymentReciept.pdf');
      }
    });
  };

  return (
    <>
      <Modal
        title="Payment Handler"
        width={1080}
        footer={
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <Form form={form}>
                <Form.Item label="Payment" name="payment">
                  <InputNumber
                    onChange={(value) => setPayment({ amount: value, date: Date.now() })}
                    disabled={currentPayment >= values?.total}
                    controls={false}
                    defaultValue={0}
                    addonAfter={<Text>LKR</Text>}
                  />
                </Form.Item>
              </Form>
            </div>
            <div>
              <Button type="primary" onClick={updatePayment}>
                Update
              </Button>
              <Button
                onClick={() => {
                  props.onCancel();
                  form.resetFields();
                  setValues(undefined);
                }}>
                Cancel
              </Button>
            </div>
          </div>
        }
        maskClosable={false}
        visible={props.visible}
        onCancel={() => {
          props.onCancel();
          form.resetFields();
          setValues(undefined);
        }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '65%' }}>
            <Text strong style={{ frontSize: 16 }}>
              Order Details
            </Text>
            <div>
              <Row style={{ marginLeft: 5, marginTop: 8 }} gutter={[24, 8]}>
                <Col span={12}>
                  <DetailText title="Customer Name" value={values?.customer} />
                </Col>
                <Col span={12}>
                  <DetailText
                    title="Order Date"
                    value={moment(values?.orderDate).format('YYYY-MM-DD')}
                  />
                </Col>
                <Col span={12}>
                  <DetailText title="Conact Nummber" value={values?.contactNumber} />
                </Col>

                <Col span={12}>
                  <DetailText title="Total" value={values?.total + ' LKR'} />
                </Col>
                <Col span={12}>
                  <DetailText title="Note" value={values?.notes} />
                </Col>
                <Col span={12}>
                  <DetailText title="Payment Status" value={values?.paymentStatus} />
                </Col>
                {/* <Col span={12}>
                  <DetailText title="Order Status" value={values?.orderStatus} />
                </Col> */}
                <Col span={12}>
                  <DetailText title="Order Type" value={values?.orderType} />
                </Col>
              </Row>
              <Divider />
              <div>
                <Text strong style={{ frontSize: 16 }}>
                  Payment History
                </Text>
                <div className="paymentHistory">
                  {values?.payment && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {values?.payment.map((val) => (
                        <div key={val.date}>
                          <Text strong>
                            <DollarOutlined /> {val.amount} LKR: <CalendarOutlined />{' '}
                            {moment(val.date).format('YYYY-MM-DD')}
                          </Text>
                          <br />
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    {/* <Text>Order Status</Text> <br />
                    <Select
                      name="status"
                      value={paymentStatus ?? 'None'}
                      onChange={(value) => setPaymentStatus(value)}
                      style={{ width: 170 }}>
                      <Option value="None">None</Option>
                      <Option value="In-progress">In-progress</Option>
                      <Option value="Completed">Completed</Option>
                    </Select> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider type="vertical" />
          <div className="receipt">
            <div className="receiptDetails" ref={componentRef}>
              <div>
                <Text style={{ frontSize: 16, fontWeight: 'bold' }}>Studio 73 and color Lab</Text>
                <br />
                <Text className="detailKey">
                  No 11/7 Rathwaththa Rd, <br /> Balangoda <br /> Tel: 0452356870
                </Text>
              </div>
              <div style={{ marginTop: 5 }}>
                <Text style={{ frontSize: 15, fontWeight: 'bold' }}>Order Details</Text>
                <br />
                <Text>Order Id: {values?._id}</Text> <br />
                <Text>Customer Name: {values?.customer}</Text> <br />
                <Text>Mobile: {values?.contactNumber}</Text> <br />
                <Text>Order Type: {values?.orderType}</Text>
              </div>
              <Divider />
              <div>
                <h3>Order Details</h3>
                <Text>Print Price: {values?.printPrice}</Text> <br />
                <Text>Frame Price: {values?.framePrice}</Text> <br />
              </div>
              <Divider />
              <div>
                <Row gutter={[24, 8]}>
                  <Col span={12}>
                    <Text strong>Total</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>{values?.total} LKR </Text>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="actionGrp">
              <ReactToPrint
                trigger={() => (
                  <Button
                    style={{ marginTop: 8, marginLeft: 10 }}
                    icon={<PrinterOutlined />}
                    type="primary">
                    Print Recept
                  </Button>
                )}
                content={() => componentRef.current}
              />
              <Button
                style={{ marginTop: 8, marginLeft: 10 }}
                icon={<DownloadOutlined />}
                type="primary"
                onClick={downloadPDF}>
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default PaymentHandler;
