import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Typography,
  InputNumber
} from 'antd';
import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { render } from '@testing-library/react';
import useRequest from '../../services/RequestContext';
import './ProfessionalOrderStyles.css';
//import Search from 'antd/lib/transfer/search';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const ProfessionalOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const [open, setOpen] = useState(false);
  const { Search } = Input;
  const [total, setTotal] = useState();
  const [printPrice, setPrintPrice] = useState(0);
  const [framePrice, setFramePrice] = useState(0);

  // const validateMessages = {
  //   required: '${label} is required!',
  //   types: {
  //     email: '${label} is not a valid email!',
  //     number: '${label} is not a valid number!'
  //   },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}'
  //   }
  // };

  useEffect(() => {
    let temp = 0;
    temp = printPrice + framePrice;
    setTotal(temp);
  }, [framePrice, printPrice]);

  const showModal = () => {
    setOpen(true);
  };

  // const handleOk = () => {
  //   setOpen(false);
  // };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 14,
        color: '#1890ff'
      }}
    />
  );

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await request.get('professionalOrders');
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (e) {
      console.log('error fetching orders!', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await request.post('professionalOrders/add', {
        ...values,
        paymentStatus: 'None',
        total: total
      });
      if (res.status === 201) {
        message.success('Successfully Added!');
        handleCancel();
        fetchOrders();
      } else {
        message.error('Failed Try Again!');
        handleCancel();
      }
    } catch (e) {
      console.log('error!', e);
    }
  };

  const onSearch = (value) => {
    let result = [];
    result = data.filter((res) => {
      if (value == '') {
        window.location.reload(true);
        return res;
      } else {
        return res.customer.toLowerCase().search(value) != -1;
      }
    });
    setData(result);
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer',
      key: 'customer'
    },
    {
      title: 'Order Type',
      dataIndex: 'orderType',
      key: 'orderType'
    },
    {
      title: 'Phone',
      dataIndex: 'contactNumber',
      key: 'contactNumber'
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus'
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
          <Space direction="vertical" className="professionalSearch">
            <Search
              prefix={prefix}
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={onSearch}
              className="professionalSearch"
            />
          </Space>
          <Modal
            title="Add Professional Order"
            width={1200}
            visible={open}
            setOpen={false}
            footer={null}
            maskClosable={false}
            onCancel={handleCancel}>
            <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
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
                  label="Customer Name"
                  rules={[
                    {
                      required: true,
                      message: 'Customer name is required'
                    }
                  ]}>
                  <Input placeholder="John Smith" />
                </Form.Item>

                <Form.Item
                  name={['contactNumber']}
                  style={{
                    width: 600,
                    marginLeft: 10
                  }}
                  labelCol={{ ...layout.labelCol }}
                  label="Contact Number"
                  rules={[
                    {
                      required: true,
                      message: 'Contact number is required'
                    }
                  ]}>
                  <Input placeholder="0767896523" />
                </Form.Item>
                <br />
                <Form.Item
                  name={['notes']}
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
                        <h2 className="porderHeader">Order Details</h2>

                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['orderType']}
                          style={{
                            marginLeft: -300
                          }}
                          label="Order Type"
                          rules={[
                            {
                              required: true,
                              message: 'Print price is required'
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
                            <Option value="Sport Meet MCG">Sport Meet MCG</Option>
                            <Option value="SLIIT Graduation">SLIIT Graduation</Option>
                            <Option value="SLIIT New Year Day">SLIIT New Year Day</Option>
                            <Option value="Swimming Meet">Swimming Meet</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['photoSize']}
                          style={{
                            marginLeft: -300
                          }}
                          label="Photo Size"
                          rules={[
                            {
                              required: true,
                              message: 'Photo size is required'
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
                          name={['printPrice']}
                          style={{
                            marginLeft: 600,
                            marginTop: -110
                          }}
                          label="Print Price"
                          rules={[
                            {
                              required: true,
                              message: 'Print price is required'
                            }
                          ]}>
                          <InputNumber
                            onChange={(value) => setPrintPrice(value)}
                            placeholder=" 0.00"
                            controls={false}
                            defaultValue={0}
                            addonBefore={<Typography.Text>LKR</Typography.Text>}
                            style={{
                              width: 230
                            }}
                          />
                        </Form.Item>

                        <Form.Item
                          labelCol={{ ...layout.labelCol, span: 10 }}
                          name={['framePrice']}
                          style={{
                            marginLeft: 600
                          }}
                          label="Frame Price"
                          rules={[
                            {
                              required: true,
                              message: 'Frame price is required'
                            }
                          ]}>
                          <InputNumber
                            onChange={(value) => setFramePrice(value)}
                            placeholder=" 0.00"
                            defaultValue={0}
                            controls={false}
                            addonBefore={<Typography.Text>LKR</Typography.Text>}
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
                label="Total Price">
                <Typography.Text strong>LKR {total}</Typography.Text>
              </Form.Item>
              {/* <Typography.Text style={{ float: 'left' }} strong key="total">
                Total : {total} LKR
              </Typography.Text> */}
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
