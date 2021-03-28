// ==UserScript==
// @name         BIT-物理实验中心-实验选修
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  上色
// @author       Y.D.X.
// @match        http://10.133.22.200:7100/XPK/StuCourseElective
// @grant        none
// ==/UserScript==

// 一般选课是在“物理实验中心-（侧边栏）教学选排课-我的课程-课程选修-已选课程列表”左键单击“实验选修，这时对话框尺寸会很难受。
// 若右键单击后选择“在新标签页中打开链接”（或直接 Ctrl+左键单击），则会舒服一些。

// 单击对话框标题“实验选修”以上色。

(function () {
    'use strict';

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

    const unavailable_course = 'unavailable-course',
        available_course = 'available-course';

    function add_style_sheet() {
        let sheet = document.createElement('style');
        sheet.innerHTML = `
        tr.unavailable-course {
            background-color: #FF000040;
        }

        tr.available-course {
            background-color: greenyellow;
        }
        `;
        document.head.appendChild(sheet);
    }

    function paint() {
        let rows_in_view1 = document.querySelectorAll("#tt .datagrid-view1 .datagrid-body tbody tr");
        let rows_in_view2 = document.querySelectorAll("#tt .datagrid-view2 .datagrid-body tbody tr");

        // 好好的一个表格，为什么要拆成 4 个 <table>？！
        rows_in_view2.forEach((row_2, index) => {
            let row_1 = rows_in_view1[index];

            for (const c of [available_course, unavailable_course]) {
                for (const r of [row_1, row_2]) {
                    if (r.classList.contains(c))
                        r.classList.remove(c);
                }
            }

            let is_available = eval(row_2.querySelector("td[field='ElectivedNum']").textContent) < 1;
            row_1.classList.add(is_available ? available_course : unavailable_course);
            row_2.classList.add(is_available ? available_course : unavailable_course);
        });
    }

    function add_painter(panel_title) {
        // 单击“查询”后不会立即出结果……
        // selector: ".icon-search"
        // search_button.addEventListener('click', paint);

        panel_title.addEventListener('click', paint);
    }

    function add_painter_caller() {
        // 是的，网页里的确是“lable”而非“label”
        wait_until_presence(".panel.datagrid .datagrid-view2 .datagrid-body table lable:first-child").then(button => {
            button.addEventListener('click', () => {
                wait_until_presence('.panel-title', 1000).then(add_painter);
            });
        })
    }

    add_style_sheet();
    add_painter_caller();
})();