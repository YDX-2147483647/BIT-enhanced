// ==UserScript==
// @name         BIT-第二课堂-修改背景颜色
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  给可报名的课程设置颜色
// @author       Y.D.X.
// @match        http://dekt.bit.edu.cn/course/QueryAllCourseList.jsp*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function add_style_sheet() {
        let sheet = document.createElement('style');
        sheet.innerHTML = `
        #main > form[name='form1'] tr.available-course:nth-child(odd) {
            background-color: #00ff0077;
        }
        #main > form[name='form1'] tr.available-course:nth-child(even) {
            background-color: #a2ff7577;
        }

        `;
        document.head.appendChild(sheet);
    }

    function check() {
        for (let row of document.querySelectorAll("#main > form[name='form1'] table > tbody > tr:nth-child(n+2)")) {
            let state = row.children[1].textContent;
            if (state == '课程结束') {
                row.children[1].children[0].style.color = 'darkred';
                // 原来是 green，搞不懂为何报名不了的要弄成绿色……
                continue;
            }

            let [applicants, capacity] = row.children[8].textContent.split('/').map(x => parseInt(x));
            if (state == '正常' && applicants < capacity)
                row.classList.add('available-course');
        }
    }

    add_style_sheet();
    check();
})();
