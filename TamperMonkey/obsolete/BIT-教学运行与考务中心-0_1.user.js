// ==UserScript==
// @name         BIT-教学运行与考务中心
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修改页面标题
// @author       Y.D.X.
// @match        https://jxzx.bit.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let title = document.querySelector(".pageArticle > .articleTitle > h2");
    if(title)
        document.querySelector("head > title").text = title.textContent.trim() + " - 教学运行与考务中心 | 北京理工大学";
})();
