import { Flex, Spin } from 'antd'
import React from 'react'

function Loader({ fullScreen }) {
    return (
        <Flex align="center" gap="middle" style={{ justifyContent: 'center' }}>
            <Spin size="large" fullscreen={true} />
        </Flex>
        // <span class="dashboard-spinner spinner-info spinner-sm"></span>
    )
}

export default Loader