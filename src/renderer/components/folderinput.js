import React, {Component} from 'react'
const {ipcRenderer} = require('electron')
import * as IPCMESSAGE from '../../constipc'
import {Input, Button} from 'antd'

export default class FolderInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined') {
            this.setState({value: nextProps.value});
        }
    }

    handleClick(e) {
        e.preventDefault()
        ipcRenderer.once(IPCMESSAGE.BROWSE_FOLDER, (event, args) => {
            this.setState({value: args.data})
            this.props.onChange({target: {value: args.data}})
        })
        ipcRenderer.send(IPCMESSAGE.BROWSE_FOLDER)
    }

    render() {
        return <div style={{overflow: 'hidden', width: '100%'}}>
            <Button type={this.props.buttonType} onClick={::this.handleClick}
                    style={{float: 'right'}}>{this.props.children}</Button>
            <span style={{display: 'block', overflow: 'hidden', paddingRight: '5px'}}>
                <Input value={this.state.value} style={{width: '100%'}}
                       onChange={this.props.onChange} placeholder={this.props.placeholder}/>
            </span>
        </div>
    }
}

FolderInput.defaultProps = {
    placeholder: '',
    buttonType: 'primary'
}