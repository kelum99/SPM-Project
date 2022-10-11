import React, { useState } from 'react';
import { Modal, Form, Input, Layout, Typography, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './ProfessionalOrderStyles.css';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

// const [total, setTotal] = useState();

// useEffect(() => {
//   let temp = 0;
//   temp = printPrice + framePrice;
//   setTotal(temp);
// }, [framePrice, printPrice]);

const PaymentHandler = (props) => {
  const { Option } = Select;
  return (
    <Modal
      title="Payment Handler"
      width={1500}
      hight={1500}
      maskClosable={false}
      footer={null}
      visible={props.visible}
      onCancel={props.onCancel}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <Form {...layout}>
            <fieldset className="fieldset">
              <br />
              <br />
              <div className="cusdiv">
                <h2 className="CustomerHeader">Customer Details</h2>
              </div>
              <Form.Item
                name={['customer']}
                style={{
                  width: 600,
                  marginLeft: 10
                }}
                labelCol={{ ...layout.labelCol }}
                label="Customer Name"></Form.Item>
              <Form.Item
                name={['contactNumber']}
                style={{
                  width: 600,
                  marginLeft: 10
                }}
                labelCol={{ ...layout.labelCol }}
                label="Contact Number"></Form.Item>

              <Form.Item
                name={['orderDate']}
                style={{
                  width: 600,
                  marginLeft: 300,
                  marginTop: -110
                }}
                labelCol={{ ...layout.labelCol }}
                label="Order Date"></Form.Item>

              <Form.Item
                style={{
                  marginLeft: 290,
                  marginTop: 10
                }}
                labelCol={{ ...layout.labelCol }}
                //wrapperCol={{ ...layout.wrapperCol, span: 4 }}
                label="Total Price">
                {/* <Typography.Text strong>LKR {total}</Typography.Text> */}
              </Form.Item>
            </fieldset>
            <br />
            <br />
            <fieldset>
              <fieldset className="fieldset">
                <br />
                <br />
                <div className="cusdiv">
                  <h2 className="CustomerHeader">Payment History</h2>
                </div>
                <Form.Item
                  name={['customer']}
                  style={{
                    width: 600,
                    marginLeft: 10
                  }}
                  labelCol={{ ...layout.labelCol }}
                  label="Customer Name"></Form.Item>
                <Form.Item
                  labelCol={{ ...layout.labelCol, span: 10 }}
                  name={['orderStatus']}
                  style={{
                    marginLeft: 250
                  }}
                  label="Order Status"
                  rules={[
                    {
                      required: true,
                      message: 'Order status is required'
                    }
                  ]}>
                  <Select
                    className="dropdown"
                    placeholder="pending"
                    //   defaultValue="Photo Size"
                    style={{
                      width: 230,
                      marginLeft: 200,
                      marginRight: -10
                    }}
                    allowClear>
                    <Option value="Pending">Pending</Option>
                    <Option value="Complete">Complete</Option>
                    <Option value="Complete">Complete</Option>
                  </Select>
                </Form.Item>
              </fieldset>
            </fieldset>
          </Form>
          <br />
          <diV style={{ marginLeft: 1200 }}>
            <Form>
              <fieldset>
                <h1>hello</h1>
              </fieldset>
            </Form>
          </diV>
        </div>
      </div>
    </Modal>
  );
};
export default PaymentHandler;
