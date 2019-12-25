import React from 'react'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'

export default class About extends React.Component{
  render(){
    return (
      <div>
        <CustomBreadcrumb arr={['关于我们']}/>
        <TypingCard source={'弹力球科技是一个面向于青年人的区块链科技平台，致力于开发、宣传和推广最新最有趣最前沿的区块链产品，将区块链科技带入到年轻人的生活中，让区块链改变青年人的生活，让青年人感受区块链科技和产品的先进与乐趣。'} title='关于我们' />
          <TypingCard source={'透明球抽奖平台是弹力球办公室弹力球科技板块开发的区块链抽奖平台，该平台利用区块链去中心化特点实现抽奖信息的公开透明，以保障参与者的正当权益。目前，透明球主要结合弹力球的业务范围，用于新媒体领域的抽奖活动，未来还将适用于各个领域。'} title='透明球抽奖平台' />
      </div>
    )
  }
}
