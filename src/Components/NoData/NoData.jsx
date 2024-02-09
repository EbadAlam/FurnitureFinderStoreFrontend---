import React from 'react'

function NoData({ content, tag }) {
    const TagName = tag;
    return (
        <div style={{ textAlign: 'center' }}>
            <TagName style={{ textAlign: 'center' }}>{content}</TagName>
        </div>
    )
}

export default NoData