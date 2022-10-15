import {
  Modal,
  Typography,
  Row,
  Col,
  Divider,
  Select,
  Button,
  Form,
  InputNumber,
  message
} from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import {
  DollarOutlined,
  CalendarOutlined,
  PrinterOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import '../EventOrder/Styles.css';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import useRequest from '../../services/RequestContext';
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

const AmateurPaymentHandler = (props) => {
  const { Option } = Select;
  const componentRef = useRef(null);
  const { request } = useRequest();
  const [form] = Form.useForm();
  const [payment, setPayment] = useState({});
  const [currentPayment, setCurrentPayment] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [values, setValues] = useState();
  let doc;

  const setRecord = () => {
    console.log('xxx', props?.record);
    setValues(props?.record);
    setCurrentPayment(
      props?.record?.payment.map((val) => val.amount).reduce((prev, curr) => prev + curr)
    );
    setOrderStatus(props?.record?.orderStatus);
  };

  useEffect(() => {
    setRecord();
  }, [props.record]);

  const updatePayment = async () => {
    try {
      if (payment.amount > 0) {
        values.payment.push(payment);
      }
      values.orderStatus = orderStatus;
      setCurrentPayment(
        values.payment.map((val) => val.amount).reduce((prev, curr) => prev + curr)
      );
      const res = await request.patch(`amateurOrders/amateurOrderPayment/${values?._id}`, values);
      if (res) {
        message.success('Payment Update Success!');
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
        width={1080}
        title="Payment Handler"
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
            <Text strong style={{ fontSize: 16 }}>
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
                  <DetailText title="Contact Number" value={values?.mobile} />
                </Col>
                <Col span={12}>
                  <DetailText title="Address" value={values?.address} />
                </Col>
                <Col span={12}>
                  <DetailText title="Total" value={values?.total + ' LKR'} />
                </Col>
                <Col span={12}>
                  <DetailText title="Note" value={values?.note} />
                </Col>
                <Col span={12}>
                  <DetailText title="Payment Status" value={values?.paymentStatus} />
                </Col>
                <Col span={12}>
                  <DetailText title="Order Status" value={values?.orderStatus} />
                </Col>
              </Row>
              <Divider />
              <div>
                <Text strong style={{ fontSize: 16 }}>
                  Payment History
                </Text>
                <div className="paymentHistory">
                  {values?.payment && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {values?.payment.map((val) => (
                        <div key={val.date}>
                          <Text strong>
                            <DollarOutlined /> {val.amount} LKR : <CalendarOutlined />{' '}
                            {moment(val.date).format('YYYY-MM-DD')}
                          </Text>
                          <br />
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <Text>Order Status</Text> <br />
                    <Select
                      name="status"
                      value={orderStatus ?? 'None'}
                      onChange={(value) => setOrderStatus(value)}
                      style={{ width: 170 }}>
                      <Option value="None">None</Option>
                      <Option value="In-progress">In-progress</Option>
                      <Option value="Completed">Completed</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider type="vertical" />
          <div className="receipt">
            <div className="receiptDetails" ref={componentRef} id="printdiv">
              <div>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Studio 73 and Color Lab</Text>{' '}
                <br />
                <Text className="detailKey">
                  No 11/7 Rathwaththa Rd, <br /> Balangoda <br />
                  Tel: 0452356870
                </Text>
              </div>
              <div style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Amateur Order Details</Text>{' '}
                <br />
                <Text>Order Id: {values?._id}</Text> <br />
                <Text>Customer Name: {values?.customer}</Text> <br />
                <Text>Mobile: {values?.mobile}</Text> <br />
                <Text>Order Type: Amateur Order</Text>
              </div>
              <Divider />
              <div>
                <Row gutter={[24, 8]}>
                  <Col span={8}>
                    <Text strong>Detail</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>Quantity</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>Price</Text>
                  </Col>
                  {values?.items && (
                    <>
                      {values?.items.map((item) => (
                        <>
                          <Col span={8}>
                            <Text>{item.item}</Text>
                          </Col>
                          <Col span={8}>
                            <Text>{item.amount}</Text>
                          </Col>
                          <Col span={8}>
                            <Text>
                              {item.itemPrice} LKR + {item.itemPrintPrice} LKR
                            </Text>
                          </Col>
                        </>
                      ))}
                    </>
                  )}
                  {values?.photos && (
                    <>
                      {values?.photos.map((photo) => (
                        <>
                          <Col span={8}>
                            <Text>{photo.photoSize}</Text>
                          </Col>
                          <Col span={8}>
                            <Text>{photo.copies}</Text>
                          </Col>
                          <Col span={8}>
                            <Text>{photo.printPrice} LKR</Text>
                          </Col>
                        </>
                      ))}
                    </>
                  )}
                </Row>
              </div>
              <Divider />
              <div>
                <Row gutter={[24, 8]}>
                  <Col span={12}>
                    <Text strong>Total</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>{values?.total} LKR</Text>
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
                    Print Receipt
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

export default AmateurPaymentHandler;
