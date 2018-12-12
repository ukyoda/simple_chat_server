import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SocketManager from '../socket';

class ChatView extends Component {

    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.onMessage = this.onMessage.bind(this);
    }
    
    componentDidMount() {
        this.props.socket.on('message', this.onMessage);
    }

    componentWillUnmount(props) {
        this.props.socket.removeListener('message', this.onMessage);
    }

    onMessage(message) {
        this.setState(message);
    }

    render() {
        const message = this.state.message || '';
        return (
            <div>{message}</div>
        );
    }
}

ChatView.propTypes = {
    socket: PropTypes.instanceOf(SocketManager).isRequired,
    nickname: PropTypes.string.isRequired
};

export default ChatView;