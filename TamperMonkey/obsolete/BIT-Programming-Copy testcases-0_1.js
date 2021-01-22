// ==UserScript==
// @name         BIT-Programming-Copy testcases
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  简化测试输入、输出的复制操作
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/programming/view.php?*
// @match        http://lexue.bit.edu.cn/mod/programming/result.php?*
// @grant        none
// ==/UserScript==

// 尚不可用

(function() {
    'use strict';

    function get_plaintext(url){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(){
            if(xhr.status == 200)
                return xhr.responseText;
            else
                console.log(xhr);
        }
        xhr.send();
    }

    document.querySelectorAll("a[href*='download=0']").forEach(
        function(a){
            let copy_button = document.createElement("pre");
            copy_button.textContent = "(copy)";

            // Style
            copy_button.style.fontSize = "9pt";
            copy_button.style.margin = "0.5em";
            copy_button.style.display = "inline";
            copy_button.style.color = "darkgray";
            
            // TODO: 这会引起大量不必要的GET，还不管用……
            let plaintext = get_plaintext(a.href);
            copy_button.addEventListener("copy", function(event){
                event.clipboardData.setData("text/plain", plaintext);
                event.preventDefault();
            });

            a.parentNode.insertBefore(copy_button, a.parentNode.lastChild);
        }
    );


})();
