import { Button, Table, Modal } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

const dataSource = [
  {
    key: '1',
    orderId: 'P001',
    customerName: 'Saman Perera',
    date: '2022/07/28',
    phone: '0778975678'
  },
  {
    key: '2',
    orderId: 'P002',
    customerName: 'Janith Perera',
    date: '2022/07/28',
    phone: '0778975558'
  }
];

const ProfessionalOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('HH', isModalOpen);
  }, [isModalOpen]);
  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <>
          <div className="actionGrop">
            <Button icon={<EditOutlined />} />
            <Button style={{ margin: '0px 10px' }} icon={<EyeOutlined />} />
            <Button danger icon={<DeleteOutlined />} />
          </div>
        </>
      )
    }
  ];

  return (
    <MainLayout title="Professional Order">
      <div>
        <>
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add Professional Order
          </Button>
          <Modal title="Pcus" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Hi</p>
          </Modal>
        </>
        <div className="tableContainer">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalOrder;
