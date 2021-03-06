FROM python:3.6

MAINTAINER ukyoda


RUN    apt-get update \
    && apt-get -y install curl \
    && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && apt-get update \
    && apt-get -y install nodejs npm

RUN npm install -g n
RUN n v13.1.0 

COPY ./ /app
WORKDIR /app
RUN pip3 install -r requirements.txt
RUN npm ci
RUN npm run prod

CMD ["python3", "app.py"]
EXPOSE 8000
