import React, { Component } from 'react'
// import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Modal, Spin, Button } from 'antd'
import styles from './modal.less'

class Modals extends Component {

    handleOk = () => {
        this.props.onOk();
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        const DefaultFooter = () => <div>
            <Button  type="primary" onClick={this.handleOk}>确定</Button>
            <Button onClick={this.handleCancel}>取消</Button>
        </div>
        const { children, loading, footer } = this.props
        return (
            <Modal
                {...this.props}
                footer={null}
                style={{ top: '40px' }}
                wrapClassName={styles.htmodal}
            >
                <Spin spinning={loading}>
                    <div className={styles.content}>
                        {children}
                    </div>
                    {footer === null ? <div></div> :
                        <div className={styles.footer} style={{ minHeight: 50 }}>
                            {footer ? footer : <DefaultFooter />}
                        </div>
                    }
                </Spin>
            </Modal>);
    }
}


Modals.propTypes = {
    loading: PropTypes.bool,
  }
  

export default Modals;
