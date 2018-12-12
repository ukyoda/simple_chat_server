import React, {Component} from 'react';
import PropTypes from 'prop-types';

class StatusView extends Component {
    constructor(props) {
        super(props);
        this.onOpen = e => {
            console.log('Connect');
            this.setState(this.changeState())
        };
        this.onClose = e => this.setState(this.changeState());
        this.onError = e => {this.errorState(e.message)};
        this.props.socket.addEventListener('open', this.onOpen);
        this.props.socket.addEventListener('close', this.onClose);
        this.props.socket.addEventListener('error', this.onError);
        this.state = this.changeState();
    }

    componentWillUnmount(props) {
        this.props.socket.removeEventListener('open', this.onOpen);
        this.props.socket.removeEventListener('error', this.onError);
        this.props.socket.removeEventListener('close', this.onClose);
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
        return (
            <div>
                <span>接続先: {this.props.socket.url}</span>
                <span>状態: </span>
                {message}
            </div>
        )
    }

}

StatusView.propTypes = {
    socket: PropTypes.instanceOf(WebSocket).isRequired
};

export default StatusView;