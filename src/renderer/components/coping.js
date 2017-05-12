import React, {Component} from 'react'
import {Modal, Progress, Button} from "antd";

export default class Coping extends Component {
    render() {
        return (
            <div>
                <Modal visible={this.props.visible} closable={false} maskClosable={false}
                       footer={[<Button key="back" onClick={this.props.onClose}> 取消 </Button>]}>
                    当前进度：<Progress percent={this.props.currPer} strokeWidth={5} status="active"/>
                    总进度：<Progress percent={this.props.totalPer} strokeWidth={5} status="active"/>
                </Modal>
            </div>)
    }
}

Coping.defaultProps = {
    visible: false,
    currPer: 0,
    totalPer: 0
}