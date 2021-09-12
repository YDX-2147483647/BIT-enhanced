// ==UserScript==
// @name         BIT-补足页面标题
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  修改页面标题
// @author       Y.D.X.
// @match        https://*.bit.edu.cn/*
// @match        http://*.bit.edu.cn/*
// @exclude      http://lexue.bit.edu.cn/*
// @exclude      https://www.bit.edu.cn/xww/*
// @exclude      https://webvpn.bit.edu.cn/*
// @exclude      http://jxzxehallapp.bit.edu.cn/*
// @grant        none
// ==/UserScript==

// 旧版本：BIT-教学运行与考务中心（0.1）。

(function () {
    'use strict';

    // 优先使用在前面的 title_selector
    var matches = [
        { // 教学中心
            host: "jxzx", title_selectors: [
                ".pageArticle > .articleTitle > h2",
                ".pagelistTitle > h2"
            ]
        },
        { // Information Technology Center
            host: "itc", title_selectors: [
                ".pageArticle > .pageArticleTitle > h3#shareTitle",
                "body > div > div.subPage > div.sub_right > h2",
                "body > div > div.subPage > div > h2"
            ]
        },
        { // 教务处
            host: "jwc", title_selectors: [
                ".pageArticle > .aca_article > h2",
                ".pageArticle > .articleTitle > h2"
            ]
        },
        { // World Wide Web
            host: "www", title_selectors: [
                ".subPage > .container > .subRight  > .newsTitle > h1",
                ".subPage > .container > .listTitle02 > h2",
                ".bread > .container > a:nth-last-child(1)"
            ]
        },
        { // I
            host: "i", title_selectors: [
                // 从首页进去，怎么单击都是页面内跳转，URL不变。想检测的话要一直运行这个脚本，干脆算了吧……
                ".special-detail-banner > div > .special-detail-title > h2",
                ".service-name",
                "table.mini-tabs-header > tbody > tr > td.mini-tab-active > span.mini-tab-text"
            ]
        },
        { // 学生事务中心
            host: "student", title_selectors: [
                "#home .page_box .txt > h2",
                "#home .page_box .top > h2"
            ]
        },
        { // 第二课堂
            host: "dekt", title_selectors: [
                ".xx_content h1"
            ]
        },
        { // 世纪（学生工作部、武装部、心理健康教育与咨询中心）
            host: "century", title_selectors: [
                "h2"
            ]
        }
    ];

    function change_title() {
        let title = null;

        for (var s of matches) {
            if (site_host == `${s.host}.bit.edu.cn`) {
                for (var title_selector of s.title_selectors) {
                    // console.log(title_selector);
                    if (document.querySelector(title_selector)) {
                        title = document.querySelector(title_selector).textContent.trim();
                        break;
                    }
                }
                break;
            }
        }

        if (title) {
            page_title.text = `${title} - ${site_name}${site_name ? " |" : ""} 北京理工大学`;
            return true;
        }
        else {
            return false;
        }
    }

    var page_title = document.querySelector("head > title");
    var site_name = page_title.text.match(/北京?理工?(?:大学)?(.*)/);
    var site_host = window.location.host;

    if (site_host == "dekt.bit.edu.cn") {
        site_name = ["", "第二课堂"];
    }

    if (site_name) {
        site_name = site_name[1].trim();

        if (!change_title()) {
            // 搞成这样只是为了适应 i.bit.edu.cn ！
            setTimeout(change_title, 1500);
        }
    }
})();
