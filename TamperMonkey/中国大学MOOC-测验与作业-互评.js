// ==UserScript==
// @name         中国大学MOOC-测验与作业-互评
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将所有空项设为满分
// @author       Y.D.X.
// @match        https://www.icourse163.org/learn*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function fill_full_mark() {
        document.querySelectorAll(".j-homework-box .j-list .u-questionItem .u-point .s").forEach(
            (label_list) => {
                // 中国大学 MOOC 会默认选零分
                if (label_list.querySelector("label:first-child > input").checked) {
                    label_list.querySelector("label:last-child > input").checked = true;
                }
            }
        )
        document.querySelectorAll(".j-homework-box .j-list .u-questionItem .comment textarea").forEach(
            (textarea) => {
                if (textarea.textLength == 0) {
                    textarea.value = "无误。";
                }
            }
        )
    }

    function add_button() {
        let header = document.querySelector("#g-body > div.m-learnhead > div");

        let button = document.createElement('button');
        button.type = 'button';
        button.innerText = "全部设为满分";
        button.style.padding = '0.5em .2em';
        button.addEventListener("click", fill_full_mark);

        header.appendChild(button);
    }



    if (/#\/learn\/hw\?id=\d+/.test(window.location.hash)) {
        add_button();
    }

})();