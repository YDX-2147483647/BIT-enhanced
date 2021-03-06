// ==UserScript==
// @name         BIT-乐学-消除姓名中空格
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  消除中文姓名中间的空格
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/forum/discuss.php*
// @match        http://lexue.bit.edu.cn/mod/forum/view.php*
// @match        http://lexue.bit.edu.cn/user/profile.php*
// @match        http://lexue.bit.edu.cn/user/view.php*
// @match        http://lexue.bit.edu.cn/mod/assign/view.php*
// @match        http://lexue.bit.edu.cn/grade/report/*
// @match        http://lexue.bit.edu.cn/*
// @match        https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421fcf25989227e6a596a468ca88d1b203b/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let selectors = [
        "a[href*='/user/view.php'], #page-navbar a[href*='/user/profile.php']", // 通用
        ".usertext", // 通用：header 中头像的左边
        ".fullname", // 首页-已登录用户
        "author-info > .text-truncate", // forum/view.php
        "#page-header h1, head title", // user/profile.php
        "#page-content .userprofile .page-header-headings > h2", // user/view.php
        // "[data-region='members-list-container'] [data-route='view-conversation'] > h6.ml-2" // 通用：消息菜单-小组-参与者；动态且不常用，不管了。
    ];

    function trim_name(element) {
        if (!element.textContent.match(/[a-zA-Z]/)) {
            element.textContent = element.textContent.replaceAll(" ", "");
        }
    }
    function trim_name_string(name) {
        if (!/[a-zA-Z]/.test(name))
            return name.replaceAll(" ", "");
        else
            return name;
    }

    // assign/view.php
    // 整理评分人名字这一格的格式。
    if (document.querySelector(".feedback table.generaltable")) {
        let cell_gradedBy = document.querySelector(".feedback table.generaltable > tbody > tr:last-child > td:last-child");
        let user_url = cell_gradedBy.querySelector("a").href;
        let user_name = cell_gradedBy.textContent;
        cell_gradedBy.innerHTML = `<a href="${user_url}">${user_name}</a >`;
    }

    // grade/report/(overview|user)/index.php
    if (/^\/grade\/report\/(overview|user)\/index\.php$/.test(window.location.pathname)) {
        let headline = document.querySelector("#page-content  #region-main > [role='main'] > #maincontent + h2");
        if (headline) {
            headline.textContent = headline.textContent.replace(/^(.{2}报表) - (.+)$/, (match, prefix, name) => {
                return [prefix, trim_name_string(name)].join(' - ');
            });
        }
    }

    document.querySelectorAll(selectors.join(", ")).forEach(trim_name);

})();
