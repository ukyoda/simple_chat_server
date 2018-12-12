import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import SocketManager from '../socket';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {counter: 0};
    }

    onSubmit(e) {
        e.preventDefault();
        const { socket } = this.props;
        const message = document.querySelector('#message').value;
        document.querySelector('#message').value = '';
        
        if(message) {
            socket.sendMessage(message);
            const state = this.state;
            state.counter++;
            this.setState(state);
        }
    }

    render() {
        return (
            <Form inline onSubmit={this.onSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="message"  className="mr-sm-2">Message</Label>
                    <Input type="text" name="message" id="message" placeholder="メッセージを入力してください"/>
                </FormGroup>
                <Button>送信</Button>
            </Form>
        );
    }
}

MessageForm.propTypes = {
    socket: PropTypes.instanceOf(SocketManager).isRequired
};

export default MessageForm;