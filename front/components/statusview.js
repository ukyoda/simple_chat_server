import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';
import SocketManager from '../socket';

class StatusView extends Component {
    constructor(props) {
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = e => this.setState(this.changeState());
        this.onError = e => {this.errorState(e.message)};
        this.state = this.changeState();
    }
    
    componentDidMount() {
        this.props.socket.on('open', this.onOpen);
        this.props.socket.on('close', this.onClose);
        this.props.socket.on('error', this.onError);
    }

    componentWillUnmount() {
        this.props.socket.removeListener('open', this.onOpen);
        this.props.socket.removeListener('error', this.onError);
        this.props.socket.removeListener('close', this.onClose);
    }

    onOpen(e) {
        // ログインメッセージ送信
        this.props.socket.updateClients();
        this.setState(this.changeState());
    }

    errorState(message) {
        this.setState({
            status: this.props.socket.readyState,
            message: <span className='text-danger'>ERROR({message}})</span>
        });
    }

    changeState() {
        const status = this.status || {};
        status.status = this.props.socket.readyState;
        switch(this.props.socket.readyState) {
        case WebSocket.OPEN:
            status.message = <span className='text-success'>ONLINE</span>
            break;
        case WebSocket.CLOSED:
            status.message = <span className='text-secondary'>OFFLINE</span>
            break;
        case WebSocket.CONNECTING:
            status.message = <span>CONNECTING...</span>
            break;
        case WebSocket.CLOSING:
            status.message = <span>CLOSING...</span>
            break;
        }
        return status;
    }

    render() {
        const {message} = this.state;
        const url = this.props.socket.url;
        const nickname = this.props.socket.nickname;
        return (
            <Row>
                <Col>接続先: {url}</Col>
                <Col>状態: {message} </Col>
                <Col>あなたの名前: {nickname}</Col>
            </Row>
        )
    }

}

StatusView.propTypes = {
    socket: PropTypes.instanceOf(SocketManager).isRequired,
};

export default StatusView;