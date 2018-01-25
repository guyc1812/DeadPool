#!/bin/bash

export LOG_PREFIX="\n\033[1m[testcaseUI]\033[0m[`date -u`]\t"

# change directory to testcaseUI root directory
export PWD=`dirname $0`

# get node binary files env
tar xzf node-binary/node-v6.9.1-linux-x64.tar.gz -C /tmp
export NODE_HOME="/tmp/node-v6.9.1-linux-x64"
export PATH=${NODE_HOME}/bin:$PATH

LOG() {
  echo -e "${LOG_PREFIX}$1\n"
}

testcaseUI_env_prepare () {

    LOG "starting install gulp-cli and bower globally"                                                      &&\
    npm install gulp-cli bower -g                                                                           &&\
    #reset PATH variables again to use globally installed package
    export PATH=${NODE_HOME}/bin:$PATH
    LOG "install gulp-cli and bower globally successfully"                                                  &&\
    LOG "starting install npm packages and bower packages"                                                  &&\
    npm run prestart                                                                                        &&\
    LOG "install npm packages and bower packages successfully"

}

testcaseUI_test_unit () {

    LOG "starting unit test"                                                                                &&\
    gulp test:client
    if [ $? -eq 0 ]; then
        LOG "unit test finish successfully"
    else
        LOG "unit test failed"
        exit $?
    fi

}

testcaseUI_test_e2e () {

    LOG "starting e2e test"                                                                                 &&\
    gulp test:e2e
    if [ $? -eq 0 ]; then
        LOG "e2e test finish successfully"
    else
        LOG "e2e test failed"
        exit $?
    fi

}

testcaseUI_build_production() {

    LOG "starting production build"                                                                         &&\
    gulp build
    if [ $? -eq 0 ]; then
        LOG "production build finish successfully"
    else
        LOG "production build failed"
        exit $?
    fi

}

testcaseUI_start () {
    echo -e "\n$LOG_PREFIX        starting production server     \n"                                        &&\
    gulp start:server:prod
    if [ $? -eq 0 ]; then
        echo -e "\n$LOG_PREFIX         production server started successfully\n"
    else
        echo -e "\n$LOG_PREFIX         production server starting failed\n"
        exit $?
    fi
}

testcaseUI_check_os() {
   case "$OSTYPE" in
       solaris*) echo -e "SOLARIS"          ;;
       darwin*)  echo -e "OSX"              ;;
       linux*)   echo -e "LINUX"            ;;
       bsd*)     echo -e "BSD"              ;;
       msys*)    echo -e "WINDOWS"          ;;
       *)        echo -e "unknown: $OSTYPE" ;;
   esac
}

## get OS env
export testcaseUIOS=`testcaseUI_check_os`
LOG "*current OS: ${testcaseUIOS}"
LOG "*change directory to testcaseUI root directory: ${PWD}"
cd $PWD

if [ "${testcaseUIOS}" != "LINUX" ]; then

    echo -e "\nWarning:        this script is currently only used by CI, production env to deploy and test"
    echo -e "                for local development, please read README.md to setup....\n"
    echo -e "                exiting....\n"
    exit 0

elif [ "$1" = "build" ]; then

    testcaseUI_env_prepare                                                                                  &&\
    testcaseUI_build_production

elif [ "$1" = "test" ]; then

   #testcaseUI_env_prepare                                                                                  &&\
    testcaseUI_test_unit                                                                                    &&\
    testcaseUI_test_e2e

elif [ "$1" = "test:unit" ]; then

   #testcaseUI_env_prepare                                                                                  &&\
    testcaseUI_test_unit

elif [ "$1" = "test:e2e" ]; then

   #testcaseUI_env_prepare                                                                                  &&\
    testcaseUI_test_e2e

elif [ "$1" = "all" ]; then

    testcaseUI_env_prepare                                                                                  &&\
    testcaseUI_test_unit                                                                                    &&\
    testcaseUI_test_e2e                                                                                     &&\
    testcaseUI_build_production

elif [ "$1" = "start" ]; then

    #testcaseUI_env_prepare                                                                                 &&\
    #testcaseUI_build_production
    testcaseUI_start

else

    echo -e "Usage:          frontend.build.sh ( commands ... )"
    echo -e "commands: "
    echo -e "    start       Start production server without any test"
    echo -e "    build        Start production build without any test"
    echo -e "    test        Start testing both unit test and e2e test"
    echo -e "    test:unit   Start unit test"
    echo -e "    test:e2e    Start e2e test"
    echo -e "    all         Start testing both unit test and e2e test, if both succeed start production build"
    echo -e ""
    exit 1

fi
