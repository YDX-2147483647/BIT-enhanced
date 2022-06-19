// ==UserScript==
// @name         BIT-Programming-Jump to result
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  提交之后自动单击“查看结果”
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/mod/programming/submit.php
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function jump_to_result() {
        const button = document.querySelector("a[href^=result]");
        if (button) {
            button.click();
        }
    }
    window.setInterval(jump_to_result, 1000);
})();