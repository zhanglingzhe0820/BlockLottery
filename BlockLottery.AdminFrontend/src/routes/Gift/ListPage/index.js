import React from 'react'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";

class ListPage extends React.Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['奖品', '列表']}/>
                奖品列表
            </div>
        )
    }
}


export default ListPage
