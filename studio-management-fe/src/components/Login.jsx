import React from 'react';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import useRequest from '../services/RequestContext';
import useUser from '../services/UserContext';
import './ComponentsStyles.css';

export default function Login() {
  const [form] = Form.useForm();
  const { request, UpdateToken } = useRequest();
  const { decodeToken } = useUser();

  return (
    <div className="login-main">
      <div className="login-main-component">
        <Card
          className="loginCard"
          title="Sign In"
          headStyle={{ fontSize: 30, fontWeight: 'bold', border: 'none' }}>
          <Form
            style={{ width: 400 }}
            layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            //onFinish={onFinish}
            form={form}
            autoComplete="off">
            <Form.Item
              className="lableText"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!'
                }
              ]}>
              <Input
                type="email"
                style={{ width: 400, borderRadius: 4, height: 40 }}
                placeholder="abc@gmail.com"
              />
            </Form.Item>

            <Form.Item
              className="lableText"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}>
              <Input.Password
                style={{ width: 400, borderRadius: 4, height: 40 }}
                placeholder="Enter Password"
              />
            </Form.Item>

            <Form.Item style={{ alignItems: 'center' }}>
              <Link to={'/eventOrder'}>
                <Button>Login</Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
