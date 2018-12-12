import React, {Components} from "react";
import ReactDOM from "react-dom";
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusView from './components/statusview';
import MessageForm from './components/messageform';
import ChatView from './components/chatview';
import SocketManager from './socket';

const socket = new SocketManager('ws://localhost:8000');

const Root = () => {
    return (
        <div>
            <Container>
                <h1>WebSocketクライアント</h1>
                <StatusView socket={socket}/>
                <MessageForm socket={socket} nickname="ukyoda"/>
                <ChatView socket={socket} nickname="ukyoda"/>
            </Container>
        </div>
    );
};

ReactDOM.render(<Root />, document.getElementById("app"));