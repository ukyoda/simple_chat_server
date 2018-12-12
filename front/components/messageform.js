import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {counter: 0};
    }

    onSubmit(e) {
        const {nickname, socket} = this.props;
        const message = document.querySelector('#message').value;
        document.querySelector('#message').value = '';
        const data = {
            msg_type: 'message',
            nickname: nickname,
            message: message
        };
        if(message) {
            socket.send(JSON.stringify(data));
            const state = this.state;
            state.counter++;
            this.setState(state);
        }
    }

    render() {
        const nickname = this.props.nickname;
        return (
            <Form inline>
                <FormGroup className = "mb-2 mr-sm-2 mb-sm-0">
                    <Label for="message"  className="mr-sm-2">Message</Label>
                    <Input type="text" name="message" id="message" placeholder="メッセージを入力してください"/>
                </FormGroup>
                <Button onClick={this.onSubmit}>送信</Button>
            </Form>
        );
    }
}

MessageForm.propTypes = {
    nickname: PropTypes.string.isRequired,
    socket: PropTypes.instanceOf(WebSocket).isRequired
};

export default MessageForm;