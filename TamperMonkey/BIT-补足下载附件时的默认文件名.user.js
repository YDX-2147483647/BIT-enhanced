// ==UserScript==
// @name         BIT-补足下载附件时的默认文件名
// @namespace    http://tampermonkey.net/
// @version      0.2.3
// @description  补充附件中 <a> 元素的 download 属性
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://jxzx.bit.edu.cn/*.htm
// @match        https://jwc.bit.edu.cn/*.htm
// @match        https://student.bit.edu.cn/*
// @match        https://www.bit.edu.cn/*.htm
// @grant        none
// ==/UserScript==

// 旧版本：BIT-教学运行与考务中心（0.1）。

(function () {
    'use strict';

    // 优先使用在前面的 title_selector
    const matches = [
        { // 教学中心
            host: "jxzx",
            attachments_selector: ".pageArticle > .Annex > ul > li > a:not([download])"
        },
        { // 教务处
            host: "jwc",
            attachments_selector: ".pageArticle > .fujian > ul > li > a:not([download])"
        },
        { // World Wide Web
            host: "www",
            attachments_selector: ".article .Annex > ul > li > a:not([download])"
        },
        { // Student
            host: 'student',
            attachments_selector: ".fujian > ul  > li > a:not([download])"
        },
    ];

    function set_attachments_filenames() {
        let site_host = window.location.host;

        for (const s of matches) {
            if (site_host == `${s.host}.bit.edu.cn`) {
                document.querySelectorAll(s.attachments_selector).forEach(attach => {
                    if (!attach.download) {
                        let attach_filename = attach.textContent;

                        if (!/\.[0-9a-zA-Z]+$/.test(attach_filename)) {
                            // textContent 不含扩展名
                            attach_filename += attach.href.match(/\.[0-9a-zA-Z]+$/);
                        }

                        attach.download = attach_filename;
                    }
                });

                break;
            }
        }
    }

    set_attachments_filenames();
})();
