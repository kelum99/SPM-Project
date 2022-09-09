import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, Cascader, DatePicker, Form, Input, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import useRequest from '../../services/RequestContext';
import { useState } from 'react';
import { useEffect } from 'react';

const AddCustomer = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <MainLayout title="Add Customer">
      <Form
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 14
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}>
        <Form.Item
          label="Studio Name"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Owner Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Address">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Number">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Account Balance">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Join Date">
          <DatePicker />
        </Form.Item>

        <Button>Button</Button>
      </Form>
    </MainLayout>
  );
};

export default AddCustomer;
