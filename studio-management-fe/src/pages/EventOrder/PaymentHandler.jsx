import { Modal } from 'antd';
import React from 'react';

const PaymentHandler = (props) => {
  return (
    <>
      <Modal maskClosable={false} visible={props.visible} onCancel={props.onCancel}>
        <h2>Payment handler</h2>
      </Modal>
    </>
  );
};

export default PaymentHandler;
