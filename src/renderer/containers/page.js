import React, {Component} from 'react'
import {connect} from 'react-redux'
import {actions} from '../actions/fileinfoaction'
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Progress from 'antd/lib/progress';
import 'antd/dist/antd.css'
import './page.scss'

class Page extends Component {

    constructor(props) {
        super(props)
        this.handlerCopy = this.handlerCopy.bind(this);
        this.changeProps = this.changeProps.bind(this);
        this.browseFolder = this.browseFolder.bind(this);
    }

    handlerCopy() {
        this.props.copy(this.props.source, this.props.target);
    }

    changeProps(e) {
        this.props.changeProps({[e.target.name]: e.target.value})
    }

    browseFolder(e, name) {
        this.props.browseFolder(name);
    }

    render() {
        return (
            <div className="page">
                <div className="alt-source">source path:</div>
                <div className="input-source"><Input name="source" value={this.props.source}
                                                     onChange={this.changeProps}/></div>
                <div className="btn-source"><Button type="primary" name="source"
                                                    onClick={e => this.browseFolder(e, 'source')}>
                    browser </Button></div>
                <div className="alt-target">target path:</div>
                <div className="input-target"><Input name="target" value={this.props.target}
                                                     onChange={this.changeProps}/></div>
                <div className="btn-target"><Button type="primary" name="target"
                                                    onClick={e => this.browseFolder(e, 'target')}>
                    browser </Button></div>
                <div className="prog">
                    {
                        this.props.coping ? <Progress percent={this.props.percent} strokeWidth={5}/> : null
                    }

                </div>
                <div className="btn-copy">
                    {
                        this.props.coping ? <Button type="primary" disabled> coping </Button> :
                            <Button type="primary" onClick={this.handlerCopy}> copy </Button>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, actions)(Page);