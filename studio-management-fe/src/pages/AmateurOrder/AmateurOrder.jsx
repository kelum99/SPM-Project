import React from 'react';
import { Button, Table, Input, Space } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import useRequest from '../../services/RequestContext';
import { useState } from 'react';
import { useEffect } from 'react';
import './AmateurOrderStyles.css';
import { Link } from 'react-router-dom';

const AmateurOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { Search } = Input;

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1890ff'
      }}
    />
  );

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await request.get('amateurOrders');
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
      render: () => (
        <>
          <div className="amateurActionGrp">
            <Button icon={<EditOutlined />} />
            <Button style={{ margin: '0px 10px' }} icon={<EyeOutlined />} />
            <Button danger icon={<DeleteOutlined />} />
          </div>
        </>
      )
    }
  ];

  const onSearch = (value) => console.log(value);

  return (
    <center>
      <MainLayout title="Amateur Order">
        <div>
          <Space direction="vertical" className="amateurSearch2">
            <Search
              prefix={prefix}
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              className="amateurSearch"
            />
          </Space>
          <div className="amateurTableContainer">
            <Table dataSource={data} columns={columns} loading={loading} />
          </div>
          <div>
            <Link to="/addAmateurOrder">
              <Button type="primary" icon={<PlusOutlined />} className="actionButton">
                Add Amateur Order
              </Button>
            </Link>
            <Button type="primary" icon={<DownloadOutlined />} className="actionButton">
              Download List
            </Button>
          </div>
        </div>
      </MainLayout>
    </center>
  );
};

export default AmateurOrder;
