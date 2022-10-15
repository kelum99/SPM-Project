import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, Table, Input, Popconfirm, message, Typography } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import useRequest from '../../services/RequestContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const ProfessionalCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { Search } = Input;
  const navigate = useNavigate();
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1890ff'
      }}
    />
  );

  const deleteProfessionalCustomer = async (id) => {
    try {
      const res = await request.delete(`professionalCustomer/${id}`);
      if (res.status === 200) {
        fetchProfessionalCustomer();
        message.success('Order Successfully Deleted!');
      }
    } catch (e) {
      console.log('error deleting data', e);
    }
  };

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
      key: 'joinDate',
      render: (_, record) => (
        <Typography.Text>{moment(record.joinDate).format('YYYY-MM-DD')}</Typography.Text>
      )
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
              onClick={() => navigate(`updateCustomer/${record._id}`)}
            />
            <Button
              style={{ margin: '0px 10px' }}
              onClick={() => navigate(`viewCustomer/${record._id}`)}
              icon={<EyeOutlined />}
            />
            <Popconfirm
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red'
                  }}
                />
              }
              title="Are you sure to delete this customer?"
              okText="Delete"
              onConfirm={() => deleteProfessionalCustomer(record._id)}>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
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
