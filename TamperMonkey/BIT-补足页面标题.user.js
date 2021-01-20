// ==UserScript==
// @name         BIT-补足页面标题
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  修改页面标题
// @author       Y.D.X.
// @match        https://*.bit.edu.cn/*
// @grant        none
// ==/UserScript==

// 上一版本：BIT-教学运行与考务中心（0.1）。

(function() {
    'use strict';

    let matches = [
        {
            host: "jxzx", title_selectors: [
                ".pageArticle > .articleTitle > h2",
                ".pagelistTitle > h2"
            ]
        },
        {
            host: "itc", title_selectors: [
                ".pageArticle > .pageArticleTitle > h3#shareTitle",
                "body > div > div.subPage > div.sub_right > h2",
                "body > div > div.subPage > div > h2"
            ]
        }
    ];

    let page_title = document.querySelector("head > title");
    let site_name = page_title.text.match(/北京理工大学(.+)/);
    let site_host = window.location.host;
    if(site_name){
        site_name = site_name[1];

        let title = null;

        for(var s of matches){
            if(site_host == `${s.host}.bit.edu.cn`){
                for(var title_selector of s.title_selectors){
                    if(document.querySelector(title_selector)){
                        title = document.querySelector(title_selector).textContent.trim();
                        break;
                    }
                }
                break;
            }
        }

        if(title){
            page_title.text = `${title} - ${site_name} | 北京理工大学`;
        }
    }
})();
