import React from 'react'
import {withRouter, Switch, Redirect, Route} from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(() => import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

const EventAddPage = LoadableComponent(() => import('../../routes/Event/AddPage'))
const EventListPage = LoadableComponent(() => import('../../routes/Event/ListPage'))
const EventDetailPage = LoadableComponent(() => import('../../routes/Event/DetailPage'))

const GiftAddPage = LoadableComponent(() => import('../../routes/Gift/AddPage'))
const GiftListPage = LoadableComponent(() => import('../../routes/Gift/ListPage'))

//基本组件Demo
const ButtonDemo = LoadableComponent(() => import('../../routes/General/ButtonDemo/index'))
const IconDemo = LoadableComponent(() => import('../../routes/General/IconDemo/index'))

//导航组件Demo
const DropdownDemo = LoadableComponent(() => import('../../routes/Navigation/DropdownDemo/index'))
const MenuDemo = LoadableComponent(() => import('../../routes/Navigation/MenuDemo/index'))
const StepsDemo = LoadableComponent(() => import('../../routes/Navigation/StepsDemo/index'))

//输入组件Demo
const FormDemo1 = LoadableComponent(() => import('../../routes/Entry/FormDemo/FormDemo1'))
const FormDemo2 = LoadableComponent(() => import('../../routes/Entry/FormDemo/FormDemo2'))
const UploadDemo = LoadableComponent(() => import('../../routes/Entry/UploadDemo/index'))

//显示组件Demo
const CarouselDemo = LoadableComponent(() => import('../../routes/Display/CarouselDemo/index'))
const CollapseDemo = LoadableComponent(() => import('../../routes/Display/CollapseDemo/index'))
const ListDemo = LoadableComponent(() => import('../../routes/Display/ListDemo/index'))
const TableDemo = LoadableComponent(() => import('../../routes/Display/TableDemo/index'))
const TabsDemo = LoadableComponent(() => import('../../routes/Display/TabsDemo/index'))

//反馈组件Demo
const SpinDemo = LoadableComponent(() => import('../../routes/Feedback/SpinDemo/index'))
const ModalDemo = LoadableComponent(() => import('../../routes/Feedback/ModalDemo/index'))
const NotificationDemo = LoadableComponent(() => import('../../routes/Feedback/NotificationDemo/index'))

//其它
const AnimationDemo = LoadableComponent(() => import('../../routes/Other/AnimationDemo/index'))
const GalleryDemo = LoadableComponent(() => import('../../routes/Other/GalleryDemo/index'))
const DraftDemo = LoadableComponent(() => import('../../routes/Other/DraftDemo/index'))
const ChartDemo = LoadableComponent(() => import('../../routes/Other/ChartDemo/index'))
const LoadingDemo = LoadableComponent(() => import('../../routes/Other/LoadingDemo/index'))
const ErrorPage = LoadableComponent(() => import('../../routes/Other/ErrorPage/index'))
const SpringText = LoadableComponent(() => import('../../routes/Other/SpringText/index'))

//关于
const About = LoadableComponent(() => import('../../routes/About/index'))

@withRouter
class ContentMain extends React.Component {
    render() {
        return (
            <div style={{padding: 16, position: 'relative'}}>
                <Switch>
                    <Route exact path='/home' component={Home}/>

                    <Route exact path='/home/event/add' component={EventAddPage}/>
                    <Route exact path='/home/event/list' component={EventListPage}/>
                    <Route exact path='/home/event/detail/:id' component={EventDetailPage}/>

                    <Route exact path='/home/gift/add' component={GiftAddPage}/>
                    <Route exact path='/home/gift/list' component={GiftListPage}/>

                    <Route exact path='/home/general/button' component={ButtonDemo}/>
                    <Route exact path='/home/general/icon' component={IconDemo}/>

                    <Route exact path='/home/navigation/dropdown' component={DropdownDemo}/>
                    <Route exact path='/home/navigation/menu' component={MenuDemo}/>
                    <Route exact path='/home/navigation/steps' component={StepsDemo}/>

                    <Route exact path='/home/entry/form/basic-form' component={FormDemo1}/>
                    <Route exact path='/home/entry/form/step-form' component={FormDemo2}/>
                    <Route exact path='/home/entry/upload' component={UploadDemo}/>

                    <Route exact path='/home/display/carousel' component={CarouselDemo}/>
                    <Route exact path='/home/display/collapse' component={CollapseDemo}/>
                    <Route exact path='/home/display/list' component={ListDemo}/>
                    <Route exact path='/home/display/table' component={TableDemo}/>
                    <Route exact path='/home/display/tabs' component={TabsDemo}/>

                    <Route exact path='/home/feedback/modal' component={ModalDemo}/>
                    <Route exact path='/home/feedback/notification' component={NotificationDemo}/>
                    <Route exact path='/home/feedback/spin' component={SpinDemo}/>

                    <Route exact path='/home/other/animation' component={AnimationDemo}/>
                    <Route exact path='/home/other/gallery' component={GalleryDemo}/>
                    <Route exact path='/home/other/draft' component={DraftDemo}/>
                    <Route exact path='/home/other/chart' component={ChartDemo}/>
                    <Route exact path='/home/other/loading' component={LoadingDemo}/>
                    <Route exact path='/home/other/404' component={ErrorPage}/>
                    <Route exact path='/home/other/springText' component={SpringText}/>

                    <Route exact path='/home/about' component={About}/>

                    <Redirect exact from='/' to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default ContentMain
