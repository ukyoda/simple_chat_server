from flask import Flask, render_template
from flask_sockets import Sockets


app = Flask(__name__)
sockets = Sockets(app)


@sockets.route('/')
def echo_socket(ws):
    while not ws.closed:
        try:
            message = ws.receive()
            print('aaa')
            ws.send(message)
        except:
            pass
    print('Socket Close')

@app.route('/')
def hello():
    return render_template('hello.html')


if __name__ == '__main__':
    app.run()
