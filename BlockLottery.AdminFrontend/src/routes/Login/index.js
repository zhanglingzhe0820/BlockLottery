import React from 'react'
import BGParticle from '../../utils/BGParticle'
import {notification} from 'antd'
import './style.css'
import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react/index'
import Loading2 from '../../components/Loading2'
import {preloadingImages} from '../../utils/utils'
import 'animate.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const url = 'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true'

@withRouter
class Login extends React.Component {
    state = {
        showBox: 'login',   //展示当前表单
        url: '',  //背景图片
        loading: false,
        loading2: false,
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const isLogin = localStorage.getItem('token') && localStorage.getItem('token').length > 0;
        if (isLogin) {
            this.props.history.push('/home')
        }
    }

    componentWillUnmount() {
        this.initPage()
        this.particle && this.particle.destory()
        notification.destroy()
    }

    //载入页面时的一些处理
    initPage = () => {
        this.setState({
            loading: true
        })
        this.loadImageAsync(url).then(url => {
            this.setState({
                loading: false,
                url
            })
        }).then(() => {
            //为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到setState执行完成后才去获取dom
            this.particle = new BGParticle('backgroundBox')
            this.particle.init()
        })
    }
    //切换showbox
    switchShowBox = (box) => {
        this.setState({
            showBox: box
        })
    }

    //登录的背景图太大，等载入完后再显示，实际上是图片预加载，
    loadImageAsync(url) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = function () {
                resolve(url);
            };
            image.onerror = function () {
                console.log('图片载入错误')
            };
            image.src = url;
        });
    }

    render() {
        const {showBox, loading} = this.state
        return (
            <div id='login-page'>
                {
                    loading ?
                        <div>
                            <h3 style={styles.loadingTitle} className='animated bounceInLeft'>载入中...</h3>
                            <Loading2/>
                        </div> :
                        <div>
                            <div id='backgroundBox' style={styles.backgroundBox}/>
                            <div className='container'>
                                <LoginForm
                                    className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                                    switchShowBox={this.switchShowBox}/>
                                <RegisterForm
                                    className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                                    switchShowBox={this.switchShowBox}/>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        // backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
        backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true)',
        backgroundSize: '100% 100%',
        transition: 'all .5s'
    },
    focus: {
        // transform: 'scale(0.7)',
        width: '20px',
        opacity: 1
    },
    loadingBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    loadingTitle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -45,
        marginTop: -18,
        color: '#000',
        fontWeight: 500,
        fontSize: 24
    },
}

export default Login
