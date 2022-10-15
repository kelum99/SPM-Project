import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Input, Popconfirm, message, Divider } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import useRequest from '../../services/RequestContext';
import './AmateurOrderStyles.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AmateurPaymentHandler from './AmateurPaymentHandler';
import { jsPDF } from 'jspdf';
import logoprint from '../../components/Studio 73 1.png';
import moment from 'moment';

const AmateurOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { Search } = Input;
  let navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState();
  let doc;
  const date = Date.now();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await request.get('amateurOrders');
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (e) {
      console.log('error fetching orders!', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteAmateurOrder = async (id) => {
    try {
      const res = await request.delete(`amateurOrders/${id}`);
      if (res.status === 200) {
        fetchOrders();
        message.success('Order Successfully Deleted!');
      }
    } catch (e) {
      console.log('error deleting data', e);
    }
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus'
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <div className="amateurActionGrp">
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/editAmateurOrder/${record._id}`)}
            />
            <Button
              style={{ margin: '0px 10px' }}
              icon={<EyeOutlined />}
              onClick={() => setSelectedOrder(record)}
            />
            <Popconfirm
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red'
                  }}
                />
              }
              title="Are you sure to delete this order?"
              okText="Delete"
              onConfirm={() => deleteAmateurOrder(record._id)}>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </>
      )
    }
  ];

  const columns2 = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus'
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    }
  ];

  const onSearch = useCallback(
    (value) => {
      let temp = [];
      if (data.length > 0 && data !== undefined) {
        if (value === '' || value === undefined) {
          fetchOrders();
        } else {
          temp = data.filter((val) => val.customer.toLowerCase().search(value.toLowerCase()) != -1);
          setData(temp);
        }
      }
    },
    [data]
  );

  const onClosePaymentModel = async (val) => {
    await fetchOrders();
    setSelectedOrder(undefined);
  };

  const downloadPDF = () => {
    doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [1700, 1000]
    });
    doc.html(document.getElementById('printTable'), {
      callback: function (pdf) {
        pdf.save('AmateurOrderReport.pdf');
      }
    });
  };

  return (
    <center>
      <MainLayout title="Amateur Order">
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: '2%'
            }}>
            <Search
              placeholder="Input search text"
              allowClear
              enterButton
              style={{
                width: 250
              }}
              onSearch={onSearch}
            />
          </div>
          <div className="amateurTableContainer">
            <div className="table-container">
              <Table
                dataSource={data}
                columns={columns}
                loading={loading}
                rowKey={(record) => record._id}
              />
            </div>

            <div className="cards">
              {data.map((item) => (
                <div key={item._id}>
                  <div className="card-record">
                    <label className="card-label">Order Id</label>
                    <p>{item._id}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Customer</label>
                    <p>{item.customer}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Mobile</label>
                    <p>{item.mobile}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Payment Status</label>
                    <p>{item.paymentStatus}</p>
                  </div>
                  <div className="card-record">
                    <label className="card-label">Order Status</label>
                    <p>{item.orderStatus}</p>
                  </div>
                  <div className="amateurActionGrp">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/editAmateurOrder/${item._id}`)}
                    />
                    <Button
                      style={{ margin: '0px 10px' }}
                      icon={<EyeOutlined />}
                      onClick={() => setSelectedOrder(item)}
                    />
                    <Popconfirm
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: 'red'
                          }}
                        />
                      }
                      title="Are you sure to delete this order?"
                      okText="Delete"
                      onConfirm={() => deleteAmateurOrder(item._id)}>
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </div>
                  <Divider type="horizontal" className="horizontalDivider" />
                </div>
              ))}
            </div>
          </div>
          <div className="buttonGrp">
            <div className="actionButton">
              <Link to="/addAmateurOrder">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Amateur Order
                </Button>
              </Link>
            </div>
            <div className="actionButton">
              <Button icon={<DownloadOutlined />} type="primary" onClick={downloadPDF}>
                Download List
              </Button>
            </div>
          </div>
          <div style={{ visibility: 'hidden', width: '100%' }}>
            <div id="printTable">
              <center>
                <div className="reportheaderdiv">
                  <div className="logoPrint">
                    <img src={logoprint} alt="logo" />
                  </div>
                  <div className="headingdiv">
                    <h3>Amateur Order Report</h3>
                  </div>
                </div>
                <Divider style={{ backgroundColor: 'black' }} />
                <Table
                  columns={columns2}
                  dataSource={data}
                  size="middle"
                  pagination={false}
                  style={{ marginLeft: '10%', marginTop: '5%' }}
                />
                <Divider style={{ backgroundColor: 'black' }} />
                <div className="reportheaderdiv">
                  <div className="datediv">
                    <h4>{moment(date).format('YYYY-MM-DDTHH:mm:ss')}</h4>
                  </div>
                  <div className="footerdiv">
                    <h4>Studio 73 and Color Lab</h4>
                    <p>
                      Tel: 0452356870
                      <br />
                      e-mail:- studio73@gmail.com
                      <br />
                      address: No 11/7 Rathwaththa Rd, Balangoda
                    </p>
                  </div>
                </div>
              </center>
            </div>
          </div>
          <AmateurPaymentHandler
            visible={selectedOrder !== undefined}
            onCancel={onClosePaymentModel}
            record={selectedOrder}
          />
        </div>
      </MainLayout>
    </center>
  );
};

export default AmateurOrder;
