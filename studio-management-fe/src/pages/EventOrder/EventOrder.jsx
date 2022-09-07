import React from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import './Styles.css';
import useRequest from '../../services/RequestContext';
import { useState } from 'react';
import { useEffect } from 'react';

const EventOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();

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
          <Button type="primary" icon={<PlusOutlined />}>
            Add Event Order
          </Button>
        </div>
        <div className="tableContainer">
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventOrder;
