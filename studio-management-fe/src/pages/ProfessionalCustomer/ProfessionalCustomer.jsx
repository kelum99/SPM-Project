import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, Table } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import useRequest from '../../services/RequestContext';
import { useState } from 'react';
import { useEffect } from 'react';

const ProfessionalCustomer = () => {

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
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Owner Name',
      dataIndex: 'ownerName',
      key: 'ownerName'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Account Balance',
      dataIndex: 'accountBalance',
      key: 'accountBalance'
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate'
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
    <MainLayout title="Professional Customer">
       <div>
        <div>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Professional Customer
          </Button>
        </div>
        <div className="tableContainer">
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalCustomer;
