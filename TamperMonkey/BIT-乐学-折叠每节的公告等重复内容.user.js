// ==UserScript==
// @name         BIT-乐学-折叠每节的公告等重复内容
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  在单独页面显示小节的课程，每个页面开头都会有基本无用的重复内容。这个脚本可以折叠它并提供展开按钮。
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/course/view.php?id=*&section=*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function add_style_sheet() {
        let sheet = document.createElement('style');
        sheet.innerHTML = `
        [role=main] > .course-content > .collapse-content {
            height: 15em;
            overflow: auto;
        }

        .hider {
            margin-top: -4em;
            background: linear-gradient(#0000, lightgray);
            height: 4em;

            display: grid;
            place-content: center;
        }
        #show-all {
            z-index: 2;
        }
        `;
        document.head.appendChild(sheet);
    }

    const course_content = document.querySelector("[role=main] > .course-content"),
        front_content = course_content.querySelector(".course-content > ul:first-child"),
        single_section = course_content.querySelector(".single-section");
    const collapse = "collapse-content"; // moodle 已经占用了 .collapse:not(.show)

    function trim_headings() {
        front_content.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => {
            h.textContent = h.textContent.trim();
        })
    }

    function add_show_all_button() {
        const div = document.createElement('div');
        div.classList.add("hider");
        div.innerHTML = `<button id="show-all">▼展开</button>`;
        course_content.insertBefore(div, single_section);

        div.querySelector('#show-all').addEventListener('click', () => {
            front_content.classList.remove(collapse);
            div.hidden = true;
        })
    }

    function initiate_collapse() {
        front_content.classList.add(collapse);
    }


    if (front_content.clientHeight > 1 / 3 * window.innerHeight) {
        add_style_sheet();

        trim_headings();
        initiate_collapse();
        add_show_all_button();
    }
})();