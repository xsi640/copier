import React, {Component} from 'react'
import {Modal, Button, Input, Alert} from 'antd';
import {fileInfoAction} from '../actions/fileinfoaction'
import {connect} from 'react-redux'

class FileInfo extends Component {

    constructor(props) {
        super(props);
    }

    handleOk() {
        this.props.onOK({
            source: this.props.source,
            target: this.props.target
        })
    }

    handleCancel() {
        this.props.onCancel();
    }

    changeProps(e) {
        this.props.changeProps({[e.target.name]: e.target.value})
    }

    browseFolder(e, name) {
        this.props.browseFolder(name);
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    title="Add FileInfo"
                    onOk={::this.handleOk}
                    onCancel={::this.handleCancel}
                    closable={false}
                    footer={[
                        <Button key="back" onClick={::this.handleCancel} disabled={this.props.loading}>Cancel</Button>,
                        <Button key="submit" type="primary" loading={this.props.loading}
                                onClick={::this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    {
                        typeof this.props.error !== 'undefined' ?
                            <Alert message={this.props.error}
                                   type="error"
                                   closable
                            /> : null
                    }
                    <div className="page">
                        <div className="alt-source">source path:</div>
                        <div className="input-source">
                            <Input name="source" value={this.props.source} onChange={::this.changeProps}
                                   disabled={this.props.loading}/></div>
                        <div className="btn-source">
                            <Button type="primary" name="source" onClick={e => this.browseFolder(e, 'source')}
                                    disabled={this.props.loading}>
                                browser </Button>
                        </div>
                        <div className="alt-target">target path:</div>
                        <div className="input-target">
                            <Input name="target" value={this.props.target} onChange={::this.changeProps}
                                   disabled={this.props.loading}/></div>
                        <div className="btn-target">
                            <Button type="primary" name="target" onClick={e => this.browseFolder(e, 'target')}
                                    disabled={this.props.loading}>
                                browser </Button></div>
                    </div>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.FileInfoReducer;
}

export default connect(mapStateToProps, fileInfoAction)(FileInfo);