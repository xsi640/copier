import React, {Component} from 'react'
import {Table, Button, Icon} from 'antd';
import {connect} from 'react-redux'
import {mainActions} from '../actions/mainaction'
import FileInfo from '../components/fileinfo'
const {Column} = Table;
import './main.scss'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidMount(){
        this.props.readFileInfos();
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    handleAdd() {
        this.props.changeProps({showFileInfo: true})
    }

    handleFileInfoOK(fileInfo) {
        this.props.saveFileInfo(fileInfo)
    }

    handleCancel() {
        this.props.changeProps({showFileInfo: false})
    }

    render() {
        const {selectedRowKeys} = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div className="main">
                <div className="toolbar">
                    <Button type="primary" onClick={::this.handleAdd}> add </Button>
                    <Button type="primary" disabled={!hasSelected}> delete </Button>
                </div>
                <div className="data">
                    <Table rowSelection={rowSelection} size="small" dataSource={this.props.data}>
                        <Column title="id" dataIndex="id"/>
                        <Column title="source" dataIndex="source"/>
                        <Column title="target" dataIndex="target"/>
                        <Column title="status" dataIndex="status"/>
                    </Table>
                </div>
                <FileInfo onOK={::this.handleFileInfoOK}
                          onCancel={::this.handleCancel}
                          loading={this.props.loading}
                          error={this.props.error}
                          visible={this.props.showFileInfo}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return state.MainReducer;
}

export default connect(mapStateToProps, mainActions)(Main)