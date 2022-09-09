import { Button, Table, Modal, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { render } from '@testing-library/react';
import useRequest from '../../services/RequestContext';
import './ProfessionalOrderStyles.css';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const ProfessionalOrder = () => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!'
    },
    number: {
      range: '${label} must be between ${min} and ${max}'
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <>
          <div className="actionGrop">
            <Button icon={<EditOutlined />} />
            <Button style={{ margin: '0px 10px' }} icon={<EyeOutlined />} />
            <Button danger icon={<DeleteOutlined />} />
          </div>
        </>
      )
    }
  ];

  const { Option } = Select;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <MainLayout title="Professional Order">
      <div>
        <>
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add Professional Order
          </Button>
          <Modal
            title="Add Professional Order"
            width={1200}
            visible={open}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form
              {...layout}
              form={form}
              name="nest-messages"
              onFinish={onFinish}
              // validateMessages={validateMessages}
            >
              <fieldset className="fieldset">
                <br />
                <br />
                <div className="cusdiv">
                  <h2 className="CustomerHeader">Customer Details</h2>
                </div>
                <Form.Item
                  name={['user', 'name']}
                  style={{
                    width: 600,
                    marginLeft: 10
                  }}
                  labelCol={{ ...layout.labelCol }}
                  label="Customer Name"
                  rules={[
                    {
                      required: true
                    }
                  ]}>
                  <Input placeholder="John Smith" />
                </Form.Item>

                <Form.Item
                  name={['user', 'mobile']}
                  style={{
                    width: 600,
                    marginLeft: 10
                  }}
                  labelCol={{ ...layout.labelCol }}
                  label="Contact Number"
                  rules={[
                    {
                      required: true
                    }
                  ]}>
                  <Input placeholder="0767896523" />
                </Form.Item>
                <br />
                <Form.Item
                  name={['user', 'notes']}
                  style={{
                    width: 900,
                    marginLeft: 300,
                    marginTop: -135
                  }}
                  labelCol={{ ...layout.labelCol, span: 12 }}
                  label="Notes">
                  <Input.TextArea placeholder="Any Notes !" />
                </Form.Item>
              </fieldset>
              <br />
              <br />

              <fieldset className="fieldset">
                <table className="proOrderTable">
                  <tr>
                    <td>
                      <center>
                        {/* <div className="photodiv"> */}
                        <h2 className="porderHeader">Order Details</h2>

                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['user', 'orderType']}
                          style={{
                            marginLeft: -300
                          }}
                          label="Order Type"
                          rules={[
                            {
                              required: true
                            }
                          ]}>
                          <Select
                            className="dropdown"
                            placeholder="Sport Meet"
                            //   defaultValue="Photo Size"
                            style={{
                              width: 230,
                              marginLeft: -250
                            }}
                            allowClear>
                            <Option value="2*2 inches (51*51 mm)">Sport Meet MCG</Option>
                            <Option value="2*2 inches (51*51 mm)">SLIIT Graduation</Option>
                            <Option value="2*2 inches (51*51 mm)">SLIIT New Year Day</Option>
                            <Option value="2*2 inches (51*51 mm)">Swimming Meet</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['user', 'photoSize']}
                          style={{
                            marginLeft: -300
                          }}
                          label="Photo Size"
                          rules={[
                            {
                              required: true
                            }
                          ]}>
                          <Select
                            className="dropdown"
                            placeholder="2*2 inches (51*51 mm)"
                            //   defaultValue="Photo Size"
                            style={{
                              width: 230,
                              marginLeft: -250
                            }}
                            allowClear>
                            <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                            <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                            <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                            <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['user', 'printPrice']}
                          style={{
                            marginLeft: 600,
                            marginTop: -110
                          }}
                          label="Print Price"
                          rules={[
                            {
                              required: true
                            }
                          ]}>
                          <Input
                            placeholder="Rs 0.00"
                            style={{
                              width: 230
                            }}
                          />
                        </Form.Item>

                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['user', 'framePrice']}
                          style={{
                            marginLeft: 600
                          }}
                          label="Frame Price"
                          rules={[
                            {
                              required: true
                            }
                          ]}>
                          <Input
                            placeholder="Rs 0.00"
                            style={{
                              width: 230
                            }}
                          />
                        </Form.Item>

                        <br />
                        <br />
                        <br />
                      </center>
                    </td>
                  </tr>
                </table>
              </fieldset>
              <br />
              <br />
              <Form.Item
                labelCol={{ ...layout.labelCol, span: 10 }}
                wrapperCol={{ ...layout.wrapperCol, span: 4 }}
                name={['user', 'totalPrice']}
                label="Total Price"
                rules={[
                  {
                    required: true
                  }
                ]}>
                <Input
                  placeholder="Rs 0.00"
                  style={{
                    width: 230
                  }}
                />
              </Form.Item>
              <br />

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
        <div className="tableContainer">
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalOrder;
