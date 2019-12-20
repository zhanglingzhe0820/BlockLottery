import React from 'react'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";

class AddPage extends React.Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['奖品', '新增']}/>
                奖品新增
            </div>
        )
    }
}

export default AddPage
