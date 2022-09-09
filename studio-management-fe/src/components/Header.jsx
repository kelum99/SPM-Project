import { Image, Typography } from 'antd';
import React from 'react';

export default function Header() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(0, 21, 41)',
        padding: 10
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
  );
}
