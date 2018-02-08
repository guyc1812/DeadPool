#!/usr/bin/env bash


BASE_DIR=`pwd`
export FRONTEND_DIR=${BASE_DIR}'/DP-Frontend'
export BACKEND_DIR=${BASE_DIR}'/DP-Backend'
export LOG_PREFIX="\n\033[1m[DeadPool]\033[0m[`date -u`]\t"

# get node binary
tar xzf ${FRONTEND_DIR}/node-binary/node-v6.9.1-linux-x64.tar.gz -C /tmp
export NODE_HOME="/tmp/node-v6.9.1-linux-x64"
export PATH=${NODE_HOME}/bin:$PATH

LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

LOG 'pull from git start'
git pull origin master
LOG 'pull from git end'

# java
DP_SERVICE='DP-service'
DP_SERVICE_PID="`ps -ef | grep ${DP_SERVICE} | grep -v "grep" | awk -F ' ' '{print $2}'`"
DP_SERVICE_DIR="${BACKEND_DIR}/${DP_SERVICE}"

# node.js
DP_FRONTEND='DP-Frontend'
DP_FRONTEND_PID="`ps -ef | grep ${DP_FRONTEND} | grep -v "grep" | awk -F ' ' '{print $2}'`"
DP_FRONTEND_DIR=${DP_FRONTEND}

if [ ! -z ${DP_SERVICE_PID} ];
    then
        LOG "killing DP-service"
        LOG "DP-service pid are: ${DP_SERVICE_PID}"
        kill -9 ${DP_SERVICE_PID} && LOG "killing DP-service successfully"
fi

if [ ! -z ${DP_FRONTEND_PID} ];
    then
        LOG "killing DP-Frontend"
        LOG "DP-Frontend pid are: ${DP_FRONTEND_PID}"
        kill -9 ${DP_FRONTEND_PID} && LOG "killing DP-Frontend successfully"
fi

#cd ${FRONTEND_DIR}
#/bin/bash ./frontend.start.sh build

cd ${BACKEND_DIR}
/bin/bash ./backend.start.sh

#cd ${FRONTEND_DIR}
#nohup /bin/bash ./frontend.start.sh start &

exit 0
