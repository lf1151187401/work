import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                //valuse 里有user pwd
                let { username, password } = values
                let res = await this.$http("post", "/api/login", {
                    user: username,
                    pwd: password
                })
                console.log(res, "res");
                if (res.data.code === 0) {
                    alert(res.data.msg)
                    localStorage.setItem("token", res.data.token)
                    this.props.history.push({ pathname: "/home" })
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="My_Login">
                <div className="Login-main">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>

        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm