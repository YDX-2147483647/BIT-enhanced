// ==UserScript==
// @name         BIT-乐学-消除姓名中空格
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  消除中文姓名中间的空格
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/forum/discuss.php*
// @match        http://lexue.bit.edu.cn/mod/forum/view.php*
// @match        http://lexue.bit.edu.cn/user/profile.php*
// @match        http://lexue.bit.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let selectors = [
        "a[href*='/user/view.php']", // 通用
        ".usertext", // 通用：header 中头像的左边
        ".fullname", // 首页-已登录用户
        "author-info > .text-truncate", // forum/view.php
        "#page-header h1, head title" // user/profile.php
        // "[data-region='members-list-container'] [data-route='view-conversation'] > h6.ml-2" // 通用：消息菜单-小组-参与者；动态且不常用，不管了。
    ];
    document.querySelectorAll(selectors.join(", ")).forEach(e => {
        if(!e.textContent.match(/[a-zA-Z]/)){
            e.textContent = e.textContent.replaceAll(" ", "");
        }
    });
})();
