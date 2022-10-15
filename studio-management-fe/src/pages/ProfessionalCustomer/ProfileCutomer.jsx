import { Typography, Card, Table, Button } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import useRequest from '../../services/RequestContext';
import './ProfessionalCustomerStyles.css';
import { jsPDF } from 'jspdf';

const { Text } = Typography;
const DetailText = (props) => {
  return (
    <div className="detailText">
      <Text strong className="detailKey">
        {props.title} :
      </Text>
      <Text strong className="detailValue">
        {props.value}
      </Text>
    </div>
  );
};
const columns = [
  {
    title: 'Shop Name',
    dataIndex: 'customer',
    key: 'shopName'
  },
  {
    title: 'Mobile',
    dataIndex: 'contactNumber',
    key: 'mobile'
  },
  {
    title: 'Total (LKR)',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
    render: (_, record) => (
      <Typography.Text>{moment(record.orderDate).format('YYYY-MM-DD')}</Typography.Text>
    )
  },
  {
    title: 'Order Type',
    dataIndex: 'orderType',
    key: 'orderType'
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus'
  }
];
export default function ProfileCutomer() {
  const { id } = useParams();
  const { request } = useRequest();
  const [data, setData] = useState();
  const [orders, setOrders] = useState();
  let doc;

  const downloadPDF = () => {
    doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [1700, 1000]
    });
    doc.html(document.getElementById('printdiv'), {
      callback: function (pdf) {
        pdf.save('PaymentReciept.pdf');
      }
    });
  };

  const fetchViewCustomer = async () => {
    try {
      const res = await request.get(`professionalCustomer/${id}`);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (e) {
      console.log('error fetching viewCustomer!', e);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await request.get('professionalOrders');
      if (res.status === 200) {
        const temp = res.data.filter((val) => val.customer === data.studioName);
        setOrders(temp);
      }
    } catch (e) {
      console.log('error fetching orders!', e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchViewCustomer();
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      fetchOrders();
    }
  }, [data]);

  return (
    <MainLayout title="Customer Profile">
      <div>
        <div className="site-card-border-less-wrapper">
          <Card title="Customer Profile" bordered={false} style={{ width: 300 }}>
            <DetailText title="Owner" value={data?.ownerName} />
            <DetailText title="Shop Name" value={data?.studioName} />
            <DetailText title="Mobile" value={data?.mobile} />
            <DetailText title="Address" value={data?.address} />
            <DetailText title="Join Date" value={moment(data?.joinDate).format('YYYY-MM-DD')} />
            <DetailText title="Account Balance" value={data?.accountBalance + ' LKR'} />
          </Card>
        </div>
        <div style={{ marginTop: 20 }}>
          {orders !== undefined && (
            <>
              <h2>Order History</h2>
              <Button type="primary" onClick={downloadPDF}>
                Download as PDF
              </Button>
              <Table
                id="printdiv"
                className="tableContainer"
                dataSource={orders}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
