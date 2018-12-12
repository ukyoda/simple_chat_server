'use strict';
let EventEmitter = require("events").EventEmitter;

export default class SocketManager extends EventEmitter {

    constructor(url, nickname='UNKNOWN') {
        super();
        this._socket = new WebSocket(url);
        this._nickname = nickname;
        this._socket.addEventListener('open', e =>  this.emit('open', e));
        this._socket.addEventListener('close', e => this.emit('close', e));
        this._socket.addEventListener('error', e => this.emit('error', e));
        this._socket.addEventListener('message', this.onMessage.bind(this));
    }

    get nickname() {
        return this._nickname;
    }

    get socket() {
        return this._socket;
    }

    get readyState() {
        return this.socket.readyState;
    }

    updateClients() {
        const sendData = {
            msg_type: 'update_clients',
            nickname: this.nickname
        };
        this.send(sendData);
    }

    sendMessage(message) {
        const sendData = {
            msg_type: 'message',
            nickname: this.nickname
        };
        this.send(sendData);
    }

    send(data) {
        if(typeof data != 'string') {
            data = JSON.stringify(data);
        }
        console.log(data);
        this.socket.send(data);
    }

    onMessage(e) {
        const data = e.data;
        let obj = {};
        console.log(data);
        try {
            obj = JSON.parse(data);
        } catch (e) {
            console.error(`Json Parse Error: ${e.message} | ${data}`);
            return;
        }
        switch(obj.msg_type) {
        case 'message':
            this.emit('message', obj);
            break;
        case 'update_clients':
            this.emit('update_clients', obj);
            break;
        default:
            console.error(`Error Protocol ${e.message} | ${data}`);
            break;
        }

    }

}