// ==UserScript==
// @name         中国大学MOOC-讨论区-停止复读
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  隐藏复读内容（有评论的回复始终显示）
// @author       Y.D.X.
// @match        https://www.icourse163.org/learn*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // interval's unit: ms.
    function wait_until_presence(selector, interval) {
        return new Promise((resolve, reject) => {
            let check = setInterval(function () {
                if (document.querySelector(selector)) {
                    clearInterval(check);
                    resolve(document.querySelector(selector));
                }
            }, interval);
        });
    }

    function add_style_sheet() {
        let sheet = document.createElement('style');
        sheet.innerHTML = `
        .copycat {
            display: none;
        }
        `;
        document.head.appendChild(sheet);
    }

    function get_main_content(reply_div) {
        return reply_div.querySelector(".f-richEditorText").textContent;
    }

    function has_comment(reply_div) {
        return reply_div.querySelector(".m-commentWrapper") != null;
    }

    function check_all_copycat() {
        let replies = document.querySelectorAll(".j-reply-all > div > .j-list > .j-data-list > div");

        for (let i = replies.length - 1; i >= 0; i--) {
            const current_reply = replies[i];

            let is_copycat = false;
            if (!has_comment(current_reply)) {
                for (let j = replies.length - 1; j > i; j--) {
                    const r = replies[j];
                    if (r.classList.contains('copycat'))
                        continue;
                    else if (get_main_content(r) == get_main_content(current_reply)) {
                        is_copycat = true;
                        break;
                    }
                }
            }

            if (is_copycat)
                current_reply.classList.add('copycat');
            else if (current_reply.classList.contains('copycat'))
                current_reply.classList.remove('copycat');
        }
    }

    async function main_controller() {
        await wait_until_presence("#courseLearn-inner-box .j-detailBox .rinfobox > h4", 1000);
        check_all_copycat();

        const page_selector = document.querySelector(".j-reply-all > div > .j-list > .j-data-list + .u-pager");
        page_selector.addEventListener('click', function () {
            setTimeout(() => check_all_copycat(), 500)
        });
    }

    if (/#\/learn\/forumdetail\?pid=\d+/.test(window.location.hash)) {
        add_style_sheet();
        main_controller();
    }
})();
