import React from 'react'
import {Icon, Badge, Dropdown, Menu, Modal} from 'antd'
import screenfull from 'screenfull'
import {inject, observer} from 'mobx-react'
import {Link, withRouter} from 'react-router-dom'

//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter
class HeaderBar extends React.Component {
    state = {
        icon: 'arrows-alt',
        count: 100,
        visible: false,
        avatar: require('./img/04.jpg')
    }

    componentDidMount() {
        screenfull.onchange(() => {
            this.setState({
                icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
            })
        })
    }

    componentWillUnmount() {
        screenfull.off('change')
    }

    toggle = () => {
        this.props.onToggle()
    }
    screenfullToggle = () => {
        if (screenfull.enabled) {
            screenfull.toggle()
        }
    }
    logout = () => {
        localStorage.setItem("token", "")
        this.props.history.push('/login')
    }

    render() {
        const {icon, visible, avatar} = this.state
        const {collapsed, location} = this.props
        const notLogin = (
            <div>
                <Link to={{pathname: '/login', state: {from: location}}}
                      style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
                <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
            </div>
        )
        const menu = (
            <Menu className='menu'>
                <Menu.Item><Link to={"/home/event/list"}>我的活动</Link></Menu.Item>
                <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
            </Menu>
        )
        const login = (
            <Dropdown overlay={menu}>
                <img onClick={() => this.setState({visible: true})} src={avatar} alt=""/>
            </Dropdown>
        )
        return (
            <div id='headerbar'>
                <Icon
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    className='trigger'
                    onClick={this.toggle}/>
                <div style={{lineHeight: '64px', float: 'right'}}>
                    <ul className='header-ul'>
                        {/*<li onClick={() => this.setState({count: 0})}>*/}
                        {/*    <Badge count={appStore.isLogin ? count : 0} overflowCount={99} style={{marginRight: -17}}>*/}
                        {/*        <Icon type="notification"/>*/}
                        {/*    </Badge>*/}
                        {/*</li>*/}
                        <li><Icon style={{marginRight: -100}} type={icon} onClick={this.screenfullToggle}/></li>
                        <li>
                            {!localStorage.getItem("token") || localStorage.getItem("token").length <= 0 ? notLogin : login}
                        </li>
                    </ul>
                </div>
                <Modal
                    footer={null} closable={false}
                    visible={visible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible: false})}>
                    <img src={avatar} alt="" width='100%'/>
                </Modal>
            </div>
        )
    }
}

export default HeaderBar
