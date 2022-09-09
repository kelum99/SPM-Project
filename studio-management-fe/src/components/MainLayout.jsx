import React, { useState } from 'react';
import { Layout, Image, Typography, Menu } from 'antd';
import { TeamOutlined, UserOutlined, FileDoneOutlined, FileAddOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout(props) {
  const { Content, Footer, Sider, Header } = Layout;
  const location = useLocation();
  return (
    <Layout>
      <Header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: 'rgb(0, 21, 41)'
          }}>
          {/* <Image
        style={{ marginLeft: 20 }}
        width={200}
        height={50}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      /> */}
          <Typography.Title style={{ marginLeft: '30%', color: '#fff' }}>
            Studio 73 and Color Lab
          </Typography.Title>
        </div>
      </Header>
      <Layout hasSider>
        <Sider width={220} collapsible>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/amateurOrder']}
            selectedKeys={[location.pathname]}>
            <Menu.Item key={['/amateurOrder']}>
              <Link to={'/amateurOrder'}>
                <UserOutlined />
                <span>Amateur Order</span>
              </Link>
            </Menu.Item>

            <Menu.Item key={['/professionalOrder']}>
              <Link to={'/professionalOrder'}>
                <TeamOutlined />
                <span>Professional Order</span>
              </Link>
            </Menu.Item>

            <Menu.Item key={['/eventOrder']}>
              <Link to={'/eventOrder'}>
                <FileDoneOutlined />
                <span>Event Order</span>
              </Link>
            </Menu.Item>

            <Menu.Item key={['/professionalCustomer']}>
              <Link to={'/professionalCustomer'}>
                <FileAddOutlined />
                <span>Professional Customer</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ padding: '0 24px 24px', minHeight: '90vh' }}>
          <div className="content-container">
            {props.title && (
              <div className="content-header-container">
                <h2 className="h2-user-management">{props.title}</h2>
              </div>
            )}
            <div>{props.children}</div>
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: 'center',
          padding: 12
        }}>
        Copyright 2022 ©Studio 73. All Right Reserved.
      </Footer>
    </Layout>
  );
}
