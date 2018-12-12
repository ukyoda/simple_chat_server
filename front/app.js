import React, {Components} from "react";
import ReactDOM from "react-dom";
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusView from './components/statusview';

const socket = new WebSocket('ws://localhost:8000');

const Root = () => {
    return (
        <div>
            <Container>
                <h1>WebSocketクライアント</h1>
                <StatusView socket={socket}/>
            </Container>
        </div>
    );
};

ReactDOM.render(<Root />, document.getElementById("app"));