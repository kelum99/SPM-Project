import React from 'react';
import { Layout } from 'antd';
import Slider from './Slider';

export default function MainLayout(props) {
  const { Content } = Layout;
  return (
    <>
      <Layout>
        <Layout>
          <Slider />
          <Content className="site-layout-background" style={{ padding: '0 24px 24px' }}>
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
      </Layout>
    </>
  );
}
