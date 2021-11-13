// ==UserScript==
// @name         中国大学MOOC-补足页面标题
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  补充每个课程内作业、考试等页面的信息
// @author       Y.D.X.
// @require      https://gitee.com/YDX-2147483647/BIT-enhanced/raw/main/TamperMonkey/lib/mooc.js
// @match        https://www.icourse163.org/learn/*
// @match        https://www.icourse163.org/spoc/learn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 标题的 CSS 选择器
     * @type {string}
     * @description 优先使用在前面的。
     */
    const title_selectors = [
        "h2.j-moduleName",
        ".j-forumName > h2",
        "h2.j-hwname",
        "h2.j-title",
        "h3.j-title",
        "h2.j-panelName",
        ".u-learn-moduletitle .j-lesson .up",
        ".j-forumName a ~ span:last-child",
    ];

    /**
     * 获取课程名称
     * @returns {string}
     */
    function get_course_name() {
        return document.querySelector("h4.courseTxt").textContent;
    }

    /**
     * 组合出页面标题
     * @param  {...string} titles 
     * @returns {string}
     */
    function combine_title(...titles) {
        return titles.join(' - ') + "｜中国大学MOOC";
    }

    /**
     * 
     * @returns {string | null}
     */
    function get_subtitle() {
        for (const selector of title_selectors) {
            const title = document.querySelector(selector);
            if (title) {
                return title.textContent;
            }
        }

        return null;
    }

    function update_page_title() {
        // console.log(`%cupdate_page_title: ${document.title}`, "color: green;");
        const titles = [get_subtitle(), get_course_name()].filter(t => Boolean(t));
        document.title = combine_title(...titles);
    }



    Mooc.on_every_loaded(update_page_title);
    window.addEventListener('hashchange', () => Mooc.on_every_loaded(update_page_title));

})();