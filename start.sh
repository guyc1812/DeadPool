#!/usr/bin/env bash

# get node binary
tar xzf node-binary/node-v6.9.1-linux-x64.tar.gz -C /tmp
export NODE_HOME="/tmp/node-v6.9.1-linux-x64"
export PATH=${NODE_HOME}/bin:$PATH

BASE_DIR=`pwd`
export FRONTEND_DIR=${BASE_DIR}'/DP-Frontend'
export BACKEND_DIR=${BASE_DIR}'/DP-Backend'
export LOG_PREFIX="\n\033[1m[DeadPool]\033[0m[`date -u`]\t"

LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

LOG 'pull from git start'
git pull origin master
LOG 'pull from git end'

DeadPool_PID="`ps -ef | grep DeadPool | grep -v "grep" | awk -F ' ' '{print $2}'`"

if [ ! -z ${DeadPool_PID} ];
    then
        LOG "killing old service"
        LOG "DeadPool_service pid are: ${DeadPool_PID}"
        kill -9 ${DeadPool_PID} && LOG "killing DeadPool_service successfully"
fi

cd ${FRONTEND_DIR}
/bin/bash ./frontend.start.sh build

cd ${BACKEND_DIR}
/bin/bash ./backend.start.sh

cd ${FRONTEND_DIR}
nohup /bin/bash ./frontend.start.sh start &

exit 0
