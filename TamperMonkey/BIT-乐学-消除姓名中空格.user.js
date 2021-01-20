// ==UserScript==
// @name         BIT-乐学-消除姓名中空格
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  消除中文姓名中间的空格
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/forum/discuss.php*
// @match        http://lexue.bit.edu.cn/mod/forum/view.php*
// @match        http://lexue.bit.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll("a[href*='/user/view.php'], .author-info > .text-truncate, .usertext, .fullname").forEach(e => {
        if(!e.textContent.match(/[a-zA-Z]/)){
            e.textContent = e.textContent.replaceAll(" ", "");
        }
    });
})();
