import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, UserOutlined, FileDoneOutlined, FileAddOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Slider() {
  const [collapsed, setCollapsed] = useState(false);

  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Sider
        style={{
          minHeight: '90vh',
          background: '#001529'
        }}
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
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
    </div>
  );
}
