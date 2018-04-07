import React, { Component } from 'react'
import { Form, Input, Icon,Button,Select,Switch,Radio,Checkbox,DatePicker,InputNumber,Timeline,Steps,Upload } from 'antd'; 
import { PurpleButton }   from 'components/Button.js'    
import './1.less';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;
const Step = Steps.Step;

const fileList = [];

class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          nameRequired:true,
          passwordRequired:true,
      };
      let s = "𠮷";
      console.log();
    }

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const rangeValue = fieldsValue['range-picker']; 
          const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'), 
            'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')], 
          };

          console.log('Received values of form: ', values);
        }
        });
    }

     
  //失去焦点的时候判断输入的商家编码是否存在
  blurBusiness = (rule, value, callback) => {   
    
    if (value  === "1") {
        callback('商家编码不存在！');
    } else {
        callback();
    }
  }


  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('upassword')) {
      callback('您输入的两个密码不一致！');
    } else {
      callback();
    }
  }

  
 
  render() { 
    const { getFieldDecorator } = this.props.form;  
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };  
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const props2 = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      multiple: true,
      defaultFileList: [...fileList],
      className: 'upload-list-inline',
    };
    return <Form onSubmit={this.handleSubmit}>
      <Form.Item  label="商家编码"
                  {...formItemLayout} hasFeedback> 
          {getFieldDecorator('ucode', { 
              initialValue:'11123' || '', 
              validateTrigger:['onBlur'], 
              rules: [  
                {
                required: true, 
                message: '请输入商家编码！',
                }, 
                {validator: this.blurBusiness,}  
              ],
          })(
            <Input 
              placeholder="请输入商家编码"
              prefix={<i className="iconfont icon-bianmaguanli"></i>}   
                
            />
          )}
      </Form.Item> 
    
      <Form.Item label="密码"
                {...formItemLayout}   hasFeedback>
          {getFieldDecorator('upassword', { 
            initialValue:'' || '',
            rules: [  
              {
              required: true, 
              message: '请输入密码！',
              },  
            ],
          })(
            <Input 
              placeholder="请输入登录密码"
              type="password"
              prefix={<i className="iconfont icon-login_mima"></i>}
              
            />
          )}
          
      </Form.Item> 
      <Form.Item
        {...formItemLayout}
        label="确认密码"
        hasFeedback
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请确认密码！',
          }, {
            validator: this.checkPassword,
          }],
        })(
          <Input type="password" onBlur={this.handleConfirmBlur} />
        )}
      </Form.Item>
      <Form.Item
        label="下拉框"
        {...formItemLayout}  
        hasFeedback
      >
        {getFieldDecorator('gender', {
          initialValue:'1' || '',
          rules: [{ required: true, message: '请选择!!!' }],
        })(
          <Select
            placeholder="选择一个选项"  
          >
            <Select.Option  value="1">绿萝</Select.Option>
            <Select.Option value="2">菠萝</Select.Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="开关"
      >
        {getFieldDecorator('switch',{ initialValue:'true' || '',})(
          <Switch checkedChildren="是"  defaultChecked={true} unCheckedChildren="否" />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="单选"
      >
        {getFieldDecorator('radio-group', {rules: [{ required: true, message: '请选择一个!!!' }],})(
          <RadioGroup>
            <Radio value="a">item 1</Radio>
            <Radio value="b">item 2</Radio>
            <Radio value="c">item 3</Radio>
          </RadioGroup>
        )}
      </Form.Item>  
      <Form.Item
        {...formItemLayout}
        label="多选框"
      >
      {getFieldDecorator('check-group', {initialValue:['Apple'] || '',rules: [{ required: true, message: '请选择一个!!!' }],})(
        <CheckboxGroup options={plainOptions}   />
      )}
      </Form.Item>  
      <Form.Item
        {...formItemLayout}
        label="日期选择器"
      >
        {getFieldDecorator('date-picker', {rules: [{ type: 'object', required: true, message: '请选择时间!' }],})(
          <DatePicker />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="范围选择器"
      >
        {getFieldDecorator('range-picker', { rules: [{ type: 'array', required: true, message: '请选择时间！' }],})(
          <RangePicker />
        )}
      </Form.Item> 
    
      <Form.Item
        {...formItemLayout}
        label="数字输入框"
      >
        {getFieldDecorator('input-number', { initialValue: 3 })(
          <InputNumber min={1} max={10} />
        )}
        <span className="ant-form-text"></span>
      </Form.Item>
        
      <Form.Item  {...formItemLayout}>
        <Steps>
          <Step status="finish" title="Login" icon={<Icon type="user" />} />
          <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
          <Step status="finish" title="Pay" icon={<Icon type="credit-card" />} />
          <Step status="finish" title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
      </Form.Item>
      <Form.Item>
        <Upload {...props2}>
          <Button>
            <Icon type="upload" /> upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item 
        {...formItemLayout} >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
          
      </Form.Item> 
        
    </Form>
              
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;