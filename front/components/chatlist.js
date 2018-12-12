import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SocketManager from '../socket';
import './chatlist.css';

const ChatListItem = props => {
    const {nickname, message, createdAt} = props;
    return (
        <div className='chatlist-item'>
            <div className='nickname'>{nickname}</div>
            <div className='message'>{message}</div>
            <div className='created-at'>{createdAt}</div>
        </div>
    );
};

class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageLog: []
        };
        this.onMessage = this.onMessage.bind(this);
    }
    
    componentDidMount() {
        this.props.socket.on('message', this.onMessage);
    }

    componentWillUnmount(props) {
        this.props.socket.removeListener('message', this.onMessage);
    }

    onMessage(data) {
        const messageLog = this.state.messageLog;
        messageLog.unshift(data);
        this.setState({messageLog});
    }

    render() {
        const messageLog = this.state.messageLog;
        const listView = messageLog.map((v, idx) => {
            const {nickname, message, created_at} = v;
            return <ChatListItem nickname={nickname} message={message} key={idx} createdAt={created_at} />;
        });
        return (
            <div>{listView}</div>
        );
    }
}

ChatList.propTypes = {
    socket: PropTypes.instanceOf(SocketManager).isRequired,
};

export default ChatList;