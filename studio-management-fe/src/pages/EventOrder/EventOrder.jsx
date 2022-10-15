import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Divider,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
  InputNumber,
  message,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import './Styles.css';
import useRequest from '../../services/RequestContext';
import PaymentHandler from './PaymentHandler';
import moment from 'moment';

const EventOrder = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('Add');
  const [items, setItems] = useState([]);
  const [payment, setPayment] = useState();
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [editOrder, setEditdOrder] = useState();

  const { request } = useRequest();
  const { Option } = Select;
  const { Search } = Input;

  const [form] = Form.useForm();

  const showModal = () => {
    setMode('Add');
    setEditdOrder(undefined);
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setMode('Add');
    setItems([]);
    setOpen(false);
  };

  const onFinish = async (values) => {
    try {
      if (items.length > 0) {
        const res = await request.post('eventOrders/add', {
          ...values,
          items: items,
          orderStatus: 'None',
          paymentStatus: 'None',
          total: total,
          payment: [{ amount: payment, date: Date.now() }]
        });
        if (res.status === 201) {
          message.success('Event Order Added Successfully!');
          fetchOrders();
          handleCancel();
        }
      } else {
        message.error('You must add at least one item!');
      }
    } catch (e) {
      console.log('error adding data', e);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const res = await request.delete(`eventOrders/${id}`);
      if (res.status === 200) {
        fetchOrders();
        message.success('Order Successfully Deleted!');
      }
    } catch (e) {
      console.log('error deleting data', e);
    }
  };
  const calculateTotal = () => {
    let temp = 0;
    if (mode === 'Edit') {
      temp = editOrder?.total;
    }
    if (items.length > 0 && items !== undefined) {
      temp = items.map((val) => val.price).reduce((prev, curr) => prev + curr);
    }
    setTotal(temp);
  };

  const updateOrder = async (values) => {
    try {
      const res = await request.patch(`eventOrders/${editOrder?._id}`, {
        ...values,
        items: items,
        total: total
      });
      if (res.status === 200) {
        message.success('Event Order Updated!');
        setOpen(false);
        fetchOrders();
      }
    } catch (e) {
      console.log('error deleting data', e);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await request.get('eventOrders');
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (e) {
      console.log('error fetching orders!', e);
    } finally {
      setLoading(false);
    }
  };

  const onClosePaymentModel = async () => {
    setSelectedOrder(undefined);
    await fetchOrders();
  };

  const onSearch = useCallback(
    (value) => {
      let temp = [];
      if (data.length > 0 && data !== undefined) {
        if (value === '' || value === undefined) {
          fetchOrders();
        } else {
          temp = data.filter((val) => val.customer.toLowerCase().search(value.toLowerCase()) != -1);
          setData(temp);
        }
      }
    },
    [data]
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Event Type',
      dataIndex: 'eventType',
      key: 'eventType'
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <div className="actionGrp">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditdOrder(record);
                setMode('Edit');
                setOpen(true);
                setItems(record.items);
                const temp = {
                  ...record,
                  eventDate: moment(record.eventDate)
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
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red'
                  }}
                />
              }
              title="Are you sure to delete this order?"
              okText="Delete"
              onConfirm={() => deleteOrder(record._id)}>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </>
      )
    }
  ];
  return (
    <MainLayout title="Event Order">
      <div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Event Order
            </Button>
            <Search
              placeholder="Input search text"
              allowClear
              enterButton
              style={{
                width: 250
              }}
              onSearch={onSearch}
            />
          </div>
          <Modal
            maskClosable={false}
            width={1080}
            title={mode === 'Add' ? 'Add Event Order' : 'Edit Event Order'}
            visible={open}
            onOk={() => form.submit()}
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
            <Form layout="vertical" form={form} onFinish={mode === 'Add' ? onFinish : updateOrder}>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Form.Item
                    label="Customer Name"
                    name="customer"
                    rules={[{ required: true, message: 'Customer Name is required' }]}>
                    <Input value={editOrder?.customer} placeholder="Enter Customer Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Contact Number"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: 'Contact Number is required'
                      }
                    ]}>
                    <InputNumber
                      maxLength={10}
                      value={editOrder?.mobile}
                      style={{ width: '60%' }}
                      controls={false}
                      placeholder="Enter Contact Number"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Address is required' }]}>
                    <Input placeholder="Enter Customer Address" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Note" name="note">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[24, 24]}>
                <Col span={8}>
                  <Form.Item
                    label="Event Type"
                    name="eventType"
                    rules={[{ required: true, message: 'Event Type is required' }]}>
                    <Select placeholder="Select Event">
                      <Option value="Birthday party">Birthday party</Option>
                      <Option value="Wedding">Wedding</Option>
                      <Option value="Get together party">Get together party</Option>
                      <Option value="Outdoor party">Outdoor party</Option>
                      <Option value="Special Function">Special Function</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Event Date"
                    name="eventDate"
                    rules={[{ required: true, message: 'Event Date is required' }]}>
                    <DatePicker placeholder="Select Date" />
                  </Form.Item>
                  <Form.Item
                    label="Payment"
                    rules={[{ required: true, message: 'Payment is required' }]}
                    name="paymentX">
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
                <Col span={16}>
                  <div style={{ border: '1px solid #c6c6c6', padding: 10 }}>
                    <Form.Item label="Items" name="items">
                      <Input.Group compact>
                        <Form.Item style={{ width: '35%' }} name={['Items', 'item']}>
                          <Select
                            placeholder="Select Item"
                            onChange={() => {
                              setAddVisible(true);
                              setError(undefined);
                            }}>
                            <Option value="Album">Album</Option>
                            <Option value="Video">Video</Option>
                            <Option value="Soft Copies">Soft Copies</Option>
                            <Option value="Framed Photos">Framed Photos</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: 5 }} name={['Items', 'price']}>
                          <InputNumber
                            min={0}
                            controls={false}
                            style={{ width: '80%' }}
                            placeholder="Enter Price"
                            addonAfter={<Typography.Text>LKR</Typography.Text>}
                            onChange={() => setError(undefined)}
                          />
                        </Form.Item>
                        <Button
                          disabled={!addVisible}
                          icon={<PlusOutlined />}
                          style={{ marginLeft: 16 }}
                          onClick={() => {
                            if (
                              form.getFieldValue(['Items', 'item']) !== undefined &&
                              form.getFieldValue(['Items', 'price']) !== undefined
                            ) {
                              setError(undefined);
                              setAddVisible(false);
                              setItems([...items, form.getFieldValue('Items')]);
                              form.resetFields([
                                ['Items', 'item'],
                                ['Items', 'price']
                              ]);
                            } else {
                              setError('Item or price cannot be empty!');
                            }
                          }}>
                          Add
                        </Button>
                        {error && <span style={{ color: 'red' }}>{error}</span>}
                      </Input.Group>
                    </Form.Item>
                    {items.length > 0 && (
                      <div style={{ marginLeft: 16, marginTop: -10 }}>
                        {items.map((value) => (
                          <Row key={value.item} gutter={[16, 16]}>
                            <Col span={4}>
                              <Typography.Text strong>{value.item}</Typography.Text>
                            </Col>
                            <Col>
                              <Typography.Text strong style={{ textAlign: 'left' }}>
                                LKR {value.price}
                              </Typography.Text>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    )}
                  </div>
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
    </MainLayout>
  );
};

export default EventOrder;
