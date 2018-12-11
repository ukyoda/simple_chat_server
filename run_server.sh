#!/usr/bin/env bash

npm run dev
gunicorn -k flask_sockets.worker app:app