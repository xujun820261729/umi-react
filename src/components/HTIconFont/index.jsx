/***
 * IconFont图标引入
 * @description
 * 1,引入https://www.iconfont.cn/的图标
 * 2.默认移入显示蓝色
 */
import  { useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import _ from 'lodash';

const  HTIconFont = (props)=> {
    const refcolor = useRef(null);
    const  handleMouseOver = () => {
        refcolor.current.style.color='#1D88E5';
    }
    const  handleMouseOut = () => {
        refcolor.current.style.color='';
    }
    const IconFont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
      });
    return (
        <div  ref={refcolor}>
            <IconFont
                {...props}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />
        </div>
    );
}


HTIconFont.propTypes={
    type:PropTypes.string,
}

export default HTIconFont;