#!/usr/bin/env bash

LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

checkOS() {
   case "$OSTYPE" in
       solaris*) echo -e "SOLARIS"          ;;
       darwin*)  echo -e "OSX"              ;;
       linux*)   echo -e "LINUX"            ;;
       bsd*)     echo -e "BSD"              ;;
       msys*)    echo -e "WINDOWS"          ;;
       *)        echo -e "unknown: $OSTYPE" ;;
   esac
}

prepare () {

    LOG "starting install gulp-cli globally"                                                                &&\
    npm install gulp-cli -g                                                                                 &&\
    LOG "install gulp-cli globally successfully"                                                            &&\

    LOG "starting install npm packages and bower packages"                                                  &&\
    npm run prestart                                                                                        &&\
    LOG "install npm packages and bower packages successfully"

}

build() {

    LOG "starting production build"                                                                         &&\
    gulp build
    if [ $? -eq 0 ]; then
        LOG "production build finish successfully"
    else
        LOG "production build failed"
        exit $?
    fi

}

start () {
    echo -e "\n$LOG_PREFIX        starting production server     \n"                                        &&\
    gulp start:server:prod
    if [ $? -eq 0 ]; then
        echo -e "\n$LOG_PREFIX         production server started successfully\n"
    else
        echo -e "\n$LOG_PREFIX         production server starting failed\n"
        exit $?
    fi
}

## get OS env
export OS=`checkOS`
LOG "*current OS: ${OS}"
LOG "*change directory to DeadPool root directory: ${PWD}"
cd $PWD

if [ "${OS}" != "LINUX" ]; then

    echo -e "\nWarning:        this script is currently only used by CI, production env to deploy and test"
    echo -e "                for local development, please read README.md to setup....\n"
    echo -e "                exiting....\n"
    exit 0

elif [ "$1" = "build" ]; then

    prepare                                                                                                 &&\
    build

elif [ "$1" = "start" ]; then

    start

else

    echo -e "Usage:          production.build.sh ( commands ... )"
    echo -e "commands: "
    echo -e "    start       Start production server without any test"
    echo -e "    build        Start production build without any test"
    echo -e ""
    exit 1

fi
