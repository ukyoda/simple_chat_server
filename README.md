# WebSocket検証用チャットサーバ

## このプログラムについて

このプログラムはWebSocketで作成した簡単なチャットサーバです。
WebSocketのクライアントアプリを作成する時のサンプルプログラムとして利用してください。

サーバサイドはPythonで作成し、クライアントサイドはReactで作成しています。

## 動作要件

* Dockerで動かす場合
    * Dockerが動く環境を用意してください
* ホストマシンで動かす場合
    * python3.6
    * node.js (v11.1.0で動作確認)
    
## インストール(Docker版)

```bash
$ docker build -t simple_chat_server:latest .
```

起動するときは下記コマンドで実行

```bash
$ docker run --rm -it -p8000:8000 simple_chat_server
```

> ポートを変更する場合はマッピングポートのホスト側ポートを変更して実行してください

## インストール(ホストマシン)

```bash
$ pip3 install -r requirements.txt
$ npm install
$ npm run prod
```

起動するときは下記コマンドで実行

```bash
$ python3 app.py
```

> ポートを変更する場合は「--port {ポート番号}」の引数オプションを指定してください

## データ送受信仕様

### 1. 接続

下記URLに対してWebSocketを接続してください(ホスト、ポートは適宜修正してください)

```text
ws://localhost:8000
```

### 2. ログイン 

WebSocketに接続後、下記のデータを送信してください。
```json
{
    "msg_type": "update_clients",
    "nickname": "${表示するユーザ名}"
}
```

サーバはデータを受け取ったら下記のデータを返却します。
```json
{
    "msg_type": "update_clients",
    "clients": [
        "${ユーザ1}",
        "${ユーザ2}",
        "${ユーザ3}"
    ]
}
```

### 2. メッセージ送受信

下記のデータを送信してください。
```json
{
    "msg_type": "message",
    "nickname": "${ログインユーザ名}",
    "message": message
}
```

サーバは上記データを受け取ったら接続中の全クライアント(自分も含む)に対して下記のデータを送信します。

```bash
{
    "msg_type": "message",
    "nickname": "${メッセージの送信者の名前}",
    "message": "${メッセージの内容}",
    "created_at": "${サーバがメッセージを受け取った時刻}"
}
```

## 動作確認(デモアプリ)

ブラウザで下記にアクセスしてください

```text
http://localhost:8000
```

