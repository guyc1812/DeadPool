const blockInternetExplorerTpl = `
<style>
    a,
    abbr,
    acronym,
    address,
    applet,
    article,
    aside,
    audio,
    b,
    big,
    blockquote,
    body,
    canvas,
    caption,
    center,
    cite,
    code,
    dd,
    del,
    details,
    dfn,
    div,
    dl,
    dt,
    em,
    embed,
    fieldset,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    header,
    hgroup,
    html,
    i,
    iframe,
    img,
    ins,
    kbd,
    label,
    legend,
    li,
    mark,
    menu,
    nav,
    object,
    ol,
    output,
    p,
    pre,
    q,
    ruby,
    s,
    samp,
    section,
    small,
    span,
    strike,
    strong,
    sub,
    summary,
    sup,
    table,
    tbody,
    td,
    tfoot,
    th,
    thead,
    time,
    tr,
    tt,
    u,
    ul,
    var,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
        outline: 0
    }
    
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block
    }
    
    body {
        line-height: 1
    }
    
    ol,
    ul {
        list-style: none
    }
    
    blockquote,
    q {
        quotes: none
    }
    
    blockquote:after,
    blockquote:before,
    q:after,
    q:before {
        content: '';
        content: none
    }
    
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
    
    .muted {
        color: #929fa6
    }
    
    .color-1 {
        color: #35cd96!important
    }
    
    .color-2 {
        color: #6bcbef!important
    }
    
    .color-3 {
        color: #e542a3!important
    }
    
    .color-4 {
        color: #91ab01!important
    }
    
    .color-5 {
        color: #ffa97a!important
    }
    
    .color-6 {
        color: #1f7aec!important
    }
    
    .color-7 {
        color: #dfb610!important
    }
    
    .color-8 {
        color: #029d00!important
    }
    
    .color-9 {
        color: #8b7add!important
    }
    
    .color-10 {
        color: #fe7c7f!important
    }
    
    .color-11 {
        color: #ba33dc!important
    }
    
    .color-12 {
        color: #59d368!important
    }
    
    .color-13 {
        color: #b04632!important
    }
    
    .color-14 {
        color: #fd85d4!important
    }
    
    .color-15 {
        color: #8393ca!important
    }
    
    .color-16 {
        color: #ff8f2c!important
    }
    
    .color-17 {
        color: #a3e2cb!important
    }
    
    .color-18 {
        color: #b4876e!important
    }
    
    .color-19 {
        color: #c90379!important
    }
    
    .color-20 {
        color: #ef4b4f!important
    }
    
    .bg-color-1 {
        background-color: #35cd96!important
    }
    
    .bg-color-2 {
        background-color: #6bcbef!important
    }
    
    .bg-color-3 {
        background-color: #e542a3!important
    }
    
    .bg-color-4 {
        background-color: #91ab01!important
    }
    
    .bg-color-5 {
        background-color: #ffa97a!important
    }
    
    .bg-color-6 {
        background-color: #1f7aec!important
    }
    
    .bg-color-7 {
        background-color: #dfb610!important
    }
    
    .bg-color-8 {
        background-color: #029d00!important
    }
    
    .bg-color-9 {
        background-color: #8b7add!important
    }
    
    .bg-color-10 {
        background-color: #fe7c7f!important
    }
    
    .bg-color-11 {
        background-color: #ba33dc!important
    }
    
    .bg-color-12 {
        background-color: #59d368!important
    }
    
    .bg-color-13 {
        background-color: #b04632!important
    }
    
    .bg-color-14 {
        background-color: #fd85d4!important
    }
    
    .bg-color-15 {
        background-color: #8393ca!important
    }
    
    .bg-color-16 {
        background-color: #ff8f2c!important
    }
    
    .bg-color-17 {
        background-color: #a3e2cb!important
    }
    
    .bg-color-18 {
        background-color: #b4876e!important
    }
    
    .bg-color-19 {
        background-color: #c90379!important
    }
    
    .bg-color-20 {
        background-color: #ef4b4f!important
    }
    
    .fx-ripple-element {
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50
    }
    
    .fx-ripple-element svg {
        width: 100%;
        height: auto
    }
    
    .fx-ripple-element.is-clicked {
        -webkit-animation: ripple-click .06s ease-out;
        animation: ripple-click .06s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards
    }
    
    .fx-ripple-element.is-released {
        -webkit-animation: ripple-release .8s ease-out;
        animation: ripple-release .8s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards
    }
    
    @-webkit-keyframes ripple-click {
        0% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    
    @keyframes ripple-click {
        0% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    
    @-webkit-keyframes ripple-release {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
    
    @keyframes ripple-release {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
    
    #window,
    .app-wrapper-web .app,
    .btn:hover {
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .06), 0 2px 5px 0 rgba(0, 0, 0, .2)
    }
    
    .draggable-container {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    
    .draggable {
        -webkit-transform-origin: left top;
        transform-origin: left top;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: grab!important
    }
    
    .draggable.dragging {
        cursor: grabbing!important
    }
    
    body {
        background-color: #dfdfdf;
        background-image: -webkit-linear-gradient(top, #dddbd1, #d2dbdc);
        background-image: linear-gradient(to bottom, #dddbd1, #d2dbdc);
        font-family: Roboto, sans-serif;
        color: #4b4b4b;
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern";
        -webkit-font-feature-settings: "kern";
        -moz-font-feature-settings: "kern";
        -moz-font-feature-settings: "kern=1"
    }
    
    body.native.darwin {
        font-family: system, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Lucida Grande"
    }
    
    html[dir=rtl] {
        direction: rtl
    }
    
    .draggable-header {
        -webkit-app-region: drag;
        height: 59px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0
    }
    
    .app-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden
    }
    
    @media screen and (max-width:648px) {
        .app-wrapper {
            overflow-x: auto
        }
    }
    
    @media screen and (max-height:500px) {
        .app-wrapper {
            overflow-y: auto
        }
    }
    
    .app-wrapper::after {
        position: fixed;
        z-index: -1;
        background-color: rgb(33, 150, 243);
        width: 100%;
        height: 127px;
        content: '';
        top: 0;
        left: 0
    }
    
    input {
        margin: 0;
        font-family: Roboto, sans-serif
    }
    
    button {
        border: 0;
        padding: 0;
        margin: 0;
        background: 0 0;
        outline: 0;
        cursor: pointer;
        font-family: inherit
    }
    
    pre {
        white-space: pre-wrap
    }
    
    ol,
    ul {
        padding: 0;
        margin: 0
    }
    
    a {
        text-decoration: none
    }
    
    .hidden {
        opacity: 0
    }
    
    .off {
        display: none
    }
    
    .app {
        position: relative;
        overflow: hidden;
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-animation: app-enter .3s cubic-bezier(.1, .82, .25, 1);
        animation: app-enter .3s cubic-bezier(.1, .82, .25, 1);
        background-position: top left;
        background-repeat: repeat-x;
        background-color: #f7f7f7;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex
    }
    
    @media screen and (max-width:648px) {
        .app {
            min-width: 648px
        }
    }
    
    @media screen and (max-height:500px) {
        .app {
            min-height: 500px
        }
    }
    
    .no-animation {
        -webkit-animation: none;
        animation: none
    }
    
    @media screen and (min-width:1200px) {
        .app-wrapper-web .app {
            width: 1118px;
            height: calc(100% - 38px);
            margin: 0 auto;
            top: 19px;
            border-radius: 3px
        }
    }
    
    @media screen and (min-width:1320px) {
        .app-wrapper-web .app {
            width: 1276px
        }
    }
    
    @media screen and (min-width:1440px) {
        .app-wrapper-web .app {
            width: 1380px
        }
    }
    
    @-webkit-keyframes app-enter {
        from {
            -webkit-transform: scale(1.4);
            transform: scale(1.4);
            opacity: 0
        }
        to {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1
        }
    }
    
    @keyframes app-enter {
        from {
            -webkit-transform: scale(1.4);
            transform: scale(1.4);
            opacity: 0
        }
        to {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1
        }
    }
    
    .app-wrapper-native .app {
        width: 100%;
        height: 100%;
        border-radius: 0;
        top: 0
    }
    
    @media screen and (max-width:1199px) {
        .app {
            width: 100%;
            height: 100%;
            border-radius: 0;
            top: 0
        }
    }
    
    @media screen and (max-width:900px) {
        .two .pane-one {
            width: 40%
        }
        .two .pane-two {
            width: 60%
        }
    }
    
    @media screen and (min-width:901px) and (max-width:1024px) {
        .two .pane-one {
            width: 35%
        }
        .two .pane-two {
            width: 65%
        }
    }
    
    @media screen and (min-width:1025px) and (max-width:1300px) {
        .two .pane-one {
            width: 35%
        }
        .two .pane-two {
            width: 65%
        }
    }
    
    @media screen and (min-width:1301px) {
        .two .pane-one {
            width: 30%
        }
        .two .pane-two {
            width: 70%
        }
    }
    
    @media screen and (max-width:900px) {
        .three .pane-one {
            width: 40%
        }
        .three .pane-two {
            width: 60%
        }
        .three .pane-three {
            position: absolute;
            left: 40%;
            width: 60%
        }
    }
    
    @media screen and (min-width:901px) and (max-width:1024px) {
        .three .pane-one {
            width: 35%
        }
        .three .pane-two {
            width: 65%
        }
        .three .pane-three {
            position: absolute;
            left: 35%;
            width: 65%
        }
    }
    
    @media screen and (min-width:1025px) and (max-width:1300px) {
        .three .pane-one {
            width: 30%
        }
        .three .pane-two {
            width: 40%
        }
        .three .pane-three {
            width: 30%
        }
    }
    
    @media screen and (min-width:1301px) {
        .three .pane-one {
            width: 25%
        }
        .three .pane-two {
            width: 45%
        }
        .three .pane-three {
            width: 30%
        }
    }
    
    .app-wrapper::before {
        height: 222px!important
    }
    
    body {
        overflow: visible;
        -webkit-font-smoothing: antialiased;
        -webkit-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto
    }
    
    #wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1
    }
    
    #window {
        background-color: #FFF;
        width: 800px;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -400px;
        margin-top: -200px
    }
    
    .window-body {
        padding: 48px 54px 54px;
        overflow: hidden
    }
    
    .image {
        vertical-align: middle;
        display: table-cell;
        width: 52px
    }
    
    .icon-chrome,
    .icon-edge,
    .icon-firefox,
    .icon-opera,
    .icon-safari {
        display: block;
        width: 48px;
        height: 48px;
        background-position: top center;
        background-repeat: no-repeat;
        background-size: contain
    }
    
    .icon-chrome {
        background-image: url(assets/img/blockIE/logo-google-chrome-small.png)
    }
    
    .icon-edge {
        background-image: url(assets/img/blockIE/logo-edge-small.png)
    }
    
    .icon-firefox {
        width: 52px;
        height: 52px;
        background-image: url(assets/img/blockIE/logo-firefox-small.png)
    }
    
    .icon-opera {
        background-image: url(assets/img/blockIE/logo-opera-small.png)
    }
    
    .icon-safari {
        background-image: url(assets/img/blockIE/logo-safari-small.png)
    }
    
    .page-version .icon-chrome {
        background-image: url(assets/img/blockIE/logo-google-chrome.png)
    }
    
    .page-version .icon-edge {
        background-image: url(assets/img/blockIE/logo-edge.png)
    }
    
    .page-version .icon-firefox {
        background-image: url(assets/img/logo-firefox.png)
    }
    
    .page-version .icon-opera {
        background-image: url(assets/img/blockIE/logo-opera.png)
    }
    
    .page-version .icon-safari {
        background-image: url(assets/img/blockIE/logo-safari.png)
    }
    
    @media only screen and (min-device-pixel-ratio:1.5),
    only screen and (-webkit-min-device-pixel-ratio:1.5),
    only screen and (min-resolution:1.5dppx) {
        .icon-chrome {
            background-image: url(assets/img/blockIE/logo-google-chrome-hq.png)!important
        }
        .icon-edge {
            background-image: url(assets/img/blockIE/logo-edge-hq.png)!important
        }
        .icon-firefox {
            background-image: url(assets/img/blockIE/logo-firefox-hq.png)!important
        }
        .icon-opera {
            background-image: url(assets/img/blockIE/logo-opera-hq.png)!important
        }
        .icon-safari {
            background-image: url(assets/img/blockIE/logo-safari-hq.png)!important
        }
    }
    
    .page-version .window-text {
        padding-left: 186px
    }
    
    .page-version .image {
        margin: 0 auto;
        width: 130px;
        height: 130px;
        background-color: #f6f8f8;
        border-radius: 50%;
        vertical-align: top
    }
    
    .page-version .icon-chrome,
    .page-version .icon-edge,
    .page-version .icon-firefox,
    .page-version .icon-opera,
    .page-version .icon-safari {
        margin-top: 30px;
        margin-left: 30px;
        width: 68px;
        height: 72px
    }
    
    .page-version .icon-firefox {
        width: 72px;
        height: 80px
    }
    
    .page-version .browser {
        width: auto
    }
    
    .window-title {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        color: #37474f;
        font-size: 60px;
        line-height: normal;
        margin-bottom: 8px
    }
    
    .window-subtitle {
        font-weight: 300;
        color: #37474f;
        font-size: 28px;
        line-height: normal;
        margin-bottom: 38px
    }
    
    .text-tip {
        color: #5b646b;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 20px
    }
    
    .text-tip a {
        color: #009788
    }
    
    .browsers {
        margin-bottom: 32px
    }
    
    .browsers:after {
        content: ' ';
        display: table;
        clear: both
    }
    
    .browser {
        float: left;
        width: 220px;
        display: table
    }
    
    .browser-safari {
        width: 300px
    }
    
    .browser-title {
        color: #929fa6;
        font-size: 14px;
        line-height: 17px;
        padding-left: 10px;
        display: table-cell;
        vertical-align: middle;
        height: 52px;
        text-align: left
    }
    
    @media screen and (max-width:880px),
    screen and (max-height:400px) {
        #wrapper {
            position: relative;
            padding-top: 20px;
            padding-bottom: 20px;
            height: auto
        }
        #window {
            position: relative;
            margin: 0 auto;
            top: 0;
            left: 0;
            width: 80%;
            min-width: 518px
        }
        .window-body {
            height: auto!important;
            min-width: 410px
        }
        .browsers {
            margin: 32px auto
        }
        .browser {
            display: inline-block;
            margin: 0 5px 20px
        }
        .browser:last-child {
            margin-bottom: 0
        }
        .icon-chrome,
        .icon-opera,
        .icon-safari {
            width: 48px;
            height: 48px
        }
        .icon-firefox {
            width: 52px;
            height: 52px
        }
        .page-version .window-text {
            padding-left: 156px
        }
    }
    
    @media screen and (max-width:518px) {
        #wrapper {
            padding: 0
        }
        #window {
            width: 100%;
            height: auto;
            border-radius: 0;
            min-width: 394px
        }
        .window-body {
            padding: 32px;
            min-width: 330px
        }
        .page-version .window-text {
            padding-left: 112px
        }
        .page-version .icon-chrome,
        .page-version .icon-edge,
        .page-version .icon-firefox,
        .page-version .icon-opera,
        .page-version .icon-safari {
            margin: 0
        }
        .page-version .image {
            background: 0 0;
            width: auto;
            height: auto
        }
        .page-version .browser {
            width: auto
        }
    }
    
    .action {
        margin-top: 48px
    }
    
    .btn {
        display: inline-block;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        padding: 10px 24px;
        color: #FFF;
        background-color: #08c65b;
        border-radius: 3px;
        -webkit-transition: box-shadow .18s ease-out, background .18s ease-out, color .18s ease-out;
        transition: box-shadow .18s ease-out, background .18s ease-out, color .18s ease-out;
        white-space: nowrap
    }
    
    .btn:hover {
        color: #FFF;
        background-color: #0cb757
    }
    
    html[dir=rtl] .browser {
        float: right
    }
    
    html[dir=rtl] .browser-title {
        text-align: right;
        padding-left: 0;
        padding-right: 10px
    }
    
    html[dir=rtl] .page-version .window-text {
        padding-left: 0;
        padding-right: 186px
    }
    
    html[dir=rtl] .page-version .browser {
        float: right
    }
    
    html[dir=rtl] .page-version .icon-chrome,
    html[dir=rtl] .page-version .icon-edge,
    html[dir=rtl] .page-version .icon-firefox,
    html[dir=rtl] .page-version .icon-opera,
    html[dir=rtl] .page-version .icon-safari {
        margin-left: 0;
        margin-right: 30px
    }
    
    @media screen and (max-width:880px),
    screen and (max-height:400px) {
        html[dir=rtl] .page-version .window-text {
            padding-left: 0;
            padding-right: 156px
        }
    }
    
    @media screen and (max-width:518px) {
        html[dir=rtl] .page-version .window-text {
            padding-left: 0;
            padding-right: 112px
        }
        html[dir=rtl] .page-version .icon-chrome,
        html[dir=rtl] .page-version .icon-edge,
        html[dir=rtl] .page-version .icon-firefox,
        html[dir=rtl] .page-version .icon-opera,
        html[dir=rtl] .page-version .icon-safari {
            margin: 0
        }
    }
</style>
<div class="app-wrapper">
    <div id="wrapper">
        <div id="window">
            <div class="window-body">
                <div class="window-text">
                    <div class="text-tip">tns recommends using these browsers for better use experience</div>
                    <div class="browsers">
                        <div class="browser">
                            <a class="image" href="http://www.google.com/chrome/" target="_blank">
                                <span class="icon-chrome"></span>
                            </a>
                            <a href="http://www.google.com/chrome/" class="browser-title" target="_blank">Google Chrome</a>
                        </div>
                        <div class="browser">
                            <a class="image" href="http://www.firefox.com" target="_blank">
                                <span class="icon-firefox"></span>
                            </a>
                            <a href="http://www.firefox.com" class="browser-title" target="_blank">Mozilla Firefox</a>
                        </div>
                        <div class="browser">
                            <a class="image" href="http://www.opera.com" target="_blank">
                                <span class="icon-opera"></span>
                            </a>
                            <a href="http://www.opera.com" class="browser-title" target="_blank">Opera</a>
                        </div>
                    </div>
                    <div class="text-tip">iPerf supports: </div>
                    <div class="browsers">
                        <div class="browser">
                            <a class="image" href="https://www.microsoft.com/en-us/windows/microsoft-edge" target="_blank">
                                <span class="icon-edge"></span>
                            </a>
                            <a href="https://www.microsoft.com/en-us/windows/microsoft-edge" class="browser-title" target="_blank">Microsoft Edge</a>
                        </div>
                        <div class="browser browser-safari">
                            <a class="image" href="https://support.apple.com/downloads/#safari" target="_blank">
                                <span class="icon-safari"></span>
                            </a>
                            <a href="https://support.apple.com/downloads/#safari" class="browser-title" target="_blank">Safari（MacOS 10.8 or higher version）</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
module.exports = blockInternetExplorerTpl;
