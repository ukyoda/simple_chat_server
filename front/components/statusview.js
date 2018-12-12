import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';
class StatusView extends Component {
    constructor(props) {
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = e => this.setState(this.changeState());
        this.onError = e => {this.errorState(e.message)};
        this.state = this.changeState();
    }
    
    componentDidMount() {
        this.props.socket.addEventListener('open', this.onOpen);
        this.props.socket.addEventListener('close', this.onClose);
        this.props.socket.addEventListener('error', this.onError);
    }

    componentWillUnmount() {
        this.props.socket.removeEventListener('open', this.onOpen);
        this.props.socket.removeEventListener('error', this.onError);
        this.props.socket.removeEventListener('close', this.onClose);
    }

    onOpen(e) {
        // ログインメッセージ送信
        const {nickname} = this.props;
        const sendData = {
            msg_type: 'update_clients',
            nickname
        };
        this.props.socket.send(JSON.stringify(sendData));
        this.setState(this.changeState());
    }

    errorState(message) {
        this.setState({
            status: this.props.socket.readyState,
            message: <span className='text-danger'>ERROR({message}})</span>
        });
    }

    changeState() {
        console.log(this.props.socket.readyState);
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
        console.log('AAA');
        const {message} = this.state;
        const url = this.props.socket.url;
        return (
            <Row>
                <Col>接続先: {url}</Col>
                <Col>状態: {message} </Col>
            </Row>
        )
    }

}

StatusView.propTypes = {
    socket: PropTypes.instanceOf(WebSocket).isRequired,
    nickname: PropTypes.string.isRequired
};

export default StatusView;