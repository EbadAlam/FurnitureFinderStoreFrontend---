import { Flex, Spin } from 'antd'
import React from 'react'

function Loader({ fullScreen }) {
    return (
        <Flex align="center" gap="middle" style={{ justifyContent: 'center' }}>
            <Spin size="large" fullscreen={fullScreen} />
            {/* <span class="dashboard-spinner spinner-info spinner-sm"></span> */}
        </Flex>
    )
}

export default Loader