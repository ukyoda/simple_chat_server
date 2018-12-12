import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ChatList from './chatlist';
import MessageForm from './messageform';
import StatusView from './statusview';
import SocketManager from '../socket';
import {Form, Input, Button, FormGroup, Label} from 'reactstrap';

export default class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedin: false};
    }

    onSubmit(e) {
        e.preventDefault();
        const nickname = document.querySelector('#nickname').value;
        if(!nickname) {
            return;
        }
        const state = this.state;
        if(!this.state.socket) {
            state.socket = new SocketManager(`ws://${location.host}`, nickname);
        }
        state.loggedin = true;
        this.setState(state);
    }

    render() {
        const {loggedin} = this.state;
        if(loggedin) {
            const {socket} = this.state;
            return (
                <div>
                    <StatusView socket={socket}/>
                    <MessageForm socket={socket} />
                    <ChatList socket={socket} />
                </div>
            );
        } else {
            return (
                <div>
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <FormGroup>
                            <Label for="nickname">名前</Label>
                            <Input type="text" name="nickname" id="nickname" placeholder="名前を入力してください" />
                        </FormGroup>
                        <Button>チャットを始める</Button>
                    </Form>
                </div>
            );
        }
    }
}