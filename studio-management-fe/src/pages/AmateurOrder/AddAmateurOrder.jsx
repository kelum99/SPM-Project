import React from 'react';
import MainLayout from '../../components/MainLayout';
import {
  Button,
  Form,
  Input,
  Divider,
  Select,
  Radio,
  Checkbox,
  InputNumber,
  message,
  Typography
} from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import useRequest from '../../services/RequestContext';
import { useNavigate, useParams } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const AddAmateurOrder = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [photo, setPhoto] = useState({});
  const [item, setItem] = useState({});
  let navigate = useNavigate();
  const [total, setTotal] = useState();
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [payment, setPayment] = useState();
  const isAddMode = !id;

  const fetchAmateurOrder = async (val) => {
    try {
      const result = await request.get(`amateurOrders/${val}`);

      if (result.status === 200) {
        setOrder(result.data);
        setItem(result.data.items);
        setPhoto(result.data.photos);
        setTotal(result.data.total);
      }
    } catch (e) {
      console.log('Error in retreiving amateur order');
    }
  };

  const calculateTotal = () => {
    var tot = 0;

    if (item.amount && item.itemPrice && item.itemPrintPrice && photo.copies && photo.printPrice) {
      tot =
        photo.copies * photo.printPrice +
        parseFloat(item.amount * (parseFloat(item.itemPrintPrice) + parseFloat(item.itemPrice)));
    } else {
      tot = 0;
    }
    setTotal(tot);
    document.getElementById('total').value = tot;
  };

  if (isAddMode) {
    useEffect(() => {
      calculateTotal();
    }, [item, photo, total]);
  } else {
    useEffect(() => {
      calculateTotal();
      fetchAmateurOrder(id);
    }, [total]);
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!'
    },
    number: {
      range: '${label} must be between ${min} and ${max}'
    }
  };

  const onFinish = async (values) => {
    const orderStatus = 'None';
    const paymentStatus = 'None';
    try {
      const amateurOrderObj = {
        ...values,
        orderStatus: orderStatus,
        paymentStatus: paymentStatus,
        photos: photo,
        items: item,
        total: total,
        payment: [{ amount: payment, date: Date.now() }]
      };

      console.log(amateurOrderObj);
      if (isAddMode) {
        const result = await request.post('amateurOrders/add', amateurOrderObj);
        if (result) {
          message.success('Amateur Order Added Successfully !');
          form.resetFields();
          navigate(`/amateurOrder`);
        }
      } else {
        const result = await request.put(`amateurOrders/${order._id}`, amateurOrderObj);
        if (result) {
          message.success('Amateur Order Updated Successfully !');
          navigate(`/amateurOrder`);
        }
      }
    } catch (e) {
      console.log('Error in post request of Amateur Order', e);
    }
  };

  const updateOrder = async (values) => {
    try {
      const amateurOrderObj = {
        ...values,
        photos: photo,
        items: item,
        total: total
      };

      const res = await request.patch(`amateurOrders/${order?._id}`, amateurOrderObj);

      console.log(amateurOrderObj);

      if (res.status === 200) {
        message.success('Amateur Order Updated!');
        navigate(`/amateurOrder`);
      }
    } catch (e) {
      console.log('error updating data', e);
    }
  };

  const onReset = () => {
    form.resetFields();
    console.log('reset');
  };

  return (
    <center>
      <MainLayout>
        <h1 className="header-edit-add">
          {isAddMode ? 'Add Amateur Order' : 'Edit Amateur Order'}
        </h1>

        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={isAddMode ? onFinish : updateOrder}
          validateMessages={validateMessages}
          key={order?._id}>
          <fieldset className="fieldset">
            <br />
            <br />
            <Form.Item
              name={['customer']}
              label="Name"
              rules={[
                {
                  required: true
                }
              ]}
              initialValue={!isAddMode ? order?.customer : ''}>
              <Input placeholder="John Smith" />
            </Form.Item>
            <Form.Item
              name={['address']}
              label="Address"
              rules={[
                {
                  required: true
                }
              ]}
              initialValue={!isAddMode ? order?.address : ''}>
              <Input placeholder="003,Colombo" />
            </Form.Item>
            <Form.Item
              name={['mobile']}
              label="Contact Number"
              rules={[
                {
                  required: true,
                  min: 10,
                  max: 10
                }
              ]}
              initialValue={!isAddMode ? order?.mobile : ''}>
              <Input placeholder="0767896523" />
            </Form.Item>
            <Form.Item name={['note']} label="Notes" initialValue={!isAddMode ? order?.note : ''}>
              <Input.TextArea placeholder="Any Special Considerations(Optional)" />
            </Form.Item>
          </fieldset>
          <br />
          <br />
          <fieldset className="fieldset">
            <div className="amateurOrderTable">
              <center>
                <div className="photodiv">
                  <h2 className="orderHeader">Photo</h2>
                  <Form.Item
                    labelCol={{ ...layout.labelCol, span: 8 }}
                    name={['orderType']}
                    label="Order Type"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={photo?.orderType}>
                    <Radio.Group
                      onChange={(value) => setPhoto({ ...photo, orderType: value.target.value })}>
                      <Radio.Button value="Copy Out">Copy Out</Radio.Button>
                      <Radio.Button value="Media">Media</Radio.Button>
                      <Radio.Button value="Expert">Expert</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    labelCol={{ ...layout.labelCol, span: 8 }}
                    name={['photoSize']}
                    label="Photo Size"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={photo?.photoSize}>
                    <Select
                      onChange={(value) => setPhoto({ ...photo, photoSize: value })}
                      className="dropdown"
                      placeholder="2*2 inches (51*51 mm)"
                      style={{
                        width: 230
                      }}
                      allowClear>
                      <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                      <Option value="3,5*5 inches (89*127 mm)">3,5*5 inches (89*127 mm)</Option>
                      <Option value="4*6 inches (102*152 mm)">4*6 inches (102*152 mm)</Option>
                      <Option value="5*7 inches (127*178 mm)">5*7 inches (127*178 mm)</Option>
                      <Option value="6*8,5 inches (152*216 mm)">6*8,5 inches (152*216 mm)</Option>
                      <Option value="7*9,5 inches (180*240 mm)">7*9,5 inches (180*240 mm)</Option>
                      <Option value="7,8*9,8 inches (200*250 mm)">
                        7,8*9,8 inches (200*250 mm)
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    labelCol={{ ...layout.labelCol, span: 8 }}
                    name={['copies']}
                    label="Copies"
                    rules={[
                      {
                        required: true,
                        type: 'number'
                      }
                    ]}
                    initialValue={photo?.copies}>
                    <InputNumber
                      onChange={(value) => setPhoto({ ...photo, copies: value })}
                      placeholder="0"
                      style={{
                        width: 230
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    labelCol={{ ...layout.labelCol, span: 8 }}
                    name={['printPrice']}
                    label="Print Price"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={photo?.printPrice}>
                    <Input
                      onChange={(value) => setPhoto({ ...photo, printPrice: value.target.value })}
                      placeholder="Rs 0.00"
                      style={{
                        width: 230
                      }}
                      addonAfter={<Typography.Text>LKR</Typography.Text>}
                    />
                  </Form.Item>

                  <table>
                    <tr>
                      <td className="checkboxes">
                        <Form.Item
                          valuePropName="checked"
                          name={['frame']}
                          initialValue={photo?.frame}>
                          <Checkbox
                            onChange={(value) =>
                              setPhoto({ ...photo, frame: value.target.checked })
                            }>
                            Add Frame
                          </Checkbox>
                        </Form.Item>
                      </td>
                      <td className="checkboxes2">
                        <Form.Item
                          valuePropName="checked"
                          name={['laminate']}
                          initialValue={photo?.laminate}>
                          <Checkbox
                            onChange={(value) =>
                              setPhoto({ ...photo, laminate: value.target.checked })
                            }>
                            Laminate
                          </Checkbox>
                        </Form.Item>
                      </td>
                    </tr>
                  </table>
                  <br />
                </div>
              </center>
              <Divider type="vertical" className="verticalDivider" />
              <Divider type="horizontal" className="horizontalDivider" />
              <center>
                <div className="itemdiv">
                  <h2 className="orderHeader">Item</h2>
                  <Form.Item
                    name={['item']}
                    label="Item"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={item?.item}>
                    <Select
                      onChange={(value) => setItem({ ...item, item: value })}
                      className="dropdown"
                      placeholder="3D Collage"
                      style={{
                        width: 230
                      }}
                      allowClear>
                      <Option value="3D Collage">3D Collage</Option>
                      <Option value="Clock Print">Clock Print</Option>
                      <Option value="Crystal Print">Crystal Print</Option>
                      <Option value="Printed Mug">Printed Mug</Option>
                      <Option value="Rock Printing">Rock Printing</Option>
                      <Option value="Key-tag Prints">Key-tag Prints</Option>
                      <Option value="Printed Calenders">Printed Calenders</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={['amount']}
                    label="Amount"
                    rules={[
                      {
                        type: 'number',
                        required: true,
                        min: 0,
                        max: 99
                      }
                    ]}
                    initialValue={item?.amount}>
                    <InputNumber
                      onChange={(value) => setItem({ ...item, amount: value })}
                      placeholder="0"
                      style={{
                        width: 230
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['itemPrice']}
                    label="Item Price"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={item?.itemPrice}>
                    <Input
                      onChange={(value) => setItem({ ...item, itemPrice: value.target.value })}
                      placeholder="Rs 0.00"
                      style={{
                        width: 230
                      }}
                      addonAfter={<Typography.Text>LKR</Typography.Text>}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['itemPrintPrice']}
                    label="Print Price"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={item?.itemPrintPrice}>
                    <Input
                      onChange={(value) => setItem({ ...item, itemPrintPrice: value.target.value })}
                      placeholder="Rs 0.00"
                      style={{
                        width: 230
                      }}
                      addonAfter={<Typography.Text>LKR</Typography.Text>}
                    />
                  </Form.Item>
                  <br />
                  <br />
                  <br />
                </div>
              </center>
            </div>
          </fieldset>
          <br />
          <br />
          <div className="paydiv">
            <Form.Item
              labelCol={{ ...layout.labelCol, span: 10 }}
              wrapperCol={{ ...layout.wrapperCol, span: 4 }}
              name={['total']}
              label="Total Price"
              initialValue={total}>
              <InputNumber
                id="total"
                disabled
                addonAfter={<Typography.Text>LKR</Typography.Text>}
                placeholder=" 0.00"
                style={{
                  width: '200px'
                }}
              />
            </Form.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Form.Item
              label="Payment"
              name={['payment']}
              required
              labelCol={{ ...layout.labelCol, span: 10 }}
              wrapperCol={{ ...layout.wrapperCol, span: 4 }}>
              <InputNumber
                min={0}
                controls={false}
                style={{ width: '200px' }}
                placeholder="0"
                disabled={!isAddMode}
                addonAfter={<Typography.Text>LKR</Typography.Text>}
                onChange={(value) => setPayment(value)}
              />
            </Form.Item>
          </div>
          <br />

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <div className="buttonGrp">
              <div className="actionButton">
                <Button type="primary" htmlType="submit">
                  {isAddMode ? 'Submit' : 'Update'}
                </Button>
              </div>

              <div className="actionButton">
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>

        <br />
        <br />
      </MainLayout>
    </center>
  );
};

export default AddAmateurOrder;
