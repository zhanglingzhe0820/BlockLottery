import React from 'react'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import TypingCard from "../../../components/TypingCard";
import {Card, Divider, Icon, Table} from "antd";
import {Link} from "react-router-dom";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <Link to={'/home/event/detail/' + text}>{text}</Link>,
    }, {
        title: '活动名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '总奖数',
        dataIndex: 'rewardNum',
        key: 'rewardNum',
    }, {
        title: '获奖人数',
        dataIndex: 'peopleNum',
        key: 'peopleNum',
    }];

class ListPage extends React.Component {
    state = {
        loading: false,
        pagination: {
            pageSize: 8
        },
        data: [
            {
                id: '1',
                name: '2020年会活动',
                rewardNum: 14,
                peopleNum: 12,
            }, {
                id: '2',
                name: '2019年会活动',
                rewardNum: 14,
                peopleNum: 14,
            }, {
                id: '3',
                name: '2018年会活动',
                rewardNum: 14,
                peopleNum: 10,
            }],
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['活动', '列表']}/>
                <TypingCard title={"友情提示"} source={"这里展示你开展过的所有活动<br/>点击列表中的活动以查看获奖结果"}/>
                <Card bordered={false} title='活动列表' style={{marginBottom: 10, minHeight: 440}}>
                    <Table loading={this.state.loading}
                           dataSource={this.state.data}
                           pagination={this.state.pagination}
                           onChange={this.handleTableChange}
                           columns={columns} style={styles.tableStyle}/>
                </Card>
            </div>
        )
    }
}

const styles = {
    tableStyle: {
        width: '100%'
    }
}

export default ListPage
