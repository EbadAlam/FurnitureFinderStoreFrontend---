import { Flex, Spin } from 'antd'
import React from 'react'

function Loader({ fullScreen }) {
    return (
        <Flex align="center" gap="middle">
            <Spin size="large" fullscreen={fullScreen} />
        </Flex>
    )
}

export default Loader