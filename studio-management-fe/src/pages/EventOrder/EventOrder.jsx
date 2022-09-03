import React from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import './Styles.css';
import { render } from '@testing-library/react';
const dataSource = [
  {
    key: '1',
    orderId: '001',
    customer: 'Mike',
    mobile: '0752289383',
    eventType: 'Birthday Party'
  },
  {
    key: '2',
    orderId: '002',
    customer: 'John',
    mobile: '0769368953',
    eventType: 'Birthday Party'
  }
];

const EventOrder = () => {
  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId'
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
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventOrder;
