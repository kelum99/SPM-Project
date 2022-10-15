import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Row,
  Divider,
  Typography,
  InputNumber,
  Popover,
  Popconfirm,
  DatePicker
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
import PaymentHandler from './PaymentHandler';
import moment from 'moment';
import Col from 'antd/es/grid/col';
//import Search from 'antd/lib/transfer/search';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const content = (
  <div>
    <p>Delete ?</p>
    <Button>YES</Button>
    <Button>NO</Button>
  </div>
);

const ProfessionalOrder = () => {
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [mode, setMode] = useState('Add');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const [open, setOpen] = useState(false);
  const { Search } = Input;
  const [total, setTotal] = useState();
  const [printPrice, setPrintPrice] = useState(0);
  const [framePrice, setFramePrice] = useState(0);
  const [payment, setPayment] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState();
  const [editOrder, setEditdOrder] = useState();
  const { Option } = Select;

  const [form] = Form.useForm();

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
    // if (mode === 'Edit') {
    //   temp = editOrder?.total;
    // }
    temp = printPrice + framePrice;
    setTotal(temp);
  }, [framePrice, printPrice]);

  const showModal = () => {
    setMode('Add');
    setEditdOrder(undefined);
    setOpen(true);
  };

  // useEffect(() => {
  //   calculateTotal();
  // }, [items]);

  // const handleOk = () => {
  //   setOpen(false);
  // };

  // const calculateTotal = () => {
  //   let temp = 0;
  //   if (mode === 'Edit') {
  //     temp = editOrder?.total;
  //   }
  //   if (items.length > 0 && items !== undefined) {
  //     temp = items.map((val) => val.price).reduce((prev, curr) => prev + curr);
  //   }
  //   setTotal(temp);
  // };

  const handleCancel = () => {
    form.resetFields();
    setMode('Add');
    setItems([]);
    setOpen(false);
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

  const fetchProfessionalCustomer = async () => {
    setLoading(true);
    try {
      const res = await request.get('professionalCustomer');
      if (res.status === 200) {
        setCustomers(res.data);
      }
    } catch (e) {
      console.log('error fetching ProfessionalCustomer!', e);
    } finally {
      setLoading(false);
    }
  };

  const onClosePaymentModel = async (val) => {
    await fetchOrders();
    setSelectedOrder(undefined);
  };

  useEffect(() => {
    fetchOrders();
    fetchProfessionalCustomer();
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await request.post('professionalOrders/add', {
        ...values,
        paymentStatus: 'None',
        total: total,
        payment: [{ amount: payment, date: Date.now() }]
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

  const deleteOrder = async (id) => {
    try {
      const res = await request.delete(`professionalOrders/${id}`);
      if (res.status === 200) {
        fetchOrders();
        message.success('Successfully Removed!');
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const updateOrder = async (values) => {
    try {
      const res = await request.patch(`professionalOrders/${editOrder?._id}`, {
        ...values,
        items: items,
        total: total
      });
      if (res.status === 200) {
        message.success('Professional Order Updated!');
        setOpen(false);
        form.resetFields();
        setMode('Add');
        fetchOrders();
      }
    } catch (e) {
      console.log('error deleting data', e);
    }
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
    // {
    //   title: 'Payment Status',
    //   dataIndex: 'paymentStatus',
    //   key: 'paymentStatus'
    // },
    {
      title: 'Ceremony Date',
      dataIndex: 'ceremonyDate',
      key: 'ceremonyDate'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <div className="actionGrop">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditdOrder(record);
                setMode('Edit');
                setOpen(true);
                setItems(record.items);
                const temp = {
                  ...record,
                  orderDate: moment(record.orderDate),
                  ceremonyDate: moment(record.ceremonyDate)
                };
                form.setFieldsValue(temp);
              }}
            />

            <Button
              style={{ margin: '0px 10px' }}
              icon={<EyeOutlined />}
              onClick={() => setSelectedOrder(record)}
            />
            <Popconfirm
              content={content}
              title="Are you sure to delete this order?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteOrder(record._id)}>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </>
      )
    }
  ];

  const onReset = () => {
    form.resetFields();
  };

  return (
    <MainLayout title="Professional Order">
      <div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Add Professional Order
            </Button>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
            </div>
            <Modal
              width={1080}
              title={mode === 'Add' ? 'Add Professional Order' : 'Edit Professional Order'}
              visible={open}
              onOk={() => form.submit()}
              setOpen={false}
              maskClosable={false}
              onCancel={handleCancel}
              footer={
                <div>
                  <Typography.Text style={{ float: 'left' }} strong key="total">
                    Total : {total} LKR
                  </Typography.Text>

                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>

                  <Button key="submit" type="primary" onClick={() => form.submit()}>
                    {mode === 'Add' ? 'Add Order' : 'Update Order'}
                  </Button>
                </div>
              }>
              <Form
                layout="vertical"
                form={form}
                onFinish={mode === 'Add' ? onFinish : updateOrder}>
                {/* <fieldset className="fieldset"> */}
                <br />
                <br />
                <div className="cusdiv">
                  <h2 className="CustomerHeader">Customer Details</h2>
                </div>

                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    {/* <Form.Item
                      name={['customer']}
                      label="Customer Name"
                      rules={[
                        {
                          required: true,
                          message: 'Customer name is required',
                          Pattern: '/^[A-Za-z]+$/'
                        }
                      ]}>
                      <Input value={editOrder?.customer} placeholder="John Smith" />
                    </Form.Item> */}

                    <Form.Item
                      name={['customer']}
                      label="Customer Name"
                      rules={[
                        {
                          required: true,
                          message: 'Customer Name is required'
                        }
                      ]}>
                      <Select
                        className="dropdown"
                        placeholder="Customer Name"
                        //   defaultValue="Photo Size"

                        allowClear>
                        {customers.map((customer) => (
                          <>
                            <Option key={customer.name} value={customer.studioName}>
                              {customer.studioName}
                            </Option>
                          </>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={['contactNumber']}
                      label="Contact Number"
                      rules={[
                        {
                          required: true,
                          message: 'Contact number is required',
                          max: 10,
                          min: 10
                        }
                      ]}>
                      <Input value={editOrder?.contactNumber} placeholder="0767896523" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name={['notes']} label="Notes">
                      <Input.TextArea placeholder="Any Notes !" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                {/* </fieldset> */}

                <h2 className="porderHeader">Order Details</h2>
                <br />
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <Form.Item
                      name="ceremonyDate"
                      label="Ceremony Date"
                      rules={[{ required: true, message: 'Enter ceremony date!' }]}>
                      <DatePicker placeholder="Enter Date" />
                    </Form.Item>

                    <Form.Item
                      name={['orderType']}
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

                        allowClear>
                        <Option value="Sport Meet MCG">Sport Meet MCG</Option>
                        <Option value="SLIIT Graduation">SLIIT Graduation</Option>
                        <Option value="SLIIT New Year Day">SLIIT New Year Day</Option>
                        <Option value="Swimming Meet">Swimming Meet</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={['photoSize']}
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

                        allowClear>
                        <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                        <Option value="2*3 inches (51*51 mm)">2*3inches (51*51 mm)</Option>
                        <Option value="2*4 inches (51*51 mm)">2*4 inches (51*51 mm)</Option>
                        <Option value="3*5 inches (51*51 mm)">2*5 inches (51*51 mm)</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Payment" required name="paymentx">
                      <InputNumber
                        min={0}
                        controls={false}
                        style={{ width: '70%' }}
                        disabled={mode === 'Edit'}
                        placeholder="Enter Payment"
                        addonAfter={<Typography.Text>LKR</Typography.Text>}
                        onChange={(value) => setPayment(value)}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name={['printPrice']}
                      label="Print Price"
                      style={{ marginLeft: 160 }}
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
                      name={['framePrice']}
                      label="Frame Price"
                      style={{ marginLeft: 160 }}
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
                  </Col>
                </Row>
              </Form>
            </Modal>
          </div>
          <div className="tableContainer">
            <Table
              rowKey={(record) => record._id}
              dataSource={data}
              columns={columns}
              loading={loading}
            />
          </div>
          <PaymentHandler
            visible={!!selectedOrder}
            onCancel={onClosePaymentModel}
            record={selectedOrder}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalOrder;
