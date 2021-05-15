// ==UserScript==
// @name         BIT-第二课堂-所有课程-修改背景颜色
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  给可报名的课程设置颜色
// @author       Y.D.X.
// @match        http://dekt.bit.edu.cn/course/QueryAllCourseList.jsp*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const my_academy = '睿信书院';


    function add_style_sheet() {
        let sheet = document.createElement('style');
        sheet.innerHTML = `
        #main > form[name='form1'] tr.available-course:nth-child(odd) {
            background-color: #00ff0077;
        }
        #main > form[name='form1'] tr.available-course:nth-child(even) {
            background-color: #a2ff7577;
        }
        #main > form[name='form1'] tr.unavailable-course {
            background-color: #ff000026;
        }
        #main > form[name='form1'] tr.obsolete > td,
        #main > form[name='form1'] tr.obsolete > td > a {
            color: lightgray;
        }
        #main > form[name='form1'] tr.obsolete > td:nth-child(2) > font {
            color: darkred;
            /* 原来是 green，搞不懂为何报名不了的要弄成绿色…… */
        }

        `;
        document.head.appendChild(sheet);
    }

    const table_rows = document.querySelectorAll("#main > form[name='form1'] table > tbody > tr:nth-child(n+2)");

    function set_row_state(row, is_available) {
        if (is_available) {
            row.classList.add('available-course');
            if (row.classList.contains('unavailable-course'))
                row.classList.remove('unavailable-course');
        } else {
            row.classList.add('unavailable-course');
            if (row.classList.contains('available-course'))
                row.classList.remove('available-course');

        }
    }

    function check_capacity() {
        for (const row of table_rows) {
            let state = row.children[1].textContent;
            if (state == '课程结束') {
                row.classList.add('obsolete');
                // 原来是 green，搞不懂为何报名不了的要弄成绿色……
            } else if (state == '正常') {
                let [applicants, capacity] = row.children[8].textContent.split('/').map(x => parseInt(x));
                set_row_state(row, applicants < capacity);
            }
        }
    }

    async function check_academy() {
        for (const row of table_rows) {
            if (row.classList.contains('available-course')) {
                let detail = await get_detail(row.children[2].querySelector('a').href);
                if (detail['可报学院'].indexOf(my_academy) == -1)
                    set_row_state(row, false);
            }
        }
    }


    function get_detail(href) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", href);
            xhr.responseType = "document";

            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(organize_detail(xhr.responseXML));
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error("XMLHttpRequest Error"));
            }

            xhr.send();
        });
    }

    function organize_detail(doc) {
        let ret = {};
        for (const row of doc.querySelectorAll("#mysearch tbody > tr")) {
            let heading = row.children[0].textContent;
            if (heading.indexOf('可报学院') > -1) {
                ret['可报学院'] = [];
                for (const i of row.querySelectorAll("span[id*='txt']"))
                    ret['可报学院'].push(i.textContent.trim());
            } else if (heading.indexOf('其他学院') > -1) {
                ret['其他学院'] = row.children[1].textContent.trim();
            }
        }
        return ret;
    }

    add_style_sheet();
    check_capacity();
    check_academy();
})();
