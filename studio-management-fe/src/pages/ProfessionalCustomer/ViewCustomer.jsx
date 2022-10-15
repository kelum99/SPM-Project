import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, Table, Input, Card, Typography } from 'antd';
import './ProfessionalCustomerStyles.css';
import { SearchOutlined } from '@ant-design/icons';
import useRequest from '../../services/RequestContext';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

const { Text } = Typography;

const DetailText = (props) => {
  return (
    <div className="detailText">
      <Text strong className="detailKey">
        {props.title} :
      </Text>
      <Text strong className="detailValue">
        {props.value}
      </Text>
    </div>
  );
};

const ViewCustomer = () => {
  const [data, setData] = useState();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { Search } = Input;
  let { id } = useParams();
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
        margin: '2%',
        display: 'flex'
      }}
    />
  );
  const fetchOrders = async () => {
    try {
      const res = await request.get('professionalOrders');
      if (res.status === 200) {
        const temp = res.data.filter((val) => val.customer === data.studioName);
        console.log('sad', temp);
        setOrders(temp);
      }
    } catch (e) {
      console.log('error fetching orders!', e);
    }
  };
  const fetchViewCustomer = async () => {
    setLoading(true);
    try {
      const res = await request.get(`professionalCustomer/${id}`);
      if (res.status === 200) {
        console.log('data', res.data);
        setData(res.data);
      }
    } catch (e) {
      console.log('error fetching viewCustomer!', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchViewCustomer();
    }
  }, [id]);
  useEffect(() => {
    if (data) {
      fetchOrders();
    }
  }, [data]);

  const columns = [
    {
      title: 'Shop Name',
      dataIndex: 'customer',
      key: 'shopName'
    },
    {
      title: 'Mobile',
      dataIndex: 'contactNumber',
      key: 'mobile'
    },
    {
      title: 'Total (LKR)',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (_, record) => (
        <Typography.Text>{moment(record.orderDate).format('YYYY-MM-DD')}</Typography.Text>
      )
    },
    {
      title: 'Order Type',
      dataIndex: 'orderType',
      key: 'orderType'
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus'
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
    <MainLayout title="View Customer">
      <div>
        <div className="site-card-border-less-wrapper">
          <Card title="Customer Profile" bordered={false} style={{ width: 300 }} loading={loading}>
            <DetailText title="Owner" value={data?.ownerName} />
            <DetailText title="Shop Name" value={data?.studioName} />
            <DetailText title="Mobile" value={data?.mobile} />
            <DetailText title="Address" value={data?.address} />
            <DetailText title="Join Date" value={moment(data?.joinDate).format('YYYY-MM-DD')} />
            <DetailText title="Account Balance" value={data?.accountBalance + ' LKR'} />
          </Card>
        </div>
      </div>
      <div>
        {/* <div>
          <Link to={'/addCustomer'}>
            <Button className="mButton" type="primary" icon={<PlusOutlined />}>
              Manage Unpaid Orders
            </Button>
          </Link>
        </div> */}
        <Search
          prefix={prefix}
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className="amateurSearch"
          placeholder="Enter Order ID"
        />
      </div>
      <div className="tableContainer">
        {orders && <Table dataSource={orders} columns={columns} loading={loading} />}
      </div>
    </MainLayout>
  );
};
export default ViewCustomer;
