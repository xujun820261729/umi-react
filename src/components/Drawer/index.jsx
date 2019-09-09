import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import {Drawer, Spin } from 'antd'

const modalRoot = document.body;
class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.el = window.document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    handleOk = () => {
        this.props.onOk();
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { children, loading, } = this.props
        return createPortal(
            <Drawer
                {...this.props}
            >
                <Spin spinning={loading}>
                    <div>
                        {children}
                    </div>
                </Spin>
            </Drawer>, this.el);
    }
}

MyDrawer.defaultProps = {
    loading: false,
    onCancel: () => { },
    onOk: () => { },
}

MyDrawer.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
}

export default MyDrawer;
