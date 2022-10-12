import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Input, Popconfirm, message, Divider } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import useRequest from '../../services/RequestContext';
import './AmateurOrderStyles.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AmateurPaymentHandler from './AmateurPaymentHandler';

const AmateurOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { Search } = Input;
  let navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await request.get('amateurOrders');
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

  const deleteAmateurOrder = async (id) => {
    try {
      const res = await request.delete(`amateurOrders/${id}`);
      if (res.status === 200) {
        fetchOrders();
        message.success('Order Successfully Deleted!');
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
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus'
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
          <div className="amateurActionGrp">
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/editAmateurOrder/${record._id}`)}
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
              onConfirm={() => deleteAmateurOrder(record._id)}>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </>
      )
    }
  ];

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

  const onClosePaymentModel = async (val) => {
    await fetchOrders();
    setSelectedOrder(undefined);
  };

  return (
    <center>
      <MainLayout title="Amateur Order">
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '2%'
            }}>
            <Link to="/addAmateurOrder">
              <Button type="primary" icon={<PlusOutlined />} className="actionButton">
                Add Amateur Order
              </Button>
            </Link>
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
          <div className="amateurTableContainer">
            <div className="table-container">
              <Table
                dataSource={data}
                columns={columns}
                loading={loading}
                rowKey={(record) => record._id}
              />
            </div>
            <div className="cards">
              {data.map((item) => (
                <div key={item._id}>
                  <div className="card-record">
                    <label className="card-label">Order Id</label>
                    <p>{item._id}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Customer</label>
                    <p>{item.customer}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Mobile</label>
                    <p>{item.mobile}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Payment Status</label>
                    <p>{item.paymentStatus}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Order Status</label>
                    <p>{item.orderStatus}</p>
                  </div>
                  <div className="amateurActionGrp">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/editAmateurOrder/${item._id}`)}
                    />
                    <Button
                      style={{ margin: '0px 10px' }}
                      icon={<EyeOutlined />}
                      onClick={() => setSelectedOrder(item)}
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
                      onConfirm={() => deleteAmateurOrder(item._id)}>
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </div>
                  <Divider type="horizontal" className="horizontalDivider" />
                </div>
              ))}
            </div>
          </div>
          <AmateurPaymentHandler
            visible={selectedOrder !== undefined}
            onCancel={onClosePaymentModel}
            record={selectedOrder}
          />
        </div>
      </MainLayout>
    </center>
  );
};

export default AmateurOrder;
