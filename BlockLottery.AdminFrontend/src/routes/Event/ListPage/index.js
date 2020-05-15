import React from 'react'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import TypingCard from "../../../components/TypingCard";
import {Card, Table} from "antd";
import {Link} from "react-router-dom";
import {api} from '../../../services/api/ApiProvider'

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
        dataIndex: 'numOfRewards',
        key: 'numOfRewards',
    }, {
        title: '获奖人数',
        dataIndex: 'numOfWinner',
        key: 'numOfWinner',
    }];

class ListPage extends React.Component {
    state = {
        loading: false,
        pagination: {
            pageSize: 8
        },
        data: [],
    }

    componentDidMount = async () => {
        try {
            let res = await api.eventService.loadEvents()
            this.setState({
                data: res.eventItems
            })
        } catch (e) {
            console.log(e)
        }
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
