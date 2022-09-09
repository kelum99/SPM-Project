import React from 'react';
import { Layout } from 'antd';
import Slider from './Slider';
import Header from './Header';

export default function MainLayout(props) {
  const { Content, Footer } = Layout;
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Slider />
          <Content style={{ padding: '0 24px 24px', minHeight: 360 }}>
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
    </>
  );
}
