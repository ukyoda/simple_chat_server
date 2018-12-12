import React, {Components} from "react";
import ReactDOM from "react-dom";
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusView from './components/statusview';
import MessageForm from './components/messageform';
import ChatList from './components/chatlist';
import SocketManager from './socket';
import ChatView from './components/chatview';

//const socket = new SocketManager(`ws://${location.host}`);

const Root = () => {
    return (
        <div>
            <Container>
                <h1>WebSocketクライアント</h1>
                <ChatView/>
            </Container>
        </div>
    );
};

ReactDOM.render(<Root />, document.getElementById("app"));