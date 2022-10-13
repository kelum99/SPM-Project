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
        // console.log('Order ', result.data);
      }
    } catch (e) {
      console.log('Error in retreiving amateur order');
    }
  };

  useEffect(() => {
    if (!isAddMode && id) {
      fetchAmateurOrder(id);
    }
    var tot = 0;

    if (item.amount && item.itemPrice && item.itemPrintPrice && photo.copies && photo.printPrice) {
      tot =
        photo.copies * photo.printPrice +
        parseFloat(item.amount * (parseFloat(item.itemPrintPrice) + parseFloat(item.itemPrice)));
    } else {
      tot = 0;
    }
    console.log(tot);
    setTotal(tot);
    document.getElementById('total').value = total;
  }, [photo, item, total]);

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
        ...values.user,
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

  const onReset = () => {
    form.resetFields();
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
          onFinish={onFinish}
          validateMessages={validateMessages}
          key={order?._id}>
          <fieldset className="fieldset">
            <br />
            <br />
            <Form.Item
              name={['user', 'customer']}
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
              name={['user', 'address']}
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
              name={['user', 'mobile']}
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
            <Form.Item
              name={['user', 'note']}
              label="Notes"
              initialValue={!isAddMode ? order?.note : ''}>
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
                    name={['user', 'orderType']}
                    label="Order Type"
                    rules={[
                      {
                        required: true
                      }
                    ]}>
                    <Radio.Group
                      defaultValue={!isAddMode ? order?.photos[0].orderType : ''}
                      onChange={(value) => setPhoto({ ...photo, orderType: value.target.value })}>
                      <Radio.Button value="Copy Out">Copy Out</Radio.Button>
                      <Radio.Button value="Media">Media</Radio.Button>
                      <Radio.Button value="Expert">Expert</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    labelCol={{ ...layout.labelCol, span: 8 }}
                    name={['user', 'photoSize']}
                    label="Photo Size"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={!isAddMode ? order?.photos[0].photoSize : ''}>
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
                    name={['user', 'copies']}
                    label="Copies"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={!isAddMode ? order?.photos[0].copies : ''}>
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
                    name={['user', 'printPrice']}
                    label="Print Price"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={!isAddMode ? order?.photos[0].printPrice : ''}>
                    <Input
                      onChange={(value) => setPhoto({ ...photo, printPrice: value.target.value })}
                      placeholder="Rs 0.00"
                      style={{
                        width: 230
                      }}
                    />
                  </Form.Item>

                  <table>
                    <tr>
                      <td className="checkboxes">
                        <Form.Item
                          valuePropName="checked"
                          name={['user', 'frame']}
                          initialValue={!isAddMode ? order?.photos[0].frame : ''}>
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
                          name={['user', 'laminate']}
                          initialValue={!isAddMode ? order?.photos[0].laminate : ''}>
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
                    name={['user', 'item']}
                    label="Item"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={!isAddMode ? order?.items[0].item : ''}>
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
                    name={['user', 'amount']}
                    label="Amount"
                    rules={[
                      {
                        type: 'number',
                        required: true,
                        min: 0,
                        max: 99
                      }
                    ]}
                    initialValue={!isAddMode ? order?.items[0].amount : ''}>
                    <InputNumber
                      onChange={(value) => setItem({ ...item, amount: value })}
                      placeholder="0"
                      style={{
                        width: 230
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'itemPrice']}
                    label="Item Price"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={!isAddMode ? order?.items[0].itemPrice : ''}>
                    <Input
                      onChange={(value) => setItem({ ...item, itemPrice: value.target.value })}
                      placeholder="Rs 0.00"
                      style={{
                        width: 230
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'itemPrintPrice']}
                    label="Print Price"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    initialValue={!isAddMode ? order?.items[0].itemPrintPrice : ''}>
                    <Input
                      onChange={(value) => setItem({ ...item, itemPrintPrice: value.target.value })}
                      placeholder="Rs 0.00"
                      style={{
                        width: 230
                      }}
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
              name={['user', 'total']}
              label="Total Price"
              initialValue={!isAddMode ? order?.total : total}>
              <Input
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
              name={['user', 'payment']}
              required
              labelCol={{ ...layout.labelCol, span: 10 }}
              wrapperCol={{ ...layout.wrapperCol, span: 4 }}>
              <InputNumber
                min={0}
                controls={false}
                style={{ width: '200px' }}
                placeholder="0"
                addonAfter={<Typography.Text>LKR</Typography.Text>}
                onChange={(value) => setPayment(value)}
              />
            </Form.Item>
          </div>
          <br />

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>

        <br />
        <br />
      </MainLayout>
    </center>
  );
};

export default AddAmateurOrder;
