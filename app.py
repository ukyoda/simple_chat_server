# PythonでWebSocketサーバ
# 下記を参考に作成
# https://github.com/wwwtyro/gevent-websocket/blob/master/examples/chat/chat.py

from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
from werkzeug.debug import DebuggedApplication
from flask import Flask, app, render_template
import json

from gevent import monkey
monkey.patch_all()

from datetime import datetime

import argparse
def getargs():
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', action='store_true', help="Start Debug Mode")
    parser.add_argument('--host', default='0.0.0.0', help='Server Host')
    parser.add_argument('--port', type=int, default=8000, help='Server Port')
    return parser.parse_args()

flask_app = Flask(__name__)
flask_app.debug = True


class ChatApplication(WebSocketApplication):
    def on_open(self):
        print("Some client connected!")

    def on_message(self, message):
        if message is None:
            return

        message = json.loads(message)
        print(message)
        if message['msg_type'] == 'message':
            self.broadcast(message)
        elif message['msg_type'] == 'update_clients':
            self.send_client_list(message)

    def send_client_list(self, message):
        """
        クライアントリストが更新された時の処理
        """
        current_client = self.ws.handler.active_client
        current_client.nickname = message['nickname']

        self.ws.send(json.dumps({
            'msg_type': 'update_clients',
            'clients': [
                getattr(client, 'nickname', 'anonymous')
                for client in self.ws.handler.server.clients.values()
            ]
        }))

    def broadcast(self, message):
        """
        メッセージを受け取った
        """
        for client in self.ws.handler.server.clients.values():
            client.ws.send(json.dumps({
                'msg_type': 'message',
                'nickname': message['nickname'],
                'message': message['message'],
                'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }))

    def on_close(self, reason):
        """
        接続が切れた
        """
        print("Connection closed! ")


@flask_app.route('/')
def index():
    """
    クライアント画面
    """
    return render_template('index.html')

if __name__ == '__main__':
    args = getargs()
    print('Host: {}, Port: {}'.format(args.host, args.port))
    WebSocketServer(
        (args.host, args.port),
        Resource([
            ('^/', ChatApplication),
            ('^/.*', DebuggedApplication(flask_app))
        ]),
        debug=args.debug
    ).serve_forever()
