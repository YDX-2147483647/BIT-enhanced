// ==UserScript==
// @name         BIT-第二课堂-所有课程-修改背景颜色
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  给可报名的课程设置颜色
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        http://dekt.bit.edu.cn/course/QueryAllCourseList.jsp*
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    const config = {
        my_academy: '睿信书院'
    }



    function add_style_sheet() {
        const sheet = document.createElement('style')
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

        #main > form[name='form1'] tr.changed > td:nth-child(2) > font {
            font-weight: bold;
        }

        `
        document.head.appendChild(sheet)
    }


    /**
     * 给行设定`available`或`unavailable`，支持覆盖既有 CSS 类
     * @param {Element} row 
     * @param {Boolean} is_available 
     */
    function set_row_state(row, is_available) {
        if (is_available) {
            row.classList.add('available-course')
            row.classList.remove('unavailable-course')
        } else {
            row.classList.add('unavailable-course')
            row.classList.remove('available-course')
        }
    }


    /**
     * 检查容量
     * @param {Element} row 
     */
    function check_capacity(row) {
        const state = row.children[1].textContent
        if (state === '课程结束') {
            row.classList.add('obsolete')
            // 原来是 green，搞不懂为何报名不了的要弄成绿色……
        } else if (state === '正常' || state === '课程变更') {
            const [applicants, capacity] = row.children[8].textContent.split('/').map(x => parseInt(x))
            set_row_state(row, applicants < capacity)
        }

        if (state === '课程变更') {
            row.classList.add('changed')
        }
    }

    /**
     * 检查学院
     * 只检查“漏网之鱼”。
     * @param {Element} row 
     */
    async function check_academy(row) {
        if (row.classList.contains('available-course')) {
            const detail = await get_detail(row.children[2].querySelector('a').href)
            if (detail['其他学院'] != '不限' && !detail['可报学院'].includes(config.my_academy)) {
                set_row_state(row, false)
            }
        }
    }


    /**
     * 获取详细信息
     * @param {string} href 
     */
    async function get_detail(href) {
        const response_text = await (await fetch(href)).text()
        const doc = (new DOMParser()).parseFromString(response_text, 'text/html')
        return organize_detail(doc)
    }

    /**
     * 从HTML提取信息
     * @param {Document} doc 
     */
    function organize_detail(doc) {
        const ret = {}
        for (const row of doc.querySelectorAll("#mysearch tbody > tr")) {
            const heading = row.children[0].textContent
            if (heading.includes('可报学院')) {
                ret['可报学院'] = Array.from(row.querySelectorAll("span[id*='txt']"))
                    .map(span => span.textContent.trim())
            } else if (heading.includes('其他学院')) {
                ret['其他学院'] = row.children[1].textContent.trim()
            }
        }
        return ret
    }


    add_style_sheet()

    const table_rows = document.querySelectorAll("#main > form[name='form1'] table > tbody > tr:nth-child(n+2)")
    table_rows.forEach(row => check_capacity(row))
    table_rows.forEach(row => check_academy(row))
})()
