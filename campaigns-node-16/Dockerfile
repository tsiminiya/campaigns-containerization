FROM ubuntu:latest

RUN apt update
RUN apt install -y wget

RUN wget https://nodejs.org/download/release/v16.13.1/node-v16.13.1-linux-x64.tar.gz

RUN tar xvf node-v16.13.1-linux-x64.tar.gz

ENV PATH=${PATH}:/node-v16.13.1-linux-x64/bin
