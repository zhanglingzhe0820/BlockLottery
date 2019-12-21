import React from 'react'
import {Card, Col, Row, BackTop, Button, Table} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import {Link} from "react-router-dom";

const columns = [
    {
        title: '抽奖号码',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '参与者姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '参与者电话',
        dataIndex: 'phone',
        key: 'phone',
    }, {
        title: '参与抽奖时间',
        dataIndex: 'time',
        key: 'time',
    }, {
        title: '抽奖状态',
        dataIndex: 'status',
        key: 'status',
    }];

class DetailPage extends React.Component {
    state = {
        name: "2020年会",
        rewards: [
            {
                level: "一等奖",
                name: "ipad Mini",
                num: 2,
                count: 1
            },
            {
                level: "二等奖",
                name: "香水",
                num: 5,
                count: 5
            },
            {
                level: "三等奖",
                name: "口红",
                num: 7,
                count: 7
            },
        ],
        qrcode: "https://test-1255617399.cos.ap-beijing.myqcloud.com/qrcode.jpg",
        loading: false,
        result: [
            {
                id: "001",
                name: "张林",
                phone: "18851822162",
                time: new Date().getTime(),
                status: "暂未中奖",
            },
            {
                id: "002",
                name: "张林折",
                phone: "13700000001",
                time: new Date().getTime(),
                status: "二等奖",
            }
        ]
    };

    getRewardInfo() {
        let rewardElements = [];
        for (let i = 0; i < this.state.rewards.length; i++) {
            let reward = this.state.rewards[i];
            rewardElements = rewardElements.concat(
                <div style={{marginBottom: '20px'}}>
                    <span>奖项名称：</span>
                    <span>{reward.level}</span>
                    <div>
                        <span style={{marginRight: '30px'}}>
                            <span>奖品名称：</span>
                            <span>{reward.name}</span>
                        </span>
                        <span style={{marginRight: '30px'}}>
                            <span>奖品数量：</span>
                            <span>{reward.num}</span>
                        </span>
                        <span style={{marginRight: '30px'}}>
                            <span>每次抽几人：</span>
                            <span>{reward.count}</span>
                        </span>
                    </div>
                </div>
            )
        }
        return rewardElements;
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['活动', '详情']}/>
                <Card bordered={false} className='card-item' title={"活动详情"}
                      extra={<Button type={"primary"}>前往抽奖</Button>}>
                    <span>活动名：</span>
                    <span>{this.state.name}</span>
                </Card>
                <Card bordered={false} className='card-item' title='奖项信息'>
                    <div style={{display: "inline-block"}}>
                        {this.getRewardInfo()}
                    </div>
                    <div style={{display: "inline-block", float: 'right'}}>
                        <div>
                            抽奖二维码：
                        </div>
                        <img width={250} src={this.state.qrcode}/>
                    </div>
                </Card>
                <Card bordered={false} className='card-item' title={"中奖结果"}>
                    <Table loading={this.state.loading}
                           dataSource={this.state.result}
                           pagination={this.state.pagination}
                           onChange={this.handleTableChange}
                           columns={columns} style={styles.tableStyle}/>
                </Card>
            </div>
        )
    }
}

const styles = {
    colItem: {
        minHeight: 500,
        borderRadius: 3,
        margin: '10px 0'
    },
    customPanelStyle: {
        background: '#f7f7f7',
        borderRadius: 4,
        marginBottom: 24,
        border: 0,
        overflow: 'hidden'
    }
}

export default DetailPage
