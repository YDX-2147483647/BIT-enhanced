// ==UserScript==
// @name         BIT-Programming-Copy preset code
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  在预设代码处添加复制按钮
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/programming/view.php?*
// @grant        none
// ==/UserScript==

// 能获取代码，但无法复制

(function() {
    'use strict';

    function timeoutPromise(action, interval){
        // https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                action();
                resolve("done");
            }, interval);
        });
    };
    // interval's unit: ms.
    function wait_until_presence(selector, interval){
        return new Promise((resolve, reject) => {
            let check = setInterval(function(){
                if(document.querySelector(selector)){
                    clearInterval(check);
                    resolve(document.querySelector(selector));
                }
            }, interval);
        });
    }
    
    function copy_this_code(sender){
        while (sender != null && sender.className.indexOf('dp-highlighter') == -1)
            sender = sender.parentNode;

        let code = dp.sh.Utils.FixForBlogger(sender.highlighter.originalCode);
        console.log(code);
        // 乐学不是HTTPS，不支持 navigator.clipboard ！

        return false;
    }
    
    if(document.querySelector(".presetcode")){
        wait_until_presence(".dp-highlighter > .bar > .tools", 100).then(toolbar => {
            let copy_button = document.createElement("a");
            copy_button.href = "#";
            copy_button.textContent = "copy";
            copy_button.onclick = function(){
                copy_this_code(this);
                return false;
            };
            toolbar.appendChild(copy_button);
        });
    }


})();