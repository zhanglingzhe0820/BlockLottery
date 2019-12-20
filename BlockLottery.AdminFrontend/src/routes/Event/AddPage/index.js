import React from 'react'
import {Card, Form, Checkbox, Input, Button, Col, Row, message, BackTop} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'

const FormItem = Form.Item

@Form.create()
class AddPage extends React.Component {
    state = {
        disabled: false,
        rewardCount: 1,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                message.success('提交成功')
                // console.log(values)
            }
        });
    };
    addField = (e) => {
        let count = this.state.rewardCount + 1;
        this.setState(
            {rewardCount: count}
        )
    }

    getFields() {
        const count = this.state.rewardCount;

        const {getFieldDecorator} = this.props.form;
        const children = [];
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        for (let i = 0; i < 5; i++) {
            children.push(
                <div>
                    <Row gutter={24}>
                        <Col span={12} key={i} style={{display: i < count ? 'block' : 'none'}}>
                            <FormItem label='奖项名称' {...formItemLayout}>
                                {
                                    getFieldDecorator(`rewardLevel-${i}`, {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请填写奖项名称'
                                            }
                                        ]
                                    })(
                                        <Input/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={i} style={{display: i < count ? 'block' : 'none'}}>
                            <FormItem label='奖品名称' {...formItemLayout}>
                                {
                                    getFieldDecorator(`rewardName-${i}`, {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请填写奖品名称'
                                            }
                                        ]
                                    })(
                                        <Input/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{textAlign: 'center'}}>
                        <Col span={12} key={i} style={{display: i < count ? 'block' : 'none'}}>
                            <FormItem label='奖品数量' {...formItemLayout}>
                                {
                                    getFieldDecorator(`rewardNum-${i}`, {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请填写奖品数量'
                                            }
                                        ]
                                    })(
                                        <Input type="number"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={i} style={{display: i < count ? 'block' : 'none'}}>
                            <FormItem label='每轮数量' {...formItemLayout}>
                                {
                                    getFieldDecorator(`timeCount-${i}`, {
                                        rules: [
                                            {
                                                required: true,
                                                message: '每轮抽几个奖品'
                                            }
                                        ]
                                    })(
                                        <Input type="number"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                </div>,
            );
        }
        return children;
    }

    componentWillUnmount() {
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const cardContent = '新增后数据将上链无法修改活动内容，请谨慎输入~';
        return (
            <div>
                <CustomBreadcrumb arr={['活动', '新增']}/>
                <TypingCard title={"友情提示"} source={cardContent}/>
                <Card bordered={false} title='新增活动'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto', textAlign: 'center'}}
                          onSubmit={this.handleSubmit}>
                        <FormItem style={{textAlign: 'center'}} label='活动名称' {...formItemLayout}>
                            {
                                getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写活动名称'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <div style={{textAlign: 'center'}}>{this.getFields()}</div>
                        <Button style={{width: '92%', marginBottom: '20px'}} icon="plus" onClick={this.addField}
                                block>新增奖项</Button>
                        <FormItem style={{textAlign: 'center'}}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>我已阅读并同意<a>协议</a></Checkbox>
                            )}
                        </FormItem>
                        <FormItem style={{textAlign: 'center'}}>
                            <Button type="primary" htmlType="submit" disabled={!getFieldValue('agreement')}>提交</Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default AddPage
