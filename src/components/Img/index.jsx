/***
 * 图片管理组件
 * @description
 * 1,让图片默认的样式。
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

// img 为引入图片
const Img = props => {
    const style = {
        width: props.width,
        height: props.height,
        display: 'inline-block',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: props.position,
        cursor: 'pointer',
        backgroundImage: 'url(' + props.src + ')',
    }
    return (
        <Tooltip title={props.title} placement="bottom">
            <i {...props} style={{ ...style, ...props.style }}></i>
        </Tooltip>
    );
}

Img.defaultProps = {
    title: '',
    position: '0px 0px',
    width: 30,
    height: 30,
}

Img.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.object,
    position: PropTypes.string,
    className: PropTypes.string,
}
export default Img;