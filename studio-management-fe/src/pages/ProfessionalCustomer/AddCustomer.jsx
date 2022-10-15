import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, DatePicker, Form, Input, InputNumber, message } from 'antd';
import useRequest from '../../services/RequestContext';
import { useNavigate } from 'react-router-dom';
const AddCustomer = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log('xx', values);
      const res = await request.post('professionalCustomer/add', values);
      if (res.status === 201) {
        message.success('Professional Customer Added Successfully!');
        navigate('/professionalCustomer', { replace: true });
      }
    } catch (e) {
      console.log('error adding data', e);
    }
  };
  return (
    <MainLayout title="Add Customer">
      <div style={{ width: 700 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="studioName"
            label="Studio Name"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeHolder="Enter Studio Name" />
          </Form.Item>

          <Form.Item
            name="ownerName"
            label="Owner Name"
            rules={[{ required: true, message: 'Please input your Owner Name!' }]}>
            <Input placeHolder="Enter Owner Name" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input your Address!' }]}>
            <Input placeHolder="Enter Address" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: 'Please input your Mobile!' }]}>
            <Input style={{ width: '50%' }} placeHolder="Enter Mobile" />
          </Form.Item>

          <Form.Item
            name="accountBalance"
            label="Account Balance"
            rules={[{ required: true, message: 'Please input your Account Balance!' }]}>
            <InputNumber
              style={{ width: '50%' }}
              min={0}
              controls={false}
              placeHolder="Enter Account Balance"
            />
          </Form.Item>

          <Form.Item
            name="joinDate"
            label="Join Date"
            rules={[{ required: true, message: 'Please input your Join Date!' }]}>
            <DatePicker placeHolder="Enter Date" style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Customer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default AddCustomer;
