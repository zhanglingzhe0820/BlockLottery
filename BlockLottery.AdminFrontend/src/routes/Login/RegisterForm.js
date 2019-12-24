import React from 'react'
import {Form, Input, message} from 'antd'
import {calculateWidth} from '../../utils/utils'
import PromptBox from '../../components/PromptBox'
import {api} from '../../services/api/ApiProvider'

@Form.create()
class RegisterForm extends React.Component {
    state = {
        focusItem: -1
    }

    registerSubmit = async (e) => {
        e.preventDefault()
        this.setState({
            focusItem: -1
        })
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    let res = await api.accountService.register(
                        {
                            username: values.registerUsername,
                            password: values.registerPassword
                        }
                    )
                    localStorage.setItem('token', res.token)
                    message.success('注册成功')
                    this.gobackLogin()
                } catch (e) {
                    message.error('用户名已存在')
                }
            }
        })
    }

    gobackLogin = () => {
        this.props.switchShowBox('login')
        setTimeout(() => this.props.form.resetFields(), 500)
    }

    render() {
        const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form
        const {focusItem} = this.state
        return (
            <div className={this.props.className}>
                <h3 className='title'>用户注册</h3>
                <Form onSubmit={this.registerSubmit}>
                    <Form.Item
                        help={getFieldError('registerUsername') && <PromptBox info={getFieldError('registerUsername')}
                                                                              width={calculateWidth(getFieldError('registerUsername'))}/>}>
                        {getFieldDecorator('registerUsername', {
                            validateFirst: true,
                            rules: [
                                {required: true, message: '用户名不能为空'},
                                {pattern: '^[^ ]+$', message: '不能输入空格'},
                            ]
                        })(
                            <Input
                                onFocus={() => this.setState({focusItem: 0})}
                                onBlur={() => this.setState({focusItem: -1})}
                                maxLength={16}
                                placeholder='用户名'
                                addonBefore={<span className='iconfont icon-User'
                                                   style={focusItem === 0 ? styles.focus : {}}/>}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        help={getFieldError('registerPassword') && <PromptBox info={getFieldError('registerPassword')}
                                                                              width={calculateWidth(getFieldError('registerPassword'))}/>}>
                        {getFieldDecorator('registerPassword', {
                            validateFirst: true,
                            rules: [
                                {required: true, message: '密码不能为空'},
                                {pattern: '^[^ ]+$', message: '密码不能有空格'}
                            ]
                        })(
                            <Input
                                onFocus={() => this.setState({focusItem: 1})}
                                onBlur={() => this.setState({focusItem: -1})}
                                type='password'
                                maxLength={16}
                                placeholder='密码'
                                addonBefore={<span className='iconfont icon-suo1'
                                                   style={focusItem === 1 ? styles.focus : {}}/>}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        help={getFieldError('confirmPassword') && <PromptBox info={getFieldError('confirmPassword')}
                                                                             width={calculateWidth(getFieldError('confirmPassword'))}/>}>
                        {getFieldDecorator('confirmPassword', {
                            validateFirst: true,
                            rules: [
                                {required: true, message: '请确认密码'},
                                {
                                    validator: (rule, value, callback) => {
                                        if (value && value !== getFieldValue('registerPassword')) {
                                            callback('两次输入不一致！')
                                        }
                                        callback()
                                    }
                                },
                            ]
                        })(
                            <Input
                                onFocus={() => this.setState({focusItem: 2})}
                                onBlur={() => this.setState({focusItem: -1})}
                                type='password'
                                maxLength={16}
                                placeholder='确认密码'
                                addonBefore={<span className='iconfont icon-suo1'
                                                   style={focusItem === 2 ? styles.focus : {}}/>}/>
                        )}
                    </Form.Item>
                    <div className='bottom'>
                        <input className='loginBtn' type="submit" value='注册'/>
                        <span className='registerBtn' onClick={this.gobackLogin}>返回登录</span>
                    </div>
                </Form>
                <div className='footer'>
                    <div>欢迎登陆源链科技抽奖平台</div>
                </div>
            </div>
        )
    }
}

const styles = {
    focus: {
        width: '20px',
        opacity: 1
    },
}

export default RegisterForm
