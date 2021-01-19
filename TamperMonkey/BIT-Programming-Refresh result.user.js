// ==UserScript==
// @name         BIT-Programming-Refresh result
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动刷新结果页
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/programming/result.php?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function auto_refresh(){
        var titles = document.querySelectorAll("[role=main] > h3");
        if(titles[titles.length - 1].innerText != "测试结果"){
            location.reload();
        }
    }
    window.setInterval(auto_refresh, 2000);
})();