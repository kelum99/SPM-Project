import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, Table, Input } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';

import useRequest from '../../services/RequestContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfessionalCustomer = () => {
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

  const fetchProfessionalCustomer = async () => {
    setLoading(true);
    try {
      const res = await request.get('professionalCustomer');
      if (res.status === 200) {
        //console.log('data', res.data);
        setData(res.data);
      }
    } catch (e) {
      console.log('error fetching ProfessionalCustomer!', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionalCustomer();
  }, []);

  const columns = [
    {
      title: 'Studio Name',
      dataIndex: 'studioName',
      key: 'studioName'
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

  const onSearch = (value) => {
    let result = [];
    result = data.filter((res) => {
      if (value == '') {
        window.location.reload(true);
        return res;
      } else {
        return res.ownerName.toLowerCase().search(value) != -1;
      }
    });
    setData(result);
  };

  return (
    <MainLayout title="Professional Customer">
      <div>
        <Search
          prefix={prefix}
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className="amateurSearch"
        />
        <div>
          <Link to={'/addCustomer'}>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Professional Customer
            </Button>
          </Link>
        </div>
        <div className="tableContainer">
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalCustomer;
