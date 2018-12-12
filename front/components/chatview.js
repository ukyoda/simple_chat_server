import React, {Component} from 'react';
import PropTypes from 'prop-types';
class ChatView extends Component {

    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.onMessage = this.onMessage.bind(this);
    }
    
    componentDidMount() {
        this.props.socket.addEventListener('message', this.onMessage);
    }

    componentWillUnmount(props) {
        this.props.socket.removeEventListener('message', this.onMessage);
    }

    onMessage(e) {
        const message = e.data;
        console.log(e);
        this.setState({message});
    }

    render() {
        const message = this.state.message || '';
        return (
            <div>{message}</div>
        );
    }
}

ChatView.propTypes = {
    socket: PropTypes.instanceOf(WebSocket).isRequired,
    nickname: PropTypes.string.isRequired
};

export default ChatView;