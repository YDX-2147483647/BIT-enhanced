// ==UserScript==
// @name         BIT-乐学-消除姓名中空格
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  消除中文姓名中间的空格
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/forum/discuss.php*
// @match        http://lexue.bit.edu.cn*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll("a[href*='/user/view.php'], .usertext, .fullname").forEach(e => {
        console.log(e);
        if(!e.textContent.match(/[a-zA-Z]/)){
            e.textContent = e.textContent.replaceAll(" ", "");
        }
    });
})();
