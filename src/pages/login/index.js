import { Card, Checkbox, Form, Input, Button, message } from "antd"
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store/index'
import { useNavigate } from "react-router-dom"
function Login () {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async (values) => {
    console.log('Success:', values)
    try {
      await loginStore.login({ mobile: values.username, code: values.password })
      message.success('登录成功')
      navigate('/')
    } catch (error) {
      message.error(error.message || '登陆失败')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 400,
          }}
          initialValues={{
            username: '13811111111',
            password: '246810',
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 50,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        {/* 登录表单 */}
      </Card>

    </div>
  )
}

export default Login