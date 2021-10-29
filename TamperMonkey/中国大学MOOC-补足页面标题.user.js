// ==UserScript==
// @name         中国大学MOOC-补足页面标题
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  补充每个课程内作业、考试等页面的信息
// @author       Y.D.X.
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
     * 中国大学 MOOC 相关
     */
    const Mooc = {
        /**
         * 页面加载完后 resolve。
         * @param {{interval: number}} options `interval`的单位为 ms。
         * @returns {Promise}
         */
        loaded({ interval = 200 } = {}) {
            return new Promise((resolve, reject) => {
                let check = setInterval(() => {
                    /** @type {HTMLElement} */
                    const loading_bar = document.querySelector('#loadingPb');
                    if (loading_bar && loading_bar.style.display === 'none') {
                        clearInterval(check);
                        resolve('Loaded.');
                    }
                }, interval);
            });
        },

        /**
         * 页面重新开始加载时 resolve。
         * @param {{interval: number}} options `interval`的单位为 ms。
         * @returns {Promise}
         */
        reloading_started({ interval = 100 } = {}) {
            return new Promise((resolve, reject) => {
                let check = setInterval(() => {
                    /** @type {HTMLElement} */
                    const loading_bar = document.querySelector('#loadingPb');
                    if (loading_bar && loading_bar.style.display !== 'none') {
                        clearInterval(check);
                        resolve('Reloading started.');
                    }
                }, interval);
            });
        },

        /**
         * 每次页面加载完后调用`listener`
         * @param {() => *} listener 
         * @param {{interval: number}} options `interval`的单位为 ms。
         */
        on_every_loaded(listener, options = {}) {
            Mooc.loaded(options).then(listener);

            const call_listener_and_re_listen = function handler() {
                listener();
                Mooc.reloading_started(options).then(Mooc.loaded(options)).then(handler);
            };
            Mooc.reloading_started(options).then(Mooc.loaded(options)).then(call_listener_and_re_listen);
        },
    };



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