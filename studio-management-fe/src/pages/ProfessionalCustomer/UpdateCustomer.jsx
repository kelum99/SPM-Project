import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, DatePicker, Form, Input, InputNumber, message } from 'antd';
import useRequest from '../../services/RequestContext';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
const UpdateCustomer = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const onFinish = async (values) => {
    try {
      const res = await request.patch(`professionalCustomer/${id}`, values);
      if (res.status === 200) {
        message.success('Professional Customer Updated Successfully!');
        navigate('/professionalCustomer', { replace: true });
      }
    } catch (e) {
      console.log('error adding data', e);
    }
  };
  const fetchViewCustomer = async () => {
    setLoading(true);
    try {
      const res = await request.get(`professionalCustomer/${id}`);
      if (res.status === 200) {
        const temp = res.data;
        setData({ ...temp, joinDate: moment(temp.joinDate) });
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

  return (
    <MainLayout title="Update Customer">
      <div style={{ width: 700 }}>
        {data && (
          <Form initialValues={data} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="studioName"
              label="Studio Name"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Enter Studio Name" />
            </Form.Item>

            <Form.Item
              name="ownerName"
              label="Owner Name"
              rules={[{ required: true, message: 'Please input your Owner Name!' }]}>
              <Input placeholder="Enter Owner Name" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input your Address!' }]}>
              <Input placeholder="Enter Address" />
            </Form.Item>

            <Form.Item
              name="mobile"
              label="Mobile"
              rules={[{ required: true, message: 'Please input your Mobile!' }]}>
              <Input style={{ width: '50%' }} placeholder="Enter Mobile" />
            </Form.Item>

            <Form.Item
              name="accountBalance"
              label="Account Balance"
              rules={[{ required: true, message: 'Please input your Account Balance!' }]}>
              <InputNumber
                style={{ width: '50%' }}
                min={0}
                controls={false}
                placeholder="Enter Account Balance"
              />
            </Form.Item>

            <Form.Item
              name="joinDate"
              label="Join Date"
              rules={[{ required: true, message: 'Please input your Join Date!' }]}>
              <DatePicker format="YYYY-MM-DD" placeholder="Enter Date" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Customer
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </MainLayout>
  );
};

export default UpdateCustomer;
