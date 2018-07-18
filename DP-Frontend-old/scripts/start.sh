#!/usr/bin/env bash

export LOG_PREFIX="\n\033[1m[testcase-platform]\033[0m[`date -u`]\t"
LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

BASE_DIR=`pwd`
LOG_DIR=$HOME'/ecg-testcase-logs'
if [ ! -d ${LOG_DIR} ];
    then mkdir -p ${LOG_DIR}
fi

# italy services java
MS_IT_SERVICE='it-services'
MS_IT_SERVICE_PID="`ps -ef | grep ${MS_IT_SERVICE} | grep -v "grep" | awk -F ' ' '{print $2}'`"
MS_IT_SERVICE_DIR="ecg-testcase-micro-services/${MS_IT_SERVICE}"
# italy services java

# bolt services java
MS_BOLT_SERVICE='bolt-services'
MS_BOLT_SERVICE_PID="`ps -ef | grep ${MS_BOLT_SERVICE} | grep -v "grep" | awk -F ' ' '{print $2}'`"
MS_BOLT_SERVICE_DIR="ecg-testcase-micro-services/${MS_BOLT_SERVICE}"
# bolt services java

# australia services java
MS_AU_SERVICE='au-services'
MS_AU_SERVICE_PID="`ps -ef | grep ${MS_AU_SERVICE} | grep -v "grep" | awk -F ' ' '{print $2}'`"
MS_AU_SERVICE_DIR="ecg-testcase-micro-services/${MS_AU_SERVICE}"
# australia services java

# mobile services java
MS_MOBILE_SERVICE='mobile-services'
MS_MOBILE_SERVICE_PID="`ps -ef | grep ${MS_MOBILE_SERVICE} | grep -v "grep" | awk -F ' ' '{print $2}'`"
MS_MOBILE_SERVICE_DIR="ecg-testcase-micro-services/${MS_MOBILE_SERVICE}"
# mobile services java


# frontend services node.js
MS_FRONTEND='ecg-testcase-frontend'
MS_FRONTEND_PID="`ps -ef | grep ${MS_FRONTEND} | grep -v "grep" | awk -F ' ' '{print $2}'`"
MS_FRONTEND_DIR=${MS_FRONTEND}
# frontend services node.js

LOG "starting"
LOG "current directory is `pwd`"
LOG "check binary files built"
/bin/bash ./build.production.sh

if [ -d ${BASE_DIR}/${MS_FRONTEND_DIR}/dist ];
    then
        LOG "front end binary files existed"
    else
        LOG "front end binary files not existed, exit...." && exit -1
fi
if [ -d ${BASE_DIR}/${MS_IT_SERVICE_DIR}/target ];
    then
        LOG "it service binary files existed.."
    else
        LOG "it service binary files not existed, exit...." && exit -1
fi

if [ ! -z ${MS_FRONTEND_PID} ];
    then 
        LOG "killing front end"
        LOG "frontend pid are: ${MS_FRONTEND_PID}"
        killall gulp node && LOG "killing front end successfully"
fi

if [ ! -z ${MS_IT_SERVICE_PID} ];
    then
        LOG "killing it-service"
        LOG "it-service pid are: ${MS_IT_SERVICE_PID}"
        kill -9 ${MS_IT_SERVICE_PID} && LOG "killing it service successfully"
fi

if [ ! -z ${MS_BOLT_SERVICE_PID} ];
    then
        LOG "killing bolt-service"
        LOG "bolt-service pid are: ${MS_BOLT_SERVICE_PID}"
        kill -9 ${MS_BOLT_SERVICE_PID} && LOG "killing bolt service successfully"
fi

if [ ! -z ${MS_AU_SERVICE_PID} ];
    then
        LOG "killing au-service"
        LOG "au-service pid are: ${MS_AU_SERVICE_PID}"
        kill -9 ${MS_AU_SERVICE_PID} && LOG "killing au service successfully"
fi

if [ ! -z ${MS_MOBILE_SERVICE_PID} ];
    then
        LOG "killing mobile-service"
        LOG "mobile-service pid are: ${MS_MOBILE_SERVICE_PID}"
        kill -9 ${MS_MOBILE_SERVICE_PID} && LOG "killing mobile service successfully"
fi

cd ${BASE_DIR}/${MS_FRONTEND}
nohup ${BASE_DIR}/${MS_FRONTEND_DIR}/production.build.sh start>${LOG_DIR}/frontend.log &

cd ${BASE_DIR}/${MS_IT_SERVICE_DIR}/target
nohup java -jar *.jar>${LOG_DIR}/it-service.log &

cd ${BASE_DIR}/${MS_BOLT_SERVICE_DIR}/target
nohup java -jar *.jar>${LOG_DIR}/bolt-service.log &

cd ${BASE_DIR}/${MS_AU_SERVICE_DIR}/target
nohup java -jar *.jar>${LOG_DIR}/au-service.log &

cd ${BASE_DIR}/${MS_MOBILE_SERVICE_DIR}/target
nohup java -jar *.jar>${LOG_DIR}/mobile-service.log &

LOG "started !!"
exit 0
