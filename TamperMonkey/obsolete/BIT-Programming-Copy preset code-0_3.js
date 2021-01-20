// ==UserScript==
// @name         BIT-Programming-Copy preset code
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  简化预设代码的复制操作
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/programming/view.php?*
// @grant        none
// ==/UserScript==

// 可以复制了，但内容需要HTML转义。

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
    
    function get_this_code(sender){
        while (sender != null && sender.className.indexOf('dp-highlighter') == -1)
            sender = sender.parentNode;

        let code = dp.sh.Utils.FixForBlogger(sender.highlighter.originalCode);
        
        return code;
    }
    
    if(document.querySelector(".presetcode")){
        wait_until_presence(".dp-highlighter > .bar > .tools", 100).then(toolbar => {
            let copy_button = document.createElement("pre");
            copy_button.textContent = "(copy me to copy the whole)";

            // Style
            copy_button.style.fontSize = "0.9em";
            copy_button.style.color = "#a0a0a0";
            copy_button.style.backgroundColor = "inherit";
            copy_button.style.textDecoration = "none";
            copy_button.style.marginLeft = "10px";
            copy_button.style.fontFamily = "sans-serif";
            copy_button.style.display = "inline";
            
            copy_button.addEventListener("copy", function(e){
                e.clipboardData.setData("text/plain", get_this_code(e.target));
                e.preventDefault();
            });
            
            toolbar.appendChild(copy_button);
        });
    }


})();