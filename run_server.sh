#!/usr/bin/env bash

gunicorn -k flask_sockets.worker app:app