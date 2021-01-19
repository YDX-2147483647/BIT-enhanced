// ==UserScript==
// @name         BIT-乐学-通知偏好
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将“打开”“关闭”换成“开”“关”，因为设计只允许一个字
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/message/notificationpreferences.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll(".on-text").forEach(s => {s.textContent = "开";});
    document.querySelectorAll(".off-text").forEach(s => {s.textContent = "关";});
})();