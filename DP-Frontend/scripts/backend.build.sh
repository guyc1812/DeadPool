#!/usr/bin/env bash

export D_SKIPTEST='-DskipTests=true'
export LOG_PREFIX="\n\033[1m[testcase-platform]\033[0m[`date -u`]\t"
LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

LOG 'pull from git start'
git pull origin master
LOG 'pull from git end'

LOG 'build start'
bash ./mvnw clean package ${D_SKIPTEST}
LOG 'build success'