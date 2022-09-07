import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Button, Form, Input, Divider, Select, Radio, Checkbox, InputNumber } from 'antd';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const AddAmateurOrder = () => {
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

  const { Option } = Select;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <center>
      <MainLayout title="Add Amateur Order">
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}>
          <fieldset className="fieldset">
            <br />
            <br />
            <Form.Item
              name={['user', 'name']}
              label="Name"
              rules={[
                {
                  required: true
                }
              ]}>
              <Input placeholder="John Smith" />
            </Form.Item>
            <Form.Item
              name={['user', 'address']}
              label="Address"
              rules={[
                {
                  required: true
                }
              ]}>
              <Input placeholder="003,Colombo" />
            </Form.Item>
            <Form.Item
              name={['user', 'mobile']}
              label="Contact Number"
              rules={[
                {
                  required: true
                }
              ]}>
              <Input placeholder="0767896523" />
            </Form.Item>
            <Form.Item name={['user', 'notes']} label="Notes">
              <Input.TextArea placeholder="Any Special Considerations(Optional)" />
            </Form.Item>
          </fieldset>
          <br />
          <br />
          <fieldset className="fieldset">
            <table className="amateurOrderTable">
              <tr>
                <td>
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
                        <Radio.Group>
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
                        ]}>
                        <Select
                          className="dropdown"
                          placeholder="2*2 inches (51*51 mm)"
                          //   defaultValue="Photo Size"
                          style={{
                            width: 230
                          }}
                          allowClear>
                          <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                          <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                          <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                          <Option value="2*2 inches (51*51 mm)">2*2 inches (51*51 mm)</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        labelCol={{ ...layout.labelCol, span: 8 }}
                        name={['user', 'printPrice']}
                        label="Print Price"
                        rules={[
                          {
                            required: true
                          }
                        ]}>
                        <Input
                          placeholder="Rs 0.00"
                          style={{
                            width: 230
                          }}
                        />
                      </Form.Item>

                      <table>
                        <tr>
                          <td className="checkboxes">
                            <Form.Item valuePropName="checked" name={['user', 'frame']}>
                              <Checkbox>Add Frame</Checkbox>
                            </Form.Item>
                          </td>
                          <td className="checkboxes2">
                            <Form.Item valuePropName="checked" name={['user', 'laminate']}>
                              <Checkbox>Laminate</Checkbox>
                            </Form.Item>
                          </td>
                        </tr>
                      </table>
                      <br />
                      <br />
                      <br />
                    </div>
                  </center>
                </td>
                <Divider type="vertical" className="verticalDivider" />
                <td>
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
                        ]}>
                        <Select
                          className="dropdown"
                          placeholder="3D Collage"
                          //   defaultValue="Select Item"
                          style={{
                            width: 230
                          }}
                          allowClear>
                          <Option value="2*2 inches (51*51 mm)">3D Collage</Option>
                          <Option value="2*2 inches (51*51 mm)">Clock Print</Option>
                          <Option value="2*2 inches (51*51 mm)">Crystal Print</Option>
                          <Option value="2*2 inches (51*51 mm)">Printed Mug</Option>
                          <Option value="2*2 inches (51*51 mm)">Rock Printing</Option>
                          <Option value="2*2 inches (51*51 mm)">Key-tag Prints</Option>
                          <Option value="2*2 inches (51*51 mm)">Printed Calenders</Option>
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
                        ]}>
                        <InputNumber
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
                        ]}>
                        <Input
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
                        ]}>
                        <Input
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
                </td>
              </tr>
            </table>
          </fieldset>
          <br />
          <br />
          <Form.Item
            labelCol={{ ...layout.labelCol, span: 10 }}
            wrapperCol={{ ...layout.wrapperCol, span: 4 }}
            name={['user', 'totalPrice']}
            label="Total Price"
            rules={[
              {
                required: true
              }
            ]}>
            <Input
              placeholder="Rs 0.00"
              style={{
                width: 230
              }}
            />
          </Form.Item>
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
