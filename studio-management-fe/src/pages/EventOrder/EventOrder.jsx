import React, { useState, useEffect } from 'react';
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
  message
} from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import './Styles.css';
import useRequest from '../../services/RequestContext';
import { useCallback } from 'react';

const EventOrder = () => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const { request } = useRequest();
  const { Option } = Select;
  const { Search } = Input;

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setItems([]);
    setOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const res = await request.post('eventOrders/add', {
        ...values,
        items: items,
        orderStatus: 'None',
        paymentStatus: 'None',
        total: total
      });
      if (res.status === 201) {
        message.success('Event Order Added Successfully!');
        fetchOrders();
        handleCancel();
      }
    } catch (e) {
      console.log('error adding data', e);
    }
  };

  const calculateTotal = () => {
    let temp = 0;
    if (items.length > 0 && items !== undefined) {
      temp = items.map((val) => val.price).reduce((prev, curr) => prev + curr);
    }
    setTotal(temp);
  };

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await request.get('eventOrders');
      if (res.status === 200) {
        //console.log('data', res.data);
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
      render: () => (
        <>
          <div className="actionGrp">
            <Button icon={<EditOutlined />} />
            <Button style={{ margin: '0px 10px' }} icon={<EyeOutlined />} />
            <Button danger icon={<DeleteOutlined />} />
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
              //onSearch={onSearch}
            />
          </div>
          <Modal
            maskClosable={false}
            width={1080}
            title="Add Event Order"
            visible={open}
            onCancel={handleCancel}
            footer={[
              <Typography.Text style={{ float: 'left' }} strong key="total">
                Total : {total} LKR
              </Typography.Text>,
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={() => form.submit()}>
                Add Order
              </Button>
            ]}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Form.Item label="Customer Name" name="customer" required>
                    <Input placeholder="Enter Customer Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Contact Number" name="mobile" required>
                    <Input placeholder="Enter Contact Number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address" name="address" required>
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
                  <Form.Item label="Event Type" name="eventType" required>
                    <Select placeholder="Select Event">
                      <Option value="Birthday party">Birthday party</Option>
                      <Option value="Wedding">Wedding</Option>
                      <Option value="Get together party">Get together party</Option>
                      <Option value="Outdoor party">Outdoor party</Option>
                      <Option value="Special Function">Special Function</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Event Date" name="eventDate" required>
                    <DatePicker placeholder="Select Date" />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <div style={{ border: '1px solid #c6c6c6', padding: 10 }}>
                    <Form.Item label="Items" name="items">
                      <Input.Group compact>
                        <Form.Item
                          style={{ width: '35%' }}
                          name={['items', 'item']}
                          //rules={[{ required: true, message: 'Item is required' }]}
                        >
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
                        <Form.Item style={{ marginLeft: 5 }} name={['items', 'price']}>
                          <InputNumber
                            min={0}
                            controls={false}
                            style={{ width: '80%' }}
                            placeholder="Enter Price"
                            addonBefore={<Typography.Text>LKR</Typography.Text>}
                            onChange={() => setError(undefined)}
                          />
                        </Form.Item>
                        <Button
                          disabled={!addVisible}
                          icon={<PlusOutlined />}
                          style={{ marginLeft: 16 }}
                          onClick={() => {
                            if (
                              form.getFieldValue(['items', 'item']) !== undefined &&
                              form.getFieldValue(['items', 'price']) !== undefined
                            ) {
                              setError(undefined);
                              setAddVisible(false);
                              setItems([...items, form.getFieldValue('items')]);
                              form.resetFields([
                                ['items', 'item'],
                                ['items', 'price']
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
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventOrder;
