import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Input, Alert, Button} from 'antd'
import FolderInput from './folderinput'
import {fileModalActions} from '../actions/filemodalaction'

class FileModal extends Component {

    constructor(props) {
        super(props)
        this._fileInfo = null;

        this.state = {
            title: '添加复制文件夹',
            visible: false,
            target: '',
            source: '',
            filter: '',
        }

        this.show = this.show.bind(this)
        this._save = this._save.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.data !== 'undefined') {
            this._fileInfo = nextProps.data;
            this.onClose();
        }
    }

    _save() {
        if (!this._validInput())
            return;
        if (this._fileInfo === null) {
            let fileInfo = {
                source: this.state.source,
                target: this.state.target,
                filter: this.state.filter,
            }
            this.props.save(fileInfo);
        } else {
            let fileInfo = {
                _id: this._fileInfo._id,
                source: this.state.source,
                target: this.state.target,
                filter: this.state.filter,
            }
            this.props.save(fileInfo);
        }
    }

    _validInput() {
        if (this.state.source === '') {
            this.setState({error: '请输入原路径'})
            return false;
        }
        if (this.state.target === '') {
            this.setState({error: '请输入目标路径'})
            return false;
        }
        return true;
    }

    show(fileInfo = null) {
        this._fileInfo = fileInfo;
        if (this._fileInfo === null)
            this.setState({title: '添加复制文件夹'});
        else
            this.setState({title: '修改复制文件夹'});
        if (this._fileInfo !== null) {
            this.setState({
                source: this._fileInfo.source,
                target: this._fileInfo.target,
                filter: this._fileInfo.filter,
            })
        } else {
            this.setState({
                source: '',
                target: '',
                filter: '',
            })
        }
        this.setState({visible: true});
    }

    onClose() {
        this.setState({visible: false});
        this.props.onClose(this._fileInfo);
    }

    onChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        return (
            <div>
                <Modal title={this.state.title} visible={this.state.visible} closable={false}
                       footer={[
                           <Button key="back" onClick={this.onClose}> 取消 </Button>,
                           <Button key="submit" type="primary" loading={this.props.loading}
                                   onClick={this._save}> 保存 </Button>,
                       ]}>
                    {
                        typeof this.state.error === 'string' && this.state.error !== '' ?
                            <Alert message={this.state.error}
                                   type="error"
                                   closable
                            /> : null
                    }
                    <div className="info">
                        <div>源路径：</div>
                        <div>
                            <FolderInput value={this.state.source} onChange={(e) => {
                                this.onChange('source', e.target.value)
                            }}> 浏览 </FolderInput>
                        </div>
                        <div style={{marginTop: '10px'}}>目标路径：</div>
                        <div>
                            <FolderInput value={this.state.target} onChange={(e) => {
                                this.onChange('target', e.target.value)
                            }}> 浏览 </FolderInput>
                        </div>
                        <div style={{marginTop: '10px'}}>过滤：</div>
                        <div>
                            <Input value={this.state.filter} onChange={(e) => {
                                this.onChange('filter', e.target.value)
                            }}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.FileModalReducer;
}

export default connect(mapStateToProps, fileModalActions, null, {withRef: true})(FileModal)