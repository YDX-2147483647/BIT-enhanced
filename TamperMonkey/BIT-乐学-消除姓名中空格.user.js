// ==UserScript==
// @name         BIT-乐学-消除姓名中空格
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  消除中文姓名中间的空格
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/forum/discuss.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll("a[href*='/user/view.php']").forEach(e => {
        if(!e.text.match(/[a-zA-Z]/)){
            e.text = e.text.replace(" ", "");
        }
    });
})();
