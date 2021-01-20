// ==UserScript==
// @name         BIT-Programming-Copy preset code
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  在预设代码处添加复制按钮
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/programming/view.php?*
// @grant        none
// ==/UserScript==

// 看了一下 shCore.js ，发现人家都写好了……
// 结果试了一下，发现不能用………

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
    
    if(document.querySelector(".presetcode")){
        wait_until_presence(".dp-highlighter > .bar > .tools", 100).then(toolbar => {
            let copy_button = document.createElement("a");
            copy_button.href = "#";
            copy_button.textContent = "copy";

            copy_button.onclick = function(){
                dp.sh.Toolbar.Command('CopyToClipboard',this);
                return false;
            };
            
            toolbar.appendChild(copy_button);
        });
    }


})();