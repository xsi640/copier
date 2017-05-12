import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Button} from 'antd'
import FileModal from './filemodal'
import {mainActions} from '../actions/mainaction'
import Coping from './coping'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            selectedRowKeys: [],
            coping: false,
            currPer: 0,
            totalPer: 0,
        }

        this.showFileModal = this.showFileModal.bind(this)
        this.closefileModal = this.closefileModal.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleCopy = this.handleCopy.bind(this)
        this.copingModalClose = this.copingModalClose.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.deletedId !== 'undefined') {
            for (let id of nextProps.deletedId) {
                let obj = null;
                for (let o of this.state.data) {
                    if (o._id === id) {
                        obj = o;
                        break;
                    }
                }
                if (obj !== null) {
                    this.state.data.splice(this.state.data.indexOf(obj), 1)
                }
            }
            this.state.selectedRowKeys = [];
        }
    }

    componentDidMount() {
        this.props.list();
    }

    showFileModal(e, item) {
        this.refs.fileModal.getWrappedInstance().show(item)
    }

    handleDelete(e) {
        this.props.delete(this.state.selectedRowKeys)
    }

    handleModify(e) {
        let id = this.state.selectedRowKeys[0];
        let fileInfo = null;
        for (let p of this.state.data) {
            if (p._id === id) {
                fileInfo = p;
                break;
            }
        }
        this.refs.fileModal.getWrappedInstance().show(fileInfo)
    }

    closefileModal(fileInfo) {
        if (fileInfo != null) {
            let obj = null;
            for (let o of this.state.data) {
                if (o.id === fileInfo.id) {
                    obj = o;
                    break;
                }
            }
            if (obj == null) {
                this.state.data.push(fileInfo);
            } else {
                this.state.data[this.state.data.indexOf(obj)] = fileInfo;
            }
            this.forceUpdate();
        }
    }

    onSelectChange(selectedRowKeys) {
        this.setState({selectedRowKeys})
    }

    handleCopy(){
        this.props.copy();
    }

    copingModalClose(){
        this.props.cancelCopy();
    }

    render() {
        const columns = [{
            title: '源路径',
            dataIndex: 'source',
        }, {
            title: '目标路径',
            dataIndex: 'target',
        }, {
            title: '过滤',
            dataIndex: 'filter',
        }];

        const {selectedRowKeys, data, loading} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0 && !loading;
        const isSingleSelected = selectedRowKeys.length === 1 && !loading;
        const hasData = data.length > 0 && !loading;
        return (
            <div style={{padding: 20}}>
                <div style={{marginBottom: 16}}>
                    <Button icon="plus" onClick={this.showFileModal}> 新增 </Button>
                    <Button icon="edit" disabled={!isSingleSelected} onClick={this.handleModify}
                            style={{marginLeft: 10}}> 修改 </Button>
                    <Button icon="delete" disabled={!hasSelected} onClick={this.handleDelete}
                            style={{marginLeft: 10}}> 删除 </Button>
                    <Button type="primary" icon="copy" disabled={!hasData} onClick={this.handleCopy}
                            style={{marginLeft: 50}}> 复制 </Button>
                </div>
                <FileModal ref="fileModal" onClose={this.closefileModal}/>
                <Table rowKey="_id" rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading}/>
                <Coping visible={this.state.coping} currPer={this.state.currPer} totalPer={this.state.totalPer} onClose={this.copingModalClose}></Coping>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.MainReducer;
}

export default connect(mapStateToProps, mainActions)(Main)