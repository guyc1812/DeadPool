#!/usr/bin/env bash

export D_SKIPTEST='-DskipTests=true'
DeadPool_service="DP-service"

LOG_DIR=$HOME'/DeadPool-logs'
if [ ! -d ${LOG_DIR} ];
    then mkdir -p ${LOG_DIR}
fi

LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

LOG 'build backend start'
bash ./mvnw clean package ${D_SKIPTEST}
LOG 'build backend successfully'

LOG 'start service'
cd ${DeadPool_service}/target
nohup java -jar DP-service-1.0.snapshot.jar>${LOG_DIR}/DeadPool-service.log &

LOG "started !!"
